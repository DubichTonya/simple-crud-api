require('dotenv').config();
const http = require('http');
const port = process.env.PORT || 5000;
const db = require('./db/db.json');
const getUrlData = require('./modules/getUrlData');


// statusCode: устанавливает статусный код ответа
// statusMessage: устанавливает сообщение, отправляемое вместе со статусным кодом
// setHeader(name, value): добавляет в ответ один заголовок
// write: пишет в поток ответа некоторое содержимое
// writeHead: добавляет в ответ статусный код и набор заголовков
// end: сигнализирует серверу, что заголовки и тело ответа установлены, в итоге ответ отсылается клиента. Данный метод
// должен вызываться в каждом запросе.

http.createServer((req, res) => {
    const data = getUrlData(req);
    let message;
    console.log(data);
    if(data){
        switch (data.status) {
            case 'setPerson':
                message = 'setPerson';
                break;
            case 'getAllPerson':
                message = 'getAllPerson';
                break;
            case 'getPersonById':
                message = 'getPersonById';
                break;
            case 'updatePersonById':
                message = 'updatePersonById';
                break;
            case 'deletePersonById':
                message = 'deletePersonById';
                break;
            default:
                message = 'Error'
        }

    } else {
       res.statusCode = 404;
       res.end('Страница не найдена');
    }

}).listen(port);


