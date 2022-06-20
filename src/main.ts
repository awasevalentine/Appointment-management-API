/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = parseInt(process.env.PORT, 10) || 3302
  // const host = process.env.HOST || '0.0.0.0'
  await app.listen(PORT,()=> {
    console.log(`Server Running with  port ${PORT}`)
  });
}
bootstrap();
