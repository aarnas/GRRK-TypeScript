# GildedRose-Refactoring-Kata-TypeScript and Server

1. Refactor Gilded Rose kata using Typescript or Javascript.

    a. https://github.com/emilybache/GildedRose-Refactoring-Kata use a testing
  framework of your own choice.
  
    b. Detailed requirements can be found here:
  https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/main/GildedRoseR
  equirements.txt

2. Launch refactored solution in Node.js environment with additional requirements described
below.
___

## NodeJS part
### Prerequisites:

● Create a Gilded Rose’s shop instance with some items.

● Node.js process should accept the following command line arguments:

1. First argument describes how many times the shop should update it’s items.

2. Second argument is the number of start requests to the mock API.

### Task:

The objective is to update the shop items the number of times defined in the first command line
argument. However, before each update, there is a need to call the provided API until all of the
results are negative.

For example, if the first command line argument is 10 and the second command line argument is
5:

1. Make 5 HTTP requests to the API (API returns “yes”, “no”, “maybe”. The example of
response is described below)

2. Output the number of positive responses into log.txt

3. For the number of responses that are positive, make that many requests again.

4. Repeat step 3 until there are no positive responses left.

5. Update the shop’s items.

6. Repeat step 1-5 for the remaining 9 times.

*API Example:

Request example: HTTP GET https://yesno.wtf/api

Response body example:
```javascript

{

"answer": "no",

"forced": false,

"image": "foobar",

}
```

To determine whether a response is positive, the “answer” property must equal to “yes”. Other
properties are ignored.
___
# How to run
## To test GildedRose, in GildedRose directory run:
```bash
npm install
```
```bash
npm run test
```
## To run Server, in Server directory run:
```bash
npm install
```
```bash
npm run dev
```
## To run Server with mocking, run same command with two values at the end, for example:
```bash
npm run dev 2 2
```
