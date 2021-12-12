const {setResponse, addData, deleteFromData, updateData, getValueById} = require('./helper');
const {errorMessage} = require('./errorMessage');
const data = [];
const uuid = require('uuid');
const validator = require('./validator');


function getAll(req, res) {
  data && Array.isArray(data) ? setResponse(res, 200, data) : setResponse(res, 500, errorMessage.server);
}

function getById(req, res, id) {
  if (!uuid.validate(id)) {
    setResponse(res, 400, errorMessage.invalidId);
  }

  try {
    let value = getValueById(data, id);
    setResponse(res, 200, value);
  } catch (e) {
    e.name === 'DataError' ? setResponse(res, 404, errorMessage.notFoundId) : setResponse(res, 500, errorMessage.server);
  }
}

function createPerson(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    body ? body = JSON.parse(body) : {};
    if(!validator(body)){
      setResponse(res, 400, errorMessage.invalidBody);
    } else {
      try {
        body = {id: uuid.v4(), ...body};
        addData(data, body);
        setResponse(res, 200, body);
      } catch (e) {
        e.name === 'DataError' ? setResponse(res, 400, errorMessage.notFoundId) : setResponse(res, 500, errorMessage.server);
      }
    }
  });
}

function updatePerson(req, res, id) {
  let body = '';
  let isValid = false;

  if (!uuid.validate(id)) {
    setResponse(res, 400, errorMessage.invalidId);
  }

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    isValid = validator(JSON.parse(body));

    if (!isValid) {
      setResponse(res, 400, errorMessage.invalidBody);
    }

    try {
      updateData(data, id, JSON.parse(body));
      setResponse(res, 200, getValueById(data, id));
    } catch (e) {
      e.name === 'DataError' ? setResponse(res, 400, errorMessage.notFoundId) : setResponse(res, 500, errorMessage.server);
    }
  });
}

function deletePerson(req, res, id) {
  if (!uuid.validate(id)) {
    setResponse(res, 400, errorMessage.invalidId);
  }

  try {
    deleteFromData(data, id);
    setResponse(res, 204, '');
  } catch (e) {
    e.name === 'DataError' ? setResponse(res, 404, errorMessage.notFoundId) : setResponse(res, 500, errorMessage.server);
  }
}

function notFoundUrl(req, res) {
  setResponse(res, 404, errorMessage.notFound);
}

module.exports = {getAll, getById, createPerson, updatePerson, deletePerson, notFoundUrl};
