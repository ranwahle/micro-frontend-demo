import {useEffect, useState} from "react";

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

export function useGetClothsStatus() {
const [clothsList, setClothsList] = useState<ClothData[]>([]);
    useEffect(() => {
        fetch('/hangerserver/clothes-on-hanger').then((response) => {
            if (response.ok) {
                response.json().then((data) => setClothsList(data))

            } else {
                setClothsList([]);
            }
        }).catch((err) => {
            console.error(err);
            setClothsList([]);
        });
    }, []);
    return clothsList;

}
