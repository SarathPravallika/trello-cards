import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import store from "./redux/store";
import App from "./App";

test("renders default card", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Default card/i);
  expect(linkElement).toBeInTheDocument();
});
