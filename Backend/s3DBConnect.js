const express = require("express");
const multer = require("multer");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Configure AWS S3
require("dotenv").config(); // if using .env

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 📤 Upload Route
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const file = req.file;



    if (!file || file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: `Resumes/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };  

    await s3.send(new PutObjectCommand(params));

    res.status(200).json({ message: "PDF uploaded successfully", key: params.Key });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Failed to upload PDF" });
  }
});

// 📥 Download Route (returns signed URL)
router.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename;
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
  });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 mins
    res.json({ downloadUrl: url });
  } catch (err) {
    console.error("Error generating signed URL:", err);
    res.status(500).json({ error: "Failed to generate download URL" });
  }
});

module.exports = router;
