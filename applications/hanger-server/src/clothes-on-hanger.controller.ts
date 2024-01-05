import { Controller, Get } from '@nestjs/common';
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
        humidity: Math.round(Math.random() * 100),
        timeOnHanger: Math.round(Math.random() * 60 * 1000),
        type: ClothsTypes[
          Math.round(Math.random() * ClothsTypes.length) % ClothsTypes.length
        ],
      });
    }
    return result;
  }
}
