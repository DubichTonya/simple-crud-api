# simple-crud-api

## Installation:
1. You have to make a clone of this repository.
2. Switch to a branch `dev`
3. Install dependencies by calling the command `npm i`.

## Start:
**Application has modes:**
* development mode start `start:dev`
* production mode start `start:prod`

## API path
* **GET**
    * `/person` &mdash; return all persons.
    * `/person/${personId}` &mdash; return person by **personId**.
* **POST**
  * `/person` &mdash; is used to create record about new person. Return new person. You must pass in request `body`.
* **PUT**
  * `/person/${personId}` &mdash; update person by **personId**. Return update person. You must pass in request body.
* **DELETE**
  * `/person/${personId}` &mdash; delete person by **personId**.

> ### Body:
> * `name` — person's name (`string`, **required**)
> * `age` — person's age (`number`, **required**)
> * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
