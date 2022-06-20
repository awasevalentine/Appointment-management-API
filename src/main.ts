/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import process = require('process');
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = parseInt(process.env.PORT, 10) || 3302
  // const host = process.env.HOST || '0.0.0.0'
  await app.listen(PORT,()=> {
    console.log(`Server Running with  port ${PORT}`)
  });
  // await app.listen(PORT);

  
// await http.createServer.listen(port, host, ()=> {
//     console.log("Server Running on port 3000")
//   });
 
  // await app.listen( process.env.PORT, ()=> {
  //   console.log("Server Running on port", process.env.PORT || 8080)
  // });
}
bootstrap();
