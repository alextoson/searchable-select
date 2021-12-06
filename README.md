# Searchable Country Dropdown Component

This project was created with [Create React App](https://github.com/facebook/create-react-app).

To install all the libraries please run `npm install` in the console first before starting the dev server or building the project.

## Brief

---

The basic brief for this app was to create a searchable dropdown component with a list of countries. The dropdown component has different behaviours depending on the state that it is in, as depicted in the designs. I did not have Sketch to open the file, so I did my best to mimic the design from the PNG provided.

## Build Notes

---

There were 2 ways I could have tackled this challenge. I could have the API called on every keystroke and return a new array of countries to display in the list, or call the API once and build functionality to filter the array based on the user’s input. There are pros and cons for both and in the end I chose that later. Calling the API once to save on the amount of requests being sent out, I filter the results based on the user’s input. I find this gives me more control on the functionality and has performance gains. I have used styled-components for styling, as I find it simple and effective to have everything in JavaScript.

This App is viewable on mobile. It also has some basic unit testing set up with 2 tests testing the functionality of the fetch request and 2 tests testing UI behaviour. There are definitely more tests that could have done, but I kept it simple to save time. I also kept all my code in the App component file as opposed to breaking it out. Normally for a project that is bigger this would be broken out more.

## Available Scripts

---

In the project directory, you can run:

### Start

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Test

```
yarn test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build

```
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
