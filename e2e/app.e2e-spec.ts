import { PetclinicUiPage } from './app.po';

describe('petclinic-ui App', () => {
  let page: PetclinicUiPage;

  beforeEach(() => {
    page = new PetclinicUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
