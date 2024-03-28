import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateFormat',
})
export class DateFormat extends DatePipe implements PipeTransform {
    override transform(value: any, args?: any): any {
      let dataFormatada: string;
      if (value.includes('T')) {
        const [data, _] = value.split('T');
        const [ano, mes, dia] = data.split('-');
        dataFormatada = `${dia}/${mes}/${ano}`;
      } else {
        const [data, _] = value.split(' ');
        const [dia, mes, ano] = data.split('/');
        let dataFormatada = `${dia}/${mes}/${ano}`;
      return dataFormatada;
    }
  }
}
