import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders GitHub Actions 101", () => {
  render(<App />);
  const linkElement = screen.getByText(/GitHub Actions 101/i);
  expect(linkElement).toBeInTheDocument();
});

test("user can type on search bar", async () => {
  render(<App />);
  const textInput = screen.getByPlaceholderText(/Search/i);
  expect(textInput).toBeInTheDocument();
  let resultsList = screen.queryByTestId("results-list");
  expect(resultsList).not.toBeInTheDocument();
  userEvent.type(textInput, "Spiderman");
  resultsList = await screen.findByTestId("results-list");
  expect(resultsList).toBeInTheDocument();
  textInput.blur();
  expect(resultsList).not.toBeInTheDocument();
});
