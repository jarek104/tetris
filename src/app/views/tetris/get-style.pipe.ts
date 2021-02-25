import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStyle'
})
export class GetStylePipe implements PipeTransform {

  transform(yIndex: number, xIndex: number): string {
    return null;
  }

}
