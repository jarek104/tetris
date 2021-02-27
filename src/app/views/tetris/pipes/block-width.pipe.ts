import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'blockWidth'})
export class BlockWidthPipe implements PipeTransform {
  transform(value: number): number {
    return 0
  }
}
