const {log} = require('nodemon/lib/utils');

function getUrlStatus(method, id) {
  if (method === 'POST' && !id) {
    return 'setPerson';
  }

  if (method === 'GET' && !id) {
    return 'getAllPerson';
  }

  if (method === 'GET' && id) {
    return 'getPersonById';
  }

  if (method === 'PUT' && id) {
    return 'updatePersonById';
  }

  if (method === 'DELETE' && id) {
    return 'deletePersonById';
  }

  return false;
}

function getUrlData(req) {
  if (req.url !== '/favicon.ico' && req.url.match(/^\/person$|^\/person\//)) {
    let id = false;
    let method = req.method;
    let url;
    let status = null;

    let splitUrl = req.url.slice(1).split('/');
    url = '/person';

    if(splitUrl[splitUrl.length -1] == '') {
      splitUrl.splice(splitUrl.length -1, 1);
    }

    if(splitUrl.length > 2){
      return null;
    }
    if (splitUrl.length > 1) {
      id = splitUrl[1];
    }

    status = getUrlStatus(method, id);
    return {id, method, url, status};
  } else {
    return null;
  }
}


module.exports = getUrlData;
