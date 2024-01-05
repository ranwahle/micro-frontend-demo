import { Controller, Get } from '@nestjs/common';
import { randomUUID } from 'crypto';
const ClothsTypes = [
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
  type: (typeof ClothsTypes)[number];
}

@Controller('clothes-on-hanger')
export class ClothesOnHanger {
  @Get() getNumberOfClothes(): ClothData[] {
    const numberOfCloths = Math.round(Math.random() * 100);
    const result = [];
    for (let i = 0; i < numberOfCloths; i++) {
      result.push({
        id: randomUUID(),
        humidity: Math.round(Math.random() * 100),
        timeOnHanger: Math.round(Math.random() * 60 * 60 * 1000),
        type: ClothsTypes[
          Math.round(Math.random() * ClothsTypes.length) % ClothsTypes.length
        ],
      });
    }
    return result;
  }
}
