// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import { it } from 'mocha';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from './../src/index';

chai.use(sinonChai);
chai.use(dirtyChai);

sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
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
    it('should album exists', () => {
      expect(spotify.album).to.exist();
    });
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist();
    });
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbums).to.exist();
    });
    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getTracks).to.exist();
    });
  });

  describe('getAlbum', () => {
    it('should call fetch function', () => {
      const album = spotify.album.getAlbum();
      expect(fetchedStub).to.have.been.calledOnce();
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('4nO7EUWCOzqHK3iGDXDzzU');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums/4nO7EUWCOzqHK3iGDXDzzU`);

      const album2 = spotify.album.getAlbum('4nO7EUWCOzqHK3iGDXDzzK');
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums/4nO7EUWCOzqHK3iGDXDzzK`);
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });

      const album = spotify.album.getAlbum('4nO7EUWCOzqHK3iGDXDzzU');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch function', () => {
      const albums = spotify.album.getAlbums();
      expect(fetchedStub).to.have.been.calledOnce();
    });

    it('should call fetch with the correct URL', () => {
      const albums = spotify.album.getAlbums(['4nO7EUWCOzqHK3iGDXDzzU', '4nO7EUWCOzqHK3iGDXDzzK']);
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums/?ids=4nO7EUWCOzqHK3iGDXDzzU,4nO7EUWCOzqHK3iGDXDzzK`);

      const albums2 = spotify.album.getAlbums(['1nO7EUWCOzqHK3iGDXDzzU', '1nO7EUWCOzqHK3iGDXDzzK']);
      expect(fetchedStub).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums/?ids=1nO7EUWCOzqHK3iGDXDzzU,1nO7EUWCOzqHK3iGDXDzzK`);
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ album: 'name' }, { album: 'name2' }]);

      const album = spotify.album.getAlbums('4nO7EUWCOzqHK3iGDXDzzU');
      expect(album.resolveValue).to.be.eql([{ album: 'name' }, { album: 'name2' }]);
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch function', () => {
      const albums = spotify.album.getTracks();
      expect(fetchedStub).to.have.been.calledOnce();
    });

    it('should call fetch with the correct URL', () => {
      const albumTracks = spotify.album.getTracks('4nO7EUWCOzqHK3iGDXDzzU');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4nO7EUWCOzqHK3iGDXDzzU/tracks');

      const albumTracks2 = spotify.album.getTracks('1nO7EUWCOzqHK3iGDXDzzK');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/1nO7EUWCOzqHK3iGDXDzzK/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves([{ name: 'track' }, { name: 'track2' }]);

      const album = spotify.album.getTracks('4nO7EUWCOzqHK3iGDXDzzU');
      expect(album.resolveValue).to.be.eql([{ name: 'track' }, { name: 'track2' }]);
    });
  });
});
