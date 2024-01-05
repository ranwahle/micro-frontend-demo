import {useGetClothesInStock} from "../hooks/useGetClothesInStock.ts";

export function ClothesInStock() {
    const { numberOfCloths, setNumberOfCloths } = useGetClothesInStock()

    return <><h2>Clothes in stock</h2>
        <progress id="file" max="100" value={numberOfCloths}> {numberOfCloths}</progress>
        There are {numberOfCloths} waiting
        <button onClick={() => setNumberOfCloths(undefined)}>Reload</button>

    </>
}
