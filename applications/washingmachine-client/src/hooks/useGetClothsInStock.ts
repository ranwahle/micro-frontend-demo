import {useState} from "react";

export function useGetClothesInStock() {
  const [numberOfClothes, setNumberOfCloths] = useState<number | undefined>();
  fetch('/washingmachineserver/clothes-stock')
    .then(response => response.json())
    .then(data => {
      if (numberOfClothes === undefined) {
        setNumberOfCloths(data.numberOfClothes)
      }
    });


  return { numberOfCloths: numberOfClothes, setNumberOfCloths };

}
