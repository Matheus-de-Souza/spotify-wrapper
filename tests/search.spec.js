import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from './../src';

chai.use(sinonChai);
chai.use(dirtyChai);

sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let spotify;
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    // searchAlbums
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exist the searchAlbums method', () => {
      expect(spotify.search.albums).to.exist();
    });
    it('should exist the searchArtists method', () => {
      expect(spotify.search.artists).to.exist();
    });
    it('should exist the searchTracks method', () => {
      expect(spotify.search.tracks).to.exist();
    });
    it('should exist the searchPlaylists method', () => {
      expect(spotify.search.playlists).to.exist();
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce();
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/search?q=Incubus&type=artist`);
      const artists2 = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/search?q=Muse&type=artist`);
    });
  });

  describe('spotify.search.album', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce();
    });

    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/search?q=Incubus&type=album`);

      const albums2 = spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/search?q=Muse&type=album`);
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce();
    });

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/search?q=Incubus&type=track`);

      const tracks2 = spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/search?q=Muse&type=track`);
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      const playlist = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce();
    });

    it('should call fetch with the correct URL', () => {
      const playlist = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/search?q=Incubus&type=playlist`);

      const playlist2 = spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/search?q=Muse&type=playlist`);
    });
  });
});
