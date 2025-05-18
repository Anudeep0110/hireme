const express = require("express");
const multer = require("multer");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Configure AWS S3
const s3 = new S3Client({ region: "us-east-1" }); // Change region as needed
const BUCKET_NAME = "hireme5221"; // Replace with your S3 bucket name

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
      Key: `pdfs/${Date.now()}_${file.originalname}`,
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
router.get("/download/:key", async (req, res) => {
  try {
    const key = req.params.key;

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 }); // URL valid for 60 seconds

    res.status(200).json({ url: signedUrl });
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ message: "Failed to generate download link" });
  }
});

module.exports = router;
