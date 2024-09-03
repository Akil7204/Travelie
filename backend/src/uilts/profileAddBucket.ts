import {
    S3Client,
    PutObjectCommand,
    ObjectCannedACL,
  } from "@aws-sdk/client-s3";
  import { IMulterFile } from "../types/types";
  
  export async function uploadToS3Bucket(
    file: IMulterFile
  ): Promise<string> {
    try {
      if (!file) {
        throw new Error("No file uploaded");
      }
  
      // Initialize S3 client
      const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY!,
          secretAccessKey: process.env.S3_SECRET_KEY!,
        },
      });
  
      // Parameters for the S3 upload
      const params = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: `profile/${Date.now()}_${file.originalname}`, // Unique key for the file
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: ObjectCannedACL.public_read, // Ensure correct case for ACL
      };
  
      // Create and send the command to upload the file to S3
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
  
      // Return the public URL for the uploaded file
      const uploadedUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
      return uploadedUrl;
  
    } catch (error: any) {
      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }
  