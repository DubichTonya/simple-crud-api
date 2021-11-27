module.exports = {
  setResponse(res, status, body = null) {
    res.writeHead(status, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(body));
  },

  addData(data, value) {
    data.push(value);
  },

  deleteFromData(data, id) {
    let index = data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new DataError('Not found');
    }

    data.splice(data[index], 1);
  },

  updateData(data, id, value) {
    let index = data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new DataError('Not found');
    }
    data[index] = {id, ...value};
  },

  getValueById(data, id){
    let index = data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new DataError('Not found');
    }
    return data[index];
  }
};

class DataError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'DataError';
  }
}

