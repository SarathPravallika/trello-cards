import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  AddTaskPayload,
  DeleteTaskPayload,
  EditCardPayload,
  EditTaskPayload,
  MoveTaskPayload,
  CardsState,
} from "./cards.props";

const defaultCardId = uuidv4();

const initialState = {
  rowsById: {
    [defaultCardId]: {
      id: defaultCardId,
      name: "Default card",
      tasksOrder: [],
    },
  },
  rowsOrder: [defaultCardId],
  tasksById: {},
} as CardsState;

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard(state) {
      const id = uuidv4();
      const name = "New card";
      state.rowsById[id] = { id, name, tasksOrder: [] };
      state.rowsOrder.push(id);
    },
    editCard(state, action: PayloadAction<EditCardPayload>) {
      const { id, name } = action.payload;
      state.rowsById[id].name = name;
    },
    deleteCard(state, action: PayloadAction<string>) {
      const id = action.payload;
      const { tasksOrder } = state.rowsById[id];
      tasksOrder.forEach((taskId) => {
        delete state.tasksById[taskId];
      });
      delete state.rowsById[id];
      state.rowsOrder = state.rowsOrder.filter((rowId) => rowId !== id);
    },
    addTask(state, action: PayloadAction<AddTaskPayload>) {
      const { id, name } = action.payload;
      const taskId = uuidv4();
      state.tasksById[taskId] = { id: taskId, name };
      state.rowsById[id].tasksOrder.push(taskId);
    },
    editTask(state, action: PayloadAction<EditTaskPayload>) {
      const { id, name } = action.payload;
      state.tasksById[id].name = name;
    },
    deleteTask(state, action: PayloadAction<DeleteTaskPayload>) {
      const { cardId, taskId } = action.payload;
      delete state.tasksById[taskId];
      state.rowsById[cardId].tasksOrder = state.rowsById[
        cardId
      ].tasksOrder.filter((id) => id !== taskId);
    },
    moveTask(state, action: PayloadAction<MoveTaskPayload>) {
      const { taskId, srcCardId, destCardId } = action.payload;

      state.rowsById[srcCardId].tasksOrder = state.rowsById[
        srcCardId
      ].tasksOrder.filter((id) => id !== taskId);
      state.rowsById[destCardId].tasksOrder.push(taskId);
    },
  },
});

export const {
  addCard,
  editCard,
  deleteCard,
  addTask,
  editTask,
  deleteTask,
  moveTask,
} = cardsSlice.actions;
export default cardsSlice.reducer;
