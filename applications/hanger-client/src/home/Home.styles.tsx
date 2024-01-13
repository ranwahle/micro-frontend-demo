import styled from "styled-components"

export const ClothesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  &:not(:last-child){
  margin-bottom: 1rem;
  }
  `

export const ClothContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 500px;
  div:not(:last-child) {
    width: 20%;
    text-align: left;
  }
  `