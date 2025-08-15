import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Document, Model, Query } from "mongoose"
import { Signal } from "./signal.schema"
import { CreateSignalDto, SignalsQueryDto } from "./dto";

@Injectable()
export class SignalService {

    constructor(
        @InjectModel(Signal.name) private readonly signalModel: Model<Signal>
    ) { }


    async processAndSaveSignal(rawData: any): Promise<Signal> {
        try {
            const deviceId = Object.keys(rawData)[0];
            const { data, time } = rawData[deviceId];
            const dataLength = data.length;
            const dataVolume = Buffer.byteLength(JSON.stringify(data));

            const signal = new this.signalModel({
                deviceId,
                time,
                dataLength,
                dataVolume,
                rawData: data,
            });

            return await signal.save();
        } catch (error) {
            console.error('Error processing signal:', error);
            throw error;
        }
    }

    async create(signal: CreateSignalDto): Promise<Signal> {
        return new this.signalModel({ ...signal }).save();
    }

    async findAll(signalQueryDto: SignalsQueryDto): Promise<Signal[]> {
        const { deviceId } = signalQueryDto

        const where: SignalsQueryDto = {}

        if (deviceId) {
            where.deviceId = deviceId
        }

        return this.signalModel.find().where(where).exec();
    }

    async findManyByDeviceId(deviceId: string): Promise<Signal[]> {
        return this.signalModel.find({ deviceId }).exec();
    }

    async findOne(id: string): Promise<{ found: boolean, data?: Signal }> {
        const signal = await this.signalModel.findById(id).exec();
        if (!signal) return { found: false, data: undefined }
        return { found: true, data: signal }
    }

    async update(id: string, updateSignalDto: Signal): Promise<{ found: boolean, data?: Signal }> {
        const signal = await this.signalModel.findByIdAndUpdate(id, updateSignalDto, { new: true }).exec();
        if (!signal) return { found: false, data: undefined }
        return { found: true, data: signal }
    }

    async delete(id: string): Promise<void> {
        await this.signalModel.findByIdAndDelete(id).exec();
    }

}