import { TypingheroPage } from './app.po';

describe('typinghero App', function() {
  let page: TypingheroPage;

  beforeEach(() => {
    page = new TypingheroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
