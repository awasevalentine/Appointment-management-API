"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const process = require("process");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const port = parseInt(process.env.PORT, 10) || 3000;
    const host = '0.0.0.0';
    await app.listen(port, host, () => {
        console.log("Server Running on port 3000");
    });
}
bootstrap();
//# sourceMappingURL=main.js.map