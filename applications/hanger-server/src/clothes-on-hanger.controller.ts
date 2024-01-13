import { Controller, Get } from '@nestjs/common';
import { randomUUID } from 'crypto';
const ClothesTypes = [
  'Shirt',
  'Pants',
  'Socks',
  'Underwear',
  'Jacket',
  'Dress',
  'Skirt',
  'Suit',
  'Coat',
  'Other',
] as const;

export interface ClothData {
  id: string;
  humidity: number;
  timeOnHanger: number;
  type: (typeof ClothesTypes)[number];
}

@Controller('clothes-on-hanger')
export class ClothesOnHanger {
  @Get() getNumberOfClothes(): ClothData[] {
    const numberOfClothes = Math.round(Math.random() * 100);
    const result = [];
    for (let i = 0; i < numberOfClothes; i++) {
      result.push({
        id: randomUUID(),
        humidity: Math.round(Math.random() * 100),
        timeOnHanger: Math.round(Math.random() * 60 * 60 * 1000),
        type: ClothesTypes[
          Math.round(Math.random() * ClothesTypes.length) % ClothesTypes.length
        ],
      });
    }
    return result;
  }
}
