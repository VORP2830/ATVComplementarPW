import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateHourFormat',
})
export class DateHourFormat extends DatePipe implements PipeTransform {
  override transform(value: any, args?: any): any {
    let dataFormatada: string;
    if (value.includes('T')) {
      const [dataPart, horaPart] = value.split('T');
      const [ano, mes, dia] = dataPart.split('-');
      const [hora, minutos, segundos] = horaPart.split(':');
      dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
    } else {
      const [dataPart, horaPart] = value.split(' ');
      const [dia, mes, ano] = dataPart.split('/');
      const [hora, minutos, segundos] = horaPart.split(':');
      dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
    }
    return dataFormatada;
  }
}
