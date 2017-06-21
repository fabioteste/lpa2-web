import { Lpa2FrontendPage } from './app.po';

describe('lpa2-frontend App', function() {
  let page: Lpa2FrontendPage;

  beforeEach(() => {
    page = new Lpa2FrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
