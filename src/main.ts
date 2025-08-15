import "dotenv/config"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AmqplibQueueOptions } from "@nestjs/microservices/external/rmq-url.interface";

async function bootstrap() {
  if (!process.env.RABBITMQ_SERVER_URL) throw new Error("RABBITMQ_SERVER_URL env variable is required")

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          process.env.RABBITMQ_SERVER_URL
        ],
        queueOptions: {
          durable: true
        } satisfies AmqplibQueueOptions,
        queue: "xray_queue"
      }
    }
  );

  await app.listen();
}
bootstrap();
