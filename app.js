require('dotenv').config();
const http = require('http');
const port = process.env.PORT || 5000;
const getUrlData = require('./modules/getUrlData');
const {getAll, getById, createPerson, updatePerson, deletePerson, notFoundUrl} = require('./modules/controller');

http.createServer((req, res) => {
  const data = getUrlData(req);
  let message;

  if(data){
    switch (data.status) {
      case 'setPerson':
        createPerson(req, res)
        break;
      case 'getAllPerson':
        getAll(req, res)
        break;
      case 'getPersonById':
        getById(req, res, data.id)
        break;
      case 'updatePersonById':
        updatePerson(req, res, data.id);
        break;
      case 'deletePersonById':
        deletePerson(req, res, data.id)
        break;
      default:
        notFoundUrl(req, res);
        break;
    }
  } else {
    notFoundUrl(req, res)
  }

}).listen(port);


