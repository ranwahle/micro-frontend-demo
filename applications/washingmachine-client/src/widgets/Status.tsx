import { useGetStatus } from "../hooks/useGetStatus";
import { StatusBullet } from "./Status.styles";

export function Status() {
    const status = useGetStatus();

    return (<StatusBullet isFree={status === 'FREE'} />)
}