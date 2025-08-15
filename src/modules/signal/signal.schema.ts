import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Signal extends Document {
    @Prop({ required: true })
    deviceId: string;

    @Prop({ required: true })
    time: number;

    @Prop({ required: true })
    dataLength: number;

    @Prop({ required: true })
    dataVolume: number;

    @Prop()
    rawData: number;
}

export const SignalSchema = SchemaFactory.createForClass(Signal)