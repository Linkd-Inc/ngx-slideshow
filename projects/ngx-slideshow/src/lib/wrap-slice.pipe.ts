import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wrapSlice'
})
export class WrapSlicePipe implements PipeTransform {
  /**
   * @param value - a list or a string to be wrap sliced.
   * @param start - the starting index of the subset to return, can go over the array length
   * @param amount - after the start index to grab and return, can go over the array length
   * @param disable - To see whether to wrap around or not
   */
  transform(value: any, start: number, amount: number, disable: boolean = false): any {
    if (value == null) {
      return value;
    }

    const arr = Array.from(value);

    if (disable) {
      return arr.slice(start, start + amount);
    }

    // Find proper absolute start if needed (negative start
    const trueStart = (start >= value.length ? start : (start % arr.length) + arr.length);
    return [...new Array(amount)].map((_, i) => arr[(trueStart + i) % arr.length]);
  }
}
