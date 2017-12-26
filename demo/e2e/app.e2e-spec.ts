import { NgxSlideshowDemoPage } from './app.po';

describe('ngx-slideshow-demo App', () => {
  let page: NgxSlideshowDemoPage;

  beforeEach(() => {
    page = new NgxSlideshowDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
