import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.setGlobalPrefix('primary-wallet-hackathon');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('SMS API')
    .setDescription('API for sending and receiving SMS using Vonage')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('primary-wallet-hackathon/api', app, document);

  const PORT = process.env.PORT || 3010;
  await app.listen(PORT);
  console.log(`🚀 Server running on http://localhost:${PORT}/primary-wallet-hackathon/api`);
}
bootstrap();
