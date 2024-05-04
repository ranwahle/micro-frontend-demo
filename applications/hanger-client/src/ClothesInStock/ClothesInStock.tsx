import { useGetClothesInStock } from "../hooks/useGetClothesInStock.ts";

export function ClothesInStock() {
    const { numberOfClothes, setNumberOfClothes } = useGetClothesInStock()

    return <><h2>Clothes in stock</h2>
        <progress id="file" max="100" value={numberOfClothes}> {numberOfClothes}</progress>
        There are {numberOfClothes} waiting
        <button onClick={() => setNumberOfClothes(undefined)}>Reload</button>

    </>
}
