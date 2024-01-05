import {useState} from "react";

export function useGetClothesInStock() {
  const [numberOfCloths, setNumberOfCloths] = useState<number | undefined>();
  fetch('/washingmachineserver/clothes-stock')
    .then(response => response.json())
    .then(data => {
      if (numberOfCloths === undefined) {
        setNumberOfCloths(data.numberOfClothes)
      }
    });


  return { numberOfCloths, setNumberOfCloths };

}
