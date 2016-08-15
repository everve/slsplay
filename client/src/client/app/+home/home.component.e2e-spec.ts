describe('Home', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should work', () => {
    'Tim Berners-Lee'.split('').forEach((c) => element(by.css('sd-app sd-home form input')).sendKeys(c));
    element(by.css('sd-app sd-home form button')).click();
    expect(element(by.css('sd-app sd-home ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper\nTim Berners-Lee');
  });
});
