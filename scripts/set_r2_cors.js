const { S3Client, PutBucketCorsCommand } = require("@aws-sdk/client-s3");
require("dotenv").config({ path: ".env" });

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

async function run() {
  try {
    const command = new PutBucketCorsCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: [
              "Content-Type",
              "x-amz-checksum-crc32",
              "x-amz-sdk-checksum-algorithm",
              "x-amz-content-sha256",
              "Authorization"
            ],
            AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
            AllowedOrigins: ["http://localhost:3000", "https://bgvm2027.com", "https://www.bgvm2027.com"],
            ExposeHeaders: [],
            MaxAgeSeconds: 3000,
          },
        ],
      },
    });

    await s3Client.send(command);
    console.log("Successfully updated CORS policy for R2 bucket!");
  } catch (err) {
    console.error("Error setting CORS policy:", err);
  }
}

run();
