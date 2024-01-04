import {useEffect, useState} from "react";

export function useGetStatus() {
const [status, setStatus] = useState('loading');
    useEffect(() => {
        fetch('/washingmachineserver/status').then((response) => {
            if (response.ok) {
                response.text().then((text: string) => setStatus(text))

            } else {
                setStatus('error');
            }
        }).catch((err) => {
            console.error(err);
            setStatus('error');
        });
    }, []);
    return status;

}
