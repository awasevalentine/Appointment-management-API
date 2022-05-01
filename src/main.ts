/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import process = require('process');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = '0.0.0.0'
  await app.listen(parseInt(port) || 3000, ()=> {
      console.log("Server Running on port 3000")
    });
  // await app.listen( process.env.PORT, ()=> {
  //   console.log("Server Running on port", process.env.PORT || 8080)
  // });
}
bootstrap();
