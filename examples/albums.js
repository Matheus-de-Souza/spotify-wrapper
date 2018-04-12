
global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQC10782r6n2btClxVao0NawszRe5jbU-0fh4Z9iisEhoB2_OJqWB24i-Q3zRamu8kQcsoGvvejf4zn0xd3ejoc2yGgMbgAuzLtvU1o66Ej41kqu2sUTwygVmybCepRfelSULpSGaxRa9BWFbcc',
});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
