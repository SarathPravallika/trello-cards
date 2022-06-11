import React, { useState, FC } from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../icons/add.svg";

const AddTaskContainer = styled.div`
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

interface AddTaskProps {
  onAddTask: (val: string) => void;
}

const AddTask: FC<AddTaskProps> = ({ onAddTask }) => {
  const [val, setVal] = useState("");

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleAddAction = () => {
    if (val) onAddTask(val);
    setVal("");
  };

  return (
    <AddTaskContainer>
      <input
        type="text"
        placeholder="Enter task name here..."
        onChange={handleInputTextChange}
        value={val}
      />
      <IconContainer onClick={handleAddAction}>
        <AddIcon />
      </IconContainer>
    </AddTaskContainer>
  );
};

export default AddTask;
