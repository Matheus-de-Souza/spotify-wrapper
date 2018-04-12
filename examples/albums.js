
global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

let spotify = new SpotifyWrapper({
  token: 'BQDSgSrhYivxh9E5L9QK_4e1atraVYauzAaKFkNSP-uPqNScEEG45RoO8xHxM2BS9tI6tnPLT0VokF1RrafB1_dWef2zfK1-tCcUtUi90RWx3T0rQdYi5bm0V4BREVy1gpajDLNvRKcd0jAvZOw',
});

const albums = spotify.search.albums('Incubus');

albums.then(data => console.log(data)); //.albums.items.map(item => console.log(item.name)));
// albums.then(data => data.albums.items.map(item => console.log(item.name)));
