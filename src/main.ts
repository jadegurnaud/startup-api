import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

    // Middleware pour définir manuellement les en-têtes CORS si nécessaire
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });

  const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  }

  app.enableCors(corsOptions);
  app.use(cookieParser()); // Ajout du middleware pour parser les cookies


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
