import { useGetStatus } from "../hooks/useGetStatus";
import { MachineImage, StatusBullet } from "./MachineStatus.styles";
import machineImage from '../assets/washingMachine.png';

export function MachineStatus() {
    const status = useGetStatus();
    

    return <>
        {status === 'loading' && <div>Loading...</div>}
        <MachineImage>
            <img src={machineImage} alt="Washing Machine" />
            <StatusBullet isFree={status === 'FREE'} />
        </MachineImage>
    </>
}