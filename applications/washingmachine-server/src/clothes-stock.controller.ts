import {Controller, Get} from "@nestjs/common";

@Controller('clothes-stock')
export class ClothesStockController {
    @Get() getNumberOfClothes(): number {
        return Math.round(Math.random() * 100);
    }
}
