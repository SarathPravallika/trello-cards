import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import store from "../../redux/store";
import Card from "./index";

describe("Card test cases", () => {
  test("renders default Task", () => {
    render(
      <Provider store={store}>
        <Card id="1" name="Card 1" tasksOrder={[]} />
      </Provider>
    );
    const linkElement = screen.getByText(/Card 1/i);
    expect(linkElement).toBeInTheDocument();
  });
});
