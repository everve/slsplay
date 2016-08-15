describe('About', () => {
  beforeEach(() => {
    browser.get('/');
    element.all(by.css('nav > a')).get(2).click();
  });

  it('should have correct feature heading', () => {
    let el = element(by.css('meet-about h2'));
    expect(el.getText()).toEqual('Features');
  });
});
