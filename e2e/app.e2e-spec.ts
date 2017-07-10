import { NgSearchInputPage } from './app.po';

describe('ng-search-input App', () => {
  let page: NgSearchInputPage;

  beforeEach(() => {
    page = new NgSearchInputPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
