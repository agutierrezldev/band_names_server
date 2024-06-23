
const { io } = require('../index');
const Band = require('../models/Band');
const Bands = require('../models/Bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Jon bony'));
bands.addBand(new Band('Alex'));

//console.log(bands);


// Mensajes de sockets
io.on('connection', client => {
  // client.on('event', data => { /* … */ });
  console.log('Client connect')


  client.emit('active-bands', bands.getBands());

  client.on('disconnect', () => {
    console.log('Client disconnect')
  });

  client.on('mensaje', (payload) => {
    console.log('Mensaje', payload);

    io.emit('mensaje', { admin: 'Nuevo Mensaje' });

  })

  client.on('emitir-mensaje', (payload) => {
    // io.emit('nuevo-mensaje', 'HEY!!!!!!!!!'); // EMITE A TODOS , ADICIONALMENTE AL MISMO
    client.broadcast.emit('mensaje', payload); // EMITE A TODOS , Y NO AL MISMO
  });


  client.on('vote-band', (payload) => {
    console.log('Mensaje', payload);

    bands.voteBand(payload.id);

    io.emit('active-bands', bands.getBands());

  })

  client.on('add-band', (payload) => {
    console.log('Mensaje', payload);

    bands.addBand(new Band(payload.name));

    io.emit('active-bands', bands.getBands());

  })

  client.on('delete-band', (payload) => {
    console.log('Mensaje', payload);

    bands.deleteBand(payload.id);

    io.emit('active-bands', bands.getBands());

  })

});