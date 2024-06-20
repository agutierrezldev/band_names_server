
const { io } = require('../index')

// Mensajes de sockets
io.on('connection', client => {
  // client.on('event', data => { /* … */ });
  console.log('Client connect')

  client.on('disconnect', () => {
    console.log('Client disconnect')
  });

  client.on('mensaje', (payload) => {
    console.log('Mensaje', payload);

    io.emit('mensaje', { admin: 'Nuevo Mensaje' });

  })
});