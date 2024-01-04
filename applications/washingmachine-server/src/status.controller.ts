import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class StatusController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('status')
    getStatus(): 'FREE' | 'BUSY' {
        const random = Math.random()
        return random > 0.5 ? 'FREE' : 'BUSY';
    }
}
