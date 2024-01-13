import { useEffect } from "react";
import { useGetClothsStatus } from "../hooks/useGetClothsStatus";
import { StatusContainer } from "./ClothsOnHanger.styles";

export function ClothsOnHanger() {
    const cloths = useGetClothsStatus();
    useEffect(() => {
        (window as unknown as {getData: () => number}).getData = () => cloths.length;
    }, [cloths.length]);
    return <StatusContainer>
        <h1>{cloths.length}</h1>
    </StatusContainer>
}