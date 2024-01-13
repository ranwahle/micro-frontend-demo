import { useEffect } from "react";
import { useGetClothesInStock } from "../hooks/useGetClothsInStock";

export function ClothsInStockWidget() {
    const { numberOfCloths } = useGetClothesInStock();
    useEffect(() => {
        (window as unknown as {getData: () => number | undefined}).getData = () => numberOfCloths;
    }, [numberOfCloths]);
    return (
        <div>
            <h1>{numberOfCloths}</h1>
        </div>
    );
}