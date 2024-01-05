import './App.css'
import { ClothContainer, ClothsContainer } from './App.styles.tsx';
import {useGetClothsStatus} from "./hooks/useGetClothsStatus.tsx";
import {useEffect} from "react";

function timeString(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = (Math.floor((time / 1000))) % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}





function App() {

    useEffect(() => {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({topic: 'loaded', app: import.meta.env.base}, '*');
        }
        const handleMessage = (message: unknown) => {
           const {data} = message as {data: {topic: string, route: string}};
              if (data.topic === 'set-inner-route') {
                  console.log({data})
                window.history.replaceState(null, '', `${import.meta.env.VITE_BASE}${data.route}/`
                    .replace('//', '/'))
              }
        }
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        }
    })
  
    const cloths = useGetClothsStatus();
  return (
    <>
<h1>Hanger</h1>
          <ClothsContainer>
              <ClothContainer>
                  <div>Type</div>
                  <div>Drying time</div>
                  <div>Drying progress</div>
          </ClothContainer>
          </ClothsContainer>
              <ClothsContainer>
          {cloths && cloths.map((cloth) => <ClothContainer>
            <div>{cloth.type}</div>
              <div>{timeString(cloth.timeOnHanger)}</div>
              <div><progress max="100" value={100 - cloth.humidity}></progress>
              </div></ClothContainer>)
          
              }
        </ClothsContainer>
      
    </>

  )
}

export default App
