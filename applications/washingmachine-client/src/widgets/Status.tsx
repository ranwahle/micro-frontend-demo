import { useEffect } from "react";
import { useGetStatus } from "../hooks/useGetStatus";
import { StatusBullet } from "./Status.styles";

export function Status() {
    const status = useGetStatus();

    useEffect(() => {
        (window as unknown as { getData: () => string }).getData = () => status;
    }, [status]);


    return (<StatusBullet isFree={status === 'FREE'} />)
}