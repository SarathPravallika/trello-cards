import React, { memo, FC, useState } from "react";
import styled from "styled-components";
import { ReactComponent as TickIcon } from "../../icons/tick.svg";
import {
  addTask,
  deleteCard,
  editCard,
  moveTask,
} from "../../redux/features/cards/cards.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AddTask from "../AddTask";
import Task from "../Task";

const CardContainer = styled.div`
  background: #dfe3e6;
  height: fit-content;
  width: 20rem;
  border-radius: 1rem;
  border: 0.0625rem solid rgba(0, 0, 0, 0.12);
  padding: 0.25rem;
`;

const EditCardNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.5rem;
  gap: 0.5rem;
`;

const IconContainer = styled.div`
  height: 1rem;
  width: 1rem;
  cursor: pointer;
`;

const CardHeader = styled.div`
  height: 2rem;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
`;

const CardFooter = styled.div`
  padding-top: 0.5rem;
  text-align: center;
`;

const CardTasks = styled.div``;

const CardAction = styled.button``;

interface CardProps {
  id: string;
  name: string;
  tasksOrder: Array<string>;
}

const Card: FC<CardProps> = ({ id, name, tasksOrder }) => {
  const { tasksById } = useAppSelector((state) => state.cards);
  const dispatch = useAppDispatch();
  const [val, setVal] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleEdit = (e: { detail: number }) => {
    //e.detail of 2 signifies that user is double clicking on the element
    if (e.detail === 2) setIsEditing(true);
  };

  const onSave = () => {
    setIsEditing(false);
    dispatch(editCard({ id, name: val }));
  };

  const handleAddTask = (val: string) => {
    dispatch(addTask({ id, name: val }));
  };
  const handleCardDelete = () => dispatch(deleteCard(id));

  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleDrop = (ev: {
    dataTransfer: { getData: (arg0: string) => any };
  }) => {
    const taskDetailsObject = ev.dataTransfer.getData("taskDetails");
    const { cardId, taskId } = JSON.parse(taskDetailsObject);
    if (cardId !== id) {
      dispatch(moveTask({ taskId, srcCardId: cardId, destCardId: id }));
    }
  };

  return (
    <CardContainer className="droppable" onDrop={handleDrop}>
      {isEditing ? (
        <EditCardNameContainer>
          <input
            type="text"
            placeholder="Enter task name here..."
            onChange={handleInputTextChange}
            value={val}
          />
          <IconContainer onClick={onSave}>
            <TickIcon />
          </IconContainer>
        </EditCardNameContainer>
      ) : (
        <CardHeader onClick={handleEdit} title="Double click to edit card name">
          {name}
        </CardHeader>
      )}
      <CardTasks>
        {tasksOrder?.map((taskId) => (
          <div onDragOver={handleDragOver} key={taskId}>
            <Task cardId={id} {...tasksById[taskId]} />
          </div>
        ))}
      </CardTasks>
      <CardFooter>
        <AddTask onAddTask={handleAddTask}></AddTask>
        <CardAction onClick={handleCardDelete}>Delete</CardAction>
      </CardFooter>
    </CardContainer>
  );
};

export default memo(Card);
