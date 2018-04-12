import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
chai.use(dirtyChai);

sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('SpotifyWrapper Library', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  it('should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper();
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'blabla',
    });
    expect(spotify.apiURL).to.be.equal('blabla');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper();
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });
    expect(spotify.token).to.be.equal('foo');
  });

  it('should have request method', () => {
    const spotify = new SpotifyWrapper();
    expect(spotify.request).to.exist();
  });

  it('should call fetch when request', () => {
    const spotify = new SpotifyWrapper({
      token: 'bla',
    });

    spotify.request('url');

    expect(fetchedStub).to.have.been.called();
  });

  it('should call fetch with right url passed', () => {
    const spotify = new SpotifyWrapper({
      token: 'bla',
    });

    spotify.request('url');

    expect(fetchedStub).to.have.been.calledWith('url');
  });

  it('should call fetch with right headers passed', () => {
    const headers = {
      headers: {
        Authorization: 'Bearer bla',
      },
    };

    const spotify = new SpotifyWrapper({
      token: 'bla',
    });

    spotify.request('url');

    expect(fetchedStub).to.have.been.calledWith('url', headers);
  });
});
