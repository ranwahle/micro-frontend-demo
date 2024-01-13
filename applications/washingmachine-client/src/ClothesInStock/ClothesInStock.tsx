import {useGetClothsInStock} from "../hooks/useGetClothsInStock.ts";

import StockImage from '../assets/Stock.png';

export function ClothsInStock() {
    const { numberOfCloths, setNumberOfCloths } = useGetClothsInStock()

    return <>
        <div>
        <h2>Clothes in stock</h2>
                

        <progress id="file" max="100" value={numberOfCloths}> {numberOfCloths}</progress>
        There are {numberOfCloths} waiting
        <button onClick={() => setNumberOfCloths(undefined)}>Reload</button>
        </div>
            <div>
        <img src={StockImage} alt="Stock" />  

        </div>
    </>
}
