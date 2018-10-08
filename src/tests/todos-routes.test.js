/* 
Testing the API routes, connecting to the "test" database.
It seems there is an issue with the database connection that is not closed from Jest point of view
We get this warning:
`Jest has detected the following 1 open handle potentially keeping Jest from exiting: DNSCHANNEL`
This is why we use the `--forceExit` parameter in the command line.
See https://github.com/facebook/jest/issues/6423
*/
const request = require("supertest");
const createApp = require("../app");
const setup = require("./setup");
const teardown = require("./teardown");
const Model = require("../services/todos/todos-model");

const getTime = d => new Date(d).getTime();

beforeAll(async done => {
  await setup();
  done();
});

afterAll(async done => {
  await teardown();
  done();
});

const app = createApp({ Model });

it("Should return the status OK", async done => {
  const response = await request(app)
    .get("/status")
    .expect("Content-Type", /json/)
    .expect(200);
  const { body } = response;
  expect(body).toHaveProperty("status", "OK");
  return done();
});

/*
CREATE
*/
test("Should create a new todo", async done => {
  const input = { title: "[TEST] My new ToDo" };
  const response = await request(app)
    .post("/todos")
    .send(input)
    .expect("Content-Type", /json/)
    .expect(201);
  const { body } = response;
  expect(body).toHaveProperty("_id");
  expect(body).toHaveProperty("title");
  expect(body).toHaveProperty("created_at");
  const { _id, title } = body;
  expect(title).toBe(input.title);
  expect(_id.length).toBe(24);
  done();
});

/*
READ
*/
it("Should return the list of todos", async done => {
  const response = await request(app)
    .get("/todos")
    .expect("Content-Type", /json/)
    .expect(200);
  const { body } = response;
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("total");
  expect(body).toHaveProperty("limit");
  expect(body).toHaveProperty("skip");
  const { data, limit, skip, total } = body;
  expect(skip).toBe(0);
  expect(data).toBeInstanceOf(Array);
  expect(total).toBeGreaterThan(0);
  return done();
});

test("Should read an existing todo", async done => {
  const service = app.service("/todos");
  const todo = await service.create({
    title: "ToDo to be read",
    body: "My todo"
  });
  const { _id } = todo;
  const response = await request(app)
    .patch(`/todos/${_id}`)
    .expect("Content-Type", /json/)
    .expect(200);
  const { body } = response;
  expect(body).toHaveProperty("_id");
  expect(body).toHaveProperty("title");
  expect(body).toHaveProperty("created_at");
  expect(body.title).toBe(todo.title);
  expect(body.body).toBe(todo.body);
  done();
});

/*
UPDATE
*/
test("Should update an existing todo", async done => {
  const service = app.service("/todos");
  const todo = await service.create({
    title: "Should be updated right now!",
    body: "My todo"
  });
  const input = { title: "The title has been updated!" };
  const { _id } = todo;
  const response = await request(app)
    .patch(`/todos/${_id}`)
    .send(input)
    .expect("Content-Type", /json/)
    .expect(200);
  const { body } = response;
  expect(body).toHaveProperty("_id");
  expect(body).toHaveProperty("title");
  expect(body).toHaveProperty("created_at");
  expect(body).toHaveProperty("updated_at");
  expect(body.title).toBe(input.title);
  expect(body.body).toBe(todo.body);
  expect(getTime(body.updated_at)).toBeGreaterThan(getTime(body.created_at));
  done();
});

/*
DELETE
*/
test("Should delete a todo", async done => {
  const service = app.service("/todos");
  const todo = await service.create({ title: "Should be deleted right now!" });
  const { _id } = todo;
  const response = await request(app)
    .del(`/todos/${_id}`)
    .expect("Content-Type", /json/)
    .expect(200);
  const { body } = response;
  expect(body).toHaveProperty("_id");
  expect(body).toHaveProperty("title");
  expect(body).toHaveProperty("created_at");
  done();
});
