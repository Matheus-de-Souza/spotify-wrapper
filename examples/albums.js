
global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQCr-chfB5Fo856IR37nFXGM-NZPhe69t3KvmsjWIQiMuIuiuXhrc0rgM1YlEB79BsvtNb_4Sdm4CJrZfUzQn5EMEuYpaXkxg5qzs331tNGKrOq3etiUe9ZVBeSMjuWr09WWwDcSXe2KNYnqOPI',
});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
