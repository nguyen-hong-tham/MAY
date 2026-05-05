import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://may-client-snowy.vercel.app',
      'https://may-client-git-main-joppys-projects.vercel.app',
      'https://may-client-bq73o29wg-joppys-projects.vercel.app'
    ],
    credentials: true,
  });

  // Bật validate DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field không có trong DTO
      transform: true, // tự convert kiểu (string -> number)
      forbidNonWhitelisted: true, // nếu gửi field lạ → báo lỗi
    }),
  );

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server is running on 0.0.0.0:${port}`);
  console.log(`📌 Environment PORT: ${process.env.PORT || 'undefined (using 3000)'}`);
}
