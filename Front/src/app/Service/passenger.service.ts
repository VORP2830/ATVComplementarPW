import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { PaginationResult } from '../Models/Pagination';
import { map, Observable, take } from 'rxjs';
import { Passenger } from '../Models/passenger';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  baseUrl = `${environment.apiUrl}/passenger`

  constructor(private http: HttpClient) { }

  public getPassengers(page?: number, itemsPerPage?: number): Observable<PaginationResult<Passenger[]>> {
    const paginationResult: PaginationResult<Passenger[]> = new PaginationResult<Passenger[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    const url = `${this.baseUrl}`;
    return this.http.get<Passenger[]>(url, { observe: 'response', params }).pipe(take(1), map((response: any) => {
      paginationResult.result = response.body.items;
      paginationResult.pagination.currentPage = response.body.currentPage;
      paginationResult.pagination.totalPages = response.body.totalPages;
      paginationResult.pagination.itemsPerPages = response.body.pageSize;
      paginationResult.pagination.totalItems = response.body.totalCount;

      return paginationResult;
    }));
  }

  public getById(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  public put(passenger: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(`${this.baseUrl}/`, passenger).pipe(take(1));
  }

  public post(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(`${this.baseUrl}/`, passenger).pipe(take(1));
  }

  public delete(id: number): Observable<Passenger> {
    return this.http.delete<Passenger>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

}
