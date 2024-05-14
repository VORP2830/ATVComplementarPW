import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environments.development';
import { ReportTransportStatistics } from '../Models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl = `${environment.apiUrl}/report`

  constructor(private http: HttpClient) { }

  public getReport(dateStart: any, dateEnd: any): Observable<any> {
    return this.http.get<ReportTransportStatistics>(`${this.baseUrl}?dateStart=${dateStart}&dateEnd=${dateEnd}`).pipe(take(1), map((response: ReportTransportStatistics) => {
      return response;
    }));
  }
}
