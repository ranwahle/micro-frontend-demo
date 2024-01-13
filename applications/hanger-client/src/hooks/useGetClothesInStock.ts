import {useState} from "react";

export function useGetClothesInStock() {
  const [numberOfClothes, setNumberOfClothes] = useState<number | undefined>();
  fetch('/washingmachineserver/clothes-stock')
    .then(response => response.json())
    .then(data => {
      if (numberOfClothes === undefined) {
        setNumberOfClothes(data.numberOfClothes)
      }
    });


  return { numberOfClothes, setNumberOfClothes };

}
