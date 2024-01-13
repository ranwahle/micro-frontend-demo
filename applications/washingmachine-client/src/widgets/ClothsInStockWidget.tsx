import { useEffect } from "react";
import { useGetClothsInStock } from "../hooks/useGetClothsInStock";

export function ClothsInStockWidget() {
    const { numberOfCloths } = useGetClothsInStock();
    useEffect(() => {
        (window as unknown as {getData: () => number | undefined}).getData = () => numberOfCloths;
    }, [numberOfCloths]);
    return (
        <div>
            <h1>{numberOfCloths}</h1>
        </div>
    );
}