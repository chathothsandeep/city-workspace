import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { LogHelper } from './log.helper';

@Injectable()
export class FileUploadHelper {
  async uploadFile(
    file: any,
    folderName: string,
  ): Promise<string | undefined | null> {
    const uploadsDir = path.resolve(
      process.cwd(),
      'apps',
      'backend',
      'uploads',
      folderName,
    );

    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      await fs.writeFile(filePath, file.buffer);
      return `/uploads/${folderName}/${uniqueFilename}`;
    } catch (error) {
      LogHelper.getInstance().error(
        `Failed to save uploaded file: ${error.message}`,
        folderName,
      );
      throw new HttpException(
        'Error processing file upload.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
