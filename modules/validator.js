function validator(obj, withId = false) {
    const map = new Map();
    Object.entries(obj).forEach(([ key, value ]) => {
        map.set(key, value);
    });

    const validArray = validatorArray(map.get('hobbies'), 'string') ?? false;
    console.log(validArray, '2');
    return withId ?
        map.size === 4 &&
        map.has('id') && typeof map.get('id') === 'string' &&
        map.has('name') && typeof map.get('name') === 'string' &&
        map.has('age') && typeof map.get('age') === 'number' &&
        map.has('hobbies') && Array.isArray(map.get('hobbies')) && validArray :
        map.size === 3 &&
        map.has('name') && typeof map.get('name') === 'string' &&
        map.has('age') && typeof map.get('age') === 'number' &&
        map.has('hobbies') && Array.isArray(map.get('hobbies')) && validArray;
}

function validatorArray(arr, type) {
    console.log(arr, type);
    let count = 0;
    if (arr.length === 0 && Array.isArray(arr)) {
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
