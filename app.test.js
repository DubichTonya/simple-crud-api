require('dotenv').config();
const supertest = require('supertest');
const http = require('http');
const port = process.env.PORT || 5000;

const request = supertest(`localhost:${port}`);

describe('Tests', () => {

  let id;
  let body = {}

  test('запросом получаем все объекты (ожидается пустой массив)', async () => {
    const res = await request.get('/person');
    expect(res.body).toEqual([]);
  })

  test('запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)', async () => {
    const reqBody = {
      "name": "None",
      "age": 63,
      "hobbies": []
    }
    const res = await request.post('/person').send(reqBody);

    id = res.body.id;
    body = {id, ...reqBody}

    expect(res.body).toEqual(body);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(400);
    expect(res.statusCode).not.toBe(500);
    expect(res.statusCode).not.toBe(404);
    expect(res.statusCode).not.toBe(404);
  })

  test('запросом пытаемся получить созданный объект по его id (ожидается созданный объект)', async() => {
    const res = await request.get(`/person/${id}`);
    expect(res.body).toEqual(body);
  })

  test('запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id)', async () => {
    const newBody = {
      "name": "Done",
      "age": 36,
      "hobbies": ["js"]
    }
    const res = await request.put(`/person/${id}`).send(newBody);
    expect(res.body).toEqual({id, ...newBody})
  })

  test('запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления)', async () => {
    const res = await request.delete(`/person/${id}`);
    expect(res.statusCode).toBe(204);
  })

  test('запросом пытаемся получить удаленный объект по id (ожидается ответ, что такого объекта нет)', async () => {
    const res = await request.get(`/person/${id}`);
    expect(res.body).toBe('Запись с данным ID не найдена');
  })
})
