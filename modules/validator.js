function validator(obj) {
  const map = new Map();
  Object.entries(obj).forEach(([ key, value ]) => {
    map.set(key, value);
  });

  console.log(obj);

  return map.size === 3 &&
    map.has('name') && typeof map.get('name') === 'string' &&
    map.has('age') && typeof map.get('age') === 'number' &&
    map.has('hobbies') && Array.isArray(map.get('hobbies')) &&
    validatorArray(map.get('hobbies'), 'string');
}

function validatorArray(arr, type) {
  let count = 0;
  if (Array.isArray(arr) && arr?.length === 0 ) {
    return !count;
  }
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== type) {
      count++;
      break;
    }
  }

  return !count;
}

module.exports = validator;
