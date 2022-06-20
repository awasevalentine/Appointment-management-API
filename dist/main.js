"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const process = require("process");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const PORT = parseInt(process.env.PORT, 10) || 3302;
    await app.listen(PORT, () => {
        console.log(`Server Running with  port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map