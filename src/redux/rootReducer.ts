import { combineReducers } from "redux";
import cards from "./features/cards/cards.slice";

const rootReducer = combineReducers({
  cards,
});

export default rootReducer;
