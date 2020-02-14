import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'slideshowIndex'
})
export class SlideshowIndexPipe implements PipeTransform {
  /**
   * @param value a list or a string to be wrap sliced.
   * @param maxSizeOrLength - Either the max size to modulo over, or the size of the array length
   * @returns an index that can be used to display a "you are here"
   */
  transform(value: any, maxSizeOrLength: number): any {
    if (value == null) {
      return value;
    }

    // Handle negative numbers
    if (value < 0) {
      const numberToSubtract = Math.abs(value);
      const absNumToSubtract =
        numberToSubtract % maxSizeOrLength;
      return maxSizeOrLength - absNumToSubtract;
    }

    return value % maxSizeOrLength;
  }
}
