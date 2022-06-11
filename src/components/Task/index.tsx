import React, { memo, FC, useState, Fragment } from "react";
import styled from "styled-components";
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../icons/cross.svg";
import { ReactComponent as TickIcon } from "../../icons/tick.svg";
import { useAppDispatch } from "../../redux/hooks";
import { deleteTask, editTask } from "../../redux/features/cards/cards.slice";

const TaskCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  margin: 5px;
  padding: 1rem;
  border-radius: 0.25rem;
  min-height: 1rem;
  cursor: grab;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconContainer = styled.div`
  height: 1rem;
  width: 1rem;
  cursor: pointer;
`;

interface TaskProps {
  cardId: string;
  id: string;
  name: string;
}

const Task: FC<TaskProps> = ({ cardId, id, name }) => {
  const dispatch = useAppDispatch();
  const [val, setVal] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleEdit = () => setIsEditing(true);
  const onSave = () => {
    setIsEditing(false);
    dispatch(editTask({ id, name: val }));
  };
  const onDelete = () => {
    dispatch(deleteTask({ cardId, taskId: id }));
  };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(
      "taskDetails",
      JSON.stringify({ cardId, taskId: id })
    );
  };

  return (
    <TaskCard className="draggable" draggable onDragStart={handleDragStart}>
      {isEditing ? (
        <Fragment>
          <input type="text" onChange={handleInputTextChange} value={val} />
          <TaskActions>
            <IconContainer onClick={onSave} aria-label="Save">
              <TickIcon />
            </IconContainer>
          </TaskActions>
        </Fragment>
      ) : (
        <Fragment>
          <div>{name}</div>
          <TaskActions>
            <IconContainer onClick={handleEdit} aria-label="Edit">
              <EditIcon />
            </IconContainer>
            <IconContainer onClick={onDelete} aria-label="Delete">
              <DeleteIcon />
            </IconContainer>
          </TaskActions>
        </Fragment>
      )}
    </TaskCard>
  );
};

export default memo(Task);
