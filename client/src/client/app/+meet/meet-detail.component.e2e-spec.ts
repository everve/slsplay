describe('Meet Detail', () => {
  beforeEach(() => {
    browser.get('/');
    element.all(by.css('nav > a')).get(1).click();
  });

  it('should have some sort of listing for a meetup', () => {
    let el = element(by.linkText('My Meet 1'));
    expect(el.getText()).toEqual('My Meet 1');
  });
});
