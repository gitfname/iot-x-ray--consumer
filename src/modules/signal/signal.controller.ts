import { Controller } from "@nestjs/common"
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices"
import { CreateSignalDto, SignalsQueryDto } from "./dto"
import { SignalService } from "./signal.service"

@Controller()
export class SignalController {

    constructor(
        private readonly signalService: SignalService
    ) { }

    @EventPattern("xray_data")
    async processXRayData(@Payload() createSignalDto: CreateSignalDto) {
        console.log(createSignalDto)
    }

    @MessagePattern("createSignal")
    async createSignal(@Payload() createSignalDto: CreateSignalDto) {
        const signal = await this.signalService.create(createSignalDto)

        return {
            data: signal
        }
    }
    @MessagePattern("findManySignals")
    async findManySignals(@Payload() signalQueryDto: { query: SignalsQueryDto }) {
        return {
            data: await this.signalService.findAll(signalQueryDto.query)
        }
    }

    @MessagePattern("findSignalById")
    async findSignalById(@Payload() payload: { id: string }) {
        return {
            data: (await this.signalService.findOne(payload.id)).data
        }
    }


}