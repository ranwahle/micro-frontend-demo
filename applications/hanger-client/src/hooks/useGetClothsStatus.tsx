import {useEffect, useState} from "react";

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
    humidity: number;
    timeOnHanger: number;
    type: (typeof ClothesTypes)[number];
  }

export function useGetClothesStatus() {
const [clothesList, setClothesList] = useState<ClothData[]>([]);
    useEffect(() => {
        fetch('/hangerserver/clothes-on-hanger').then((response) => {
            if (response.ok) {
                response.json().then((data) => setClothesList(data))

            } else {
                setClothesList([]);
            }
        }).catch((err) => {
            console.error(err);
            setClothesList([]);
        });
    }, []);
    return clothesList;

}
