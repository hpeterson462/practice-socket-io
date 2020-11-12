const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: true, origins: '*:*' });

app.use(express.json());

app.use(cors());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

// server.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Started on ${PORT}`);
// });

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function (data) {
    io.emit('RECEIVE_MESSAGE', data);
  })
});

module.exports = http;
