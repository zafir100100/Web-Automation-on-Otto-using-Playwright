# Web-Automation-on-Otto-using-Playwright

## Video Output:

https://github.com/user-attachments/assets/6a06d440-0956-4d34-9fc6-dab80ce947e7

## What is Automation?

Automation is the process of using software tools and scripts to perform tasks that would typically be done manually by a human. In the context of software testing, automation involves using tools to execute test cases and compare the actual results with the expected results automatically.

## Why use Playwright?

Playwright is a modern web automation framework that offers several advantages for testing web applications:

- **Cross-browser support**: Playwright supports testing on multiple browsers (Chromium, Firefox, and WebKit) with a single API.
- **Headless and non-headless modes**: You can run tests with or without a browser UI, making it versatile for different environments.
- **Reliable automation**: It automatically waits for elements to be actionable, reducing the chances of flaky tests.
- **Fast execution**: Playwright runs the tests in parallel, speeding up the execution process.
- **Rich API**: Playwright provides an extensive API to handle different interactions like keyboard input, mouse events, and form submissions.
- **Network Interception**: Playwright allows you to intercept and modify network requests, providing control over API responses.

Playwright is an excellent choice for web automation due to its cross-browser capabilities, reliability, and performance.

## Technology used
- Playwright
- Visual Studio Code
- JavaScript

## How to run this project

- Clone this project
- First, install dependencies:
  ```
  npm install
  ```
- Then, run the test:
  ```
  npx playwright test
  ```

## Scenario:

- Open www.otto.de
- Search for "trampolin"
- Sort the results by "Highest Price"
- Verify that the first 5 products are sorted by price in descending order
- Apply a price filter to show only trampolines that cost between 500 € and 1000 €
- Click on one of the first 5 products to open the product detail page
- Add the product to the shopping cart
- Verify that the correct product has been successfully added to the cart

## Test case checklist based on the scenario

- User searches for trampolines.
- User sorts products by the highest price.
- User filters products based on the price range.
- User adds a product to the shopping cart.
- Product is successfully added to the cart and verified.

## Playwright Report Screenshot:

![image](https://github.com/user-attachments/assets/deb145a3-4177-46f4-a514-aec01d4ce27a)
