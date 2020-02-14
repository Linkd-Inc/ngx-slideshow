import {SlideshowIndexPipe} from './slideshow-index.pipe';

describe('SlideshowIndexPipe', () => {
  it('create an instance', () => {
    const pipe = new SlideshowIndexPipe();
    expect(pipe).toBeTruthy();
  });

  it('will return an initial index', () => {
    const pipe = new SlideshowIndexPipe();
    expect(pipe.transform(0, [1, 2, 3].length)).toEqual(0);
  });

  it('will return an max index', () => {
    const pipe = new SlideshowIndexPipe();
    expect(pipe.transform(2, [1, 2, 3].length)).toEqual(2);
  });

  it('will return an 0 when overflowed by 1', () => {
    const pipe = new SlideshowIndexPipe();
    expect(pipe.transform(3, [1, 2, 3].length)).toEqual(0);
  });

  it('will return an 2 when overflowed by 3', () => {
    const pipe = new SlideshowIndexPipe();
    expect(pipe.transform(5, [1, 2, 3].length)).toEqual(2);
  });

  it('will return an 3 when overflowed by -1', () => {
    const pipe = new SlideshowIndexPipe();
    expect(pipe.transform(-1, [1, 2, 3].length)).toEqual(2);
  });

  it('will return an 3 when overflowed by -3', () => {
    const pipe = new SlideshowIndexPipe();
    expect(pipe.transform(-1, [1, 2, 3].length)).toEqual(2);
  });
});
