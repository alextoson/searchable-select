import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import getCountries from "./getCountries";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://restcountries.com/v2/all", (req, res, ctx) => {
    const mockRes = [
      {
        name: "Afghanistan",
        numericCode: "004",
        flags: {
          svg: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
          png: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png",
        },
      },
      {
        name: "Åland Islands",
        numericCode: "248",
        flags: {
          svg: "https://flagcdn.com/ax.svg",
          png: "https://flagcdn.com/w320/ax.png",
        },
      },
      {
        name: "Albania",
        numericCode: "008",
        flags: {
          svg: "https://flagcdn.com/al.svg",
          png: "https://flagcdn.com/w320/al.png",
        },
      },
    ];
    return res(ctx.status(200), ctx.json(mockRes));
  }),
  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "please add request handler" })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("an object in the result array should have a name, flags, and numericCode property", async () => {
  const countries = await getCountries();
  expect(countries).toHaveLength(3);
  expect(countries[0]).toHaveProperty("name");
  expect(countries[0]).toHaveProperty("flags");
  expect(countries[0].flags).toHaveProperty("svg");
  expect(countries[0]).toHaveProperty("numericCode");
});

test("handles failure", async () => {
  server.use(
    rest.get("https://restcountries.com/v2/all", (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );
  await expect(getCountries()).rejects.toThrow("something went wrong");
});

test("placeholder should change to 'Search' when focused and back to 'Select' when unselected", () => {
  const { container } = render(<App />);
  expect(container.querySelector("input").placeholder).toBe("Select");
  fireEvent.focus(container.querySelector("input"));
  expect(container.querySelector("input").placeholder).toBe("Search");
  fireEvent.blur(container.querySelector("input"));
  expect(container.querySelector("input").placeholder).toBe("Select");
});

test("Country list should show when input is clicked and hide if clicked away", () => {
  const { container } = render(<App />);
  fireEvent.click(container.querySelector("input"));
  expect(container.querySelector("ul")).toBeVisible();
  fireEvent.click(container.querySelector(".App"));
  expect(container.querySelector("ul")).not.toBeVisible();
});
