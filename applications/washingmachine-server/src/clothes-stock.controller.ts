import {Controller, Get} from "@nestjs/common";

@Controller('clothes-stock')
export class ClothesStockController {
    @Get() getNumberOfClothes(): {numberOfClothes: number } {
        return {numberOfClothes: Math.round(Math.random() * 100)};
    }
}
