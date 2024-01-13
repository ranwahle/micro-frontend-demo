import { useEffect } from "react";
import { useGetClothesStatus } from "../hooks/useGetClothsStatus";
import { StatusContainer } from "./ClothsOnHanger.styles";

export function ClothesOnHanger() {
    const clothes = useGetClothesStatus();
    useEffect(() => {
        (window as unknown as {getData: () => number}).getData = () => clothes.length;
    }, [clothes.length]);
    return <StatusContainer>
        <h1>{clothes.length}</h1>
    </StatusContainer>
}