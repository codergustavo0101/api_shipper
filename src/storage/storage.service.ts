import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

export interface UploadedFile {
  fileName: string;
  folder?: string;
  buffer: Buffer;
}

@Injectable()
export class StorageService {
  async uploadFile(file: UploadedFile): Promise<string> {
    const awsEndpoint = new AWS.Endpoint(process.env.AWS_ENDPOINT);

    const s3 = new AWS.S3({
      endpoint: awsEndpoint.href,
      credentials: new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }),
    });

    const folder = file.folder ? `${file.folder}/` : '';
    const folderFileName = `${folder}${file.fileName}`;

    return new Promise((resolve, reject) => {
      s3.putObject(
        {
          Bucket: process.env.AWS_BUCKET,
          Key: folderFileName,
          Body: file.buffer,
          ACL: 'public-read',
        },
        (error: AWS.AWSError) => {
          if (!error) {
            resolve(
              `https://${process.env.AWS_BUCKET}.${awsEndpoint.hostname}/${folderFileName}`,
            );
          } else {
            reject(
              new Error(
                `DoSpacesService_ERROR: ${
                  error.message || 'Something went wrong'
                }`,
              ),
            );
          }
        },
      );
    });
  }

  async removeFile(folder: string, fileName: string): Promise<void> {
    const awsEndpoint = new AWS.Endpoint(process.env.AWS_ENDPOINT);

    const s3 = new AWS.S3({
      endpoint: awsEndpoint.href,
      credentials: new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }),
    });

    return new Promise((resolve, reject) => {
      s3.deleteObject(
        {
          Bucket: process.env.AWS_BUCKET,
          Key: `${folder}/${fileName}`,
        },
        (error: AWS.AWSError) => {
          if (!error) {
            resolve();
          } else {
            reject(
              new Error(
                `DoSpacesService_ERROR: ${
                  error.message || 'Something went wrong'
                }`,
              ),
            );
          }
        },
      );
    });
  }
}
