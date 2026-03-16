import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { MainModule } from "./main.module";
import { INestApplication, Logger } from "@nestjs/common";

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(MainModule);
    app.setGlobalPrefix("api");

    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    const logger: Logger = new Logger("ICNApplication");
    const port: string | number = process.env.ICN_PORT ?? 3000;

    await app.listen(port, () => {
        logger.log(`Application Started at Port: ${port}`);
    });
}

void bootstrap();
