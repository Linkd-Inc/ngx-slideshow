import {WrapSlicePipe} from './wrap-slice.pipe';

describe('WrapSlicePipe', () => {
  it('create an instance', () => {
    const pipe = new WrapSlicePipe();
    expect(pipe).toBeTruthy();
  });

  it('will return a full array', () => {
    const pipe = new WrapSlicePipe();
    expect(pipe.transform([1, 2, 3], 0, 3)).toEqual([1, 2, 3]);
  });

  it('will return a single item from the start of array', () => {
    const pipe = new WrapSlicePipe();
    expect(pipe.transform([1, 2, 3], 0, 1)).toEqual([1]);
  });

  it('will wrap around and return only  the first item on overflow', () => {
    const pipe = new WrapSlicePipe();
    expect(pipe.transform([1, 2, 3], 3, 1)).toEqual([1]);
  });

  it('will wrap around and return only the first two items on overflow', () => {
    const pipe = new WrapSlicePipe();
    expect(pipe.transform([1, 2, 3], 3, 2)).toEqual([1, 2]);
  });

  it('will handle an ammount that\'s too large', () => {
    const pipe = new WrapSlicePipe();
    expect(pipe.transform([1, 2, 3], 0, 4)).toEqual([1, 2, 3, 1]);
  });

  it('will handle an ammount that\'s too large and wrap', () => {
    const pipe = new WrapSlicePipe();
    expect(pipe.transform([1, 2, 3], 2, 4)).toEqual([3, 1, 2, 3]);
  });

  describe('will handle negative numbers', () => {
    it('by returning a single item from the end of array', () => {
      const pipe = new WrapSlicePipe();
      expect(pipe.transform([1, 2, 3], -1, 1)).toEqual([3]);
    });

    it('by returning a single item from the end of array and wrapping back to the start', () => {
      const pipe = new WrapSlicePipe();
      expect(pipe.transform([1, 2, 3], -1, 2)).toEqual([3, 1]);
    });
  });
});
