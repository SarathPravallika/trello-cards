import React from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "./icons/add.svg";
import Card from "./components/Card";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { addCard } from "./redux/features/cards/cards.slice";
import "./App.css";

const CardsBoard = styled.div`
  height: 95%;
  overflow-x: auto;
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;

const IconContainer = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  min-width: 1.5rem;
  background-color: #bbb;
  border-radius: 50%;
  cursor: pointer;
`;

function App() {
  const { rowsById, rowsOrder } = useAppSelector((state) => state.cards);
  const dispatch = useAppDispatch();
  const handleAddCard = () => {
    dispatch(addCard());
  };
  return (
    <div className="App">
      <CardsBoard>
        {rowsOrder?.map((id) => {
          const card = rowsById[id];
          return (
            <Card
              key={id}
              id={card.id}
              name={card.name}
              tasksOrder={card.tasksOrder}
            />
          );
        })}
        <IconContainer onClick={handleAddCard}>
          <AddIcon />
        </IconContainer>
      </CardsBoard>
    </div>
  );
}

export default App;
