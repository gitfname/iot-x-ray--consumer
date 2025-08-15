import "dotenv/config"
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose"
import { SignalModule } from "./modules/signal/signal.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOOSE_URI!),
    SignalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
