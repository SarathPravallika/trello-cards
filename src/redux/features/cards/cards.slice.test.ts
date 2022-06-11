import { v4 as uuidv4 } from "uuid";
import { CardsState } from "./cards.props";
import cardsSlice, {
  addCard,
  editCard,
  deleteCard,
  addTask,
  editTask,
  deleteTask,
  moveTask,
} from "./cards.slice";

describe("Cards slice reducer function tests", () => {
  let initialState: CardsState;
  beforeEach(() => {
    const defaultCardId = uuidv4();
    initialState = {
      rowsById: {
        [defaultCardId]: {
          id: defaultCardId,
          name: "Default card",
          tasksOrder: [],
        },
      },
      rowsOrder: [defaultCardId],
      tasksById: {},
    };
  });
  it("should add a new card", () => {
    const returnState = cardsSlice(initialState, {
      payload: {},
      type: addCard.type,
    });

    expect(Object.keys(returnState.rowsById).length).toEqual(2);
    expect(returnState.rowsOrder.length).toEqual(2);
  });
  it("should edit a card name", () => {
    const cardId = initialState.rowsById[initialState.rowsOrder[0]].id;
    const returnState = cardsSlice(initialState, {
      payload: { id: cardId, name: "New card" },
      type: editCard.type,
    });

    expect(returnState.rowsById[cardId].name).toEqual("New card");
  });
  it("should delete a card", () => {
    const cardId = initialState.rowsById[initialState.rowsOrder[0]].id;
    const returnState = cardsSlice(initialState, {
      payload: cardId,
      type: deleteCard.type,
    });

    expect(Object.keys(returnState.rowsById).length).toEqual(0);
    expect(returnState.rowsOrder.length).toEqual(0);
  });
  it("should add a task", () => {
    const cardId = initialState.rowsById[initialState.rowsOrder[0]].id;
    const returnState = cardsSlice(initialState, {
      payload: { id: cardId, name: "New task" },
      type: addTask.type,
    });

    expect(Object.keys(returnState.tasksById).length).toEqual(1);
    expect(returnState.rowsById[cardId].tasksOrder.length).toEqual(1);
  });

  describe("Task scenarios", () => {
    let taskInitialState: CardsState;
    beforeEach(() => {
      const defaultCardId = uuidv4();
      taskInitialState = {
        rowsById: {
          [defaultCardId]: {
            id: defaultCardId,
            name: "Default card",
            tasksOrder: ["1"],
          },
        },
        rowsOrder: [defaultCardId],
        tasksById: { "1": { id: "1", name: "Task 1" } },
      };
    });
    it("should edit a task", () => {
      const cardId =
        taskInitialState.rowsById[taskInitialState.rowsOrder[0]].id;

      const returnState = cardsSlice(taskInitialState, {
        payload: { id: "1", name: "New task" },
        type: editTask.type,
      });

      expect(returnState.tasksById["1"].name).toEqual("New task");
      expect(Object.keys(returnState.tasksById).length).toEqual(1);
      expect(returnState.rowsById[cardId].tasksOrder.length).toEqual(1);
    });
    it("should delete a task", () => {
      const cardId =
        taskInitialState.rowsById[taskInitialState.rowsOrder[0]].id;

      const returnState = cardsSlice(taskInitialState, {
        payload: { cardId, taskId: "1" },
        type: deleteTask.type,
      });

      expect(Object.keys(returnState.tasksById).length).toEqual(0);
      expect(returnState.rowsById[cardId].tasksOrder.length).toEqual(0);
    });
    it("should move a task", () => {
      const defaultCardId = uuidv4();
      const defaultCardId2 = uuidv4();
      const taskInitialState = {
        rowsById: {
          [defaultCardId]: {
            id: defaultCardId,
            name: "Default card",
            tasksOrder: ["1"],
          },
          [defaultCardId2]: {
            id: defaultCardId2,
            name: "Default card2",
            tasksOrder: ["2"],
          },
        },
        rowsOrder: [defaultCardId, defaultCardId2],
        tasksById: {
          "1": { id: "1", name: "Task 1" },
          "2": { id: "2", name: "Task 2" },
        },
      };

      const returnState = cardsSlice(taskInitialState, {
        payload: {
          taskId: "1",
          srcCardId: defaultCardId,
          destCardId: defaultCardId2,
        },
        type: moveTask.type,
      });

      expect(returnState.rowsById[defaultCardId].tasksOrder.length).toEqual(0);
      expect(returnState.rowsById[defaultCardId2].tasksOrder.length).toEqual(2);
      expect(Object.keys(returnState.tasksById).length).toEqual(2);
    });
  });
});
