import { useGetClothsStatus } from "../hooks/useGetClothsStatus";
import { ClothContainer, ClothsContainer } from "./Home.styles";

function timeString(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = (Math.floor((time / 1000))) % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function Home() 
{
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