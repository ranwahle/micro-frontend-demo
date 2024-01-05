import './App.css'
import {useGetClothsStatus} from "./hooks/useGetClothsStatus.tsx";
import {useEffect} from "react";
import styled from 'styled-components';

function timeString(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = (Math.floor((time / 1000))) % 60;
    return `${minutes}:${seconds}`;
}

const ClothsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 100vh;
  overflow: auto;
  &:not(:last-child){
  margin-bottom: 1rem;
  }
  `

const ClothContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 500px;
  div:not(:last-child) {
    width: 20%;
    text-align: left;
  }
  `



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
