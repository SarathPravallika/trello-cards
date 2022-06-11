import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import store from "../../redux/store";
import Task from "./index";

describe("Task test cases", () => {
  test("renders default Task", () => {
    render(
      <Provider store={store}>
        <Task cardId="1" id="2" name="Task1" />
      </Provider>
    );
    const linkElement = screen.getByText(/Task1/i);
    expect(linkElement).toBeInTheDocument();
  });
});
