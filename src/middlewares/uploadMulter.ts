import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';

export const uploadMulter = (req: Request, res: Response, next: NextFunction) => {
  multer({
    limits: { fileSize: 1024 * 1024 * 10 },
    storage: diskStorage({
      destination: (_: Request, __: Express.Multer.File, cb: any) => {
        const path = `${process.cwd()}/storage`;
        cb(null, path);
      },
      filename: (_: Request, file: Express.Multer.File, cb: any) => {
        const ext = file.originalname.split('.').pop();
        const fileName = `file-${Date.now()}.${ext}`;
        cb(null, fileName);
      },
    })
  }).single('file')(req, res, next);
} 