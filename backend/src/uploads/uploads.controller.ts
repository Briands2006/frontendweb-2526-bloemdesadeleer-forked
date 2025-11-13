// src/uploads/uploads.controller.ts
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readdirSync } from 'fs';
import { join } from 'path';

@Controller('uploads')
export class UploadsController {
  @Get()
  getAllFiles() {
    const files = readdirSync(join(__dirname, '..', 'uploads'));
    return files.map((file) => ({
      filename: file,
      url: `/api/uploads/${file}`,
    }));
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded' };
    }

    return {
      filename: file.filename,
      url: `/uploads/${file.filename}`,
    };
  }
}
