// src/uploads/uploads.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { UploadsController } from './uploads.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/api/uploads',
    }),

    MulterModule.register({
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const fileExt = file.originalname.split('.').pop();
          const name = `${file.originalname}.${fileExt}`;
          cb(null, name);
        },
      }),
    }),
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}
