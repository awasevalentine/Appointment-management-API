/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import process = require('process');
import http =require('http')
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // const port = parseInt(process.env.PORT, 10) || 3000
  const port = process.env.PORT || 5000;
  const host = process.env.HOST || '0.0.0.0'
  // await app.listen(port, host, ()=> {
  //   console.log("Server Running on port 3000")
  // });
  await http.createServer(function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write('Hello World!');
    // res.end();
}).listen(port);
  
// await http.createServer.listen(port, host, ()=> {
//     console.log("Server Running on port 3000")
//   });
 
  // await app.listen( process.env.PORT, ()=> {
  //   console.log("Server Running on port", process.env.PORT || 8080)
  // });
}
bootstrap();
