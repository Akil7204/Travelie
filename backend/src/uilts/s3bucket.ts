import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import { IMulterFile } from "../types/types";

export async function uploadToS3Bucket(files: IMulterFile | IMulterFile[]): Promise<string[]> {
  try {
    // const filesArray = Array.isArray(files) ? files : [files];
    // const filesArray = files as IMulterFile[];
    const filesArray = Array.isArray(files) ? files.flat() : [files];

    console.log(filesArray);
    
    if (filesArray.length === 0) {
      throw new Error("No files uploaded");
    }

    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
      },
    });

    const uploadedUrls = await Promise.all(
      filesArray.map(async (file) => {
        console.log(file.originalname);
        
        const params = {
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: `${Date.now()}_${file.originalname}`, // No 'posts/' prefix
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: ObjectCannedACL.public_read, // Use correct case
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        // Return the URL without the 'posts/' folder
        return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
      })
    );

    return uploadedUrls;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
