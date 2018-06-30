import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'slideshowIndex'
})
export class SlideshowIndexPipe implements PipeTransform {
  /**
   * @param value a list or a string to be wrap sliced.
   * @param maxSizeOrLength - Either the max size to modulo over, or the size of the array length
   * @param sizeToRemove - The number of items to remove from maxSizeOrLength
   */
  transform(value: any, maxSizeOrLength: number, sizeToRemove?: number): any {
    if (value == null) {
      return value;
    }

    return value % (sizeToRemove ? maxSizeOrLength - sizeToRemove : maxSizeOrLength);
  }
}
