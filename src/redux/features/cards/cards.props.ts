export type Row = {
  id: string;
  name: string;
  tasksOrder: Array<string>;
};
export type RowsById = {
  [id: string]: Row;
};
export type RowsOrder = Array<string>;
export type Task = {
  id: string;
  name: string;
};
export type TasksById = {
  [id: string]: Task;
};
export type EditCardPayload = {
  id: string;
  name: string;
};
export type AddTaskPayload = {
  id: string;
  name: string;
};
export type DeleteTaskPayload = {
  cardId: string;
  taskId: string;
};
export type EditTaskPayload = {
  id: string;
  name: string;
};
export type MoveTaskPayload = {
  taskId: string;
  srcCardId: string;
  destCardId: string;
};
export interface CardsState {
  rowsById: RowsById;
  rowsOrder: RowsOrder;
  tasksById: TasksById;
}
