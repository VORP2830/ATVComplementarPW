import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Driver } from '../Models/driver';
import { PaginationResult } from '../Models/Pagination';
import { map, Observable, take } from 'rxjs';

@Injectable()
export class DriverService {

  baseUrl = `${environment.apiUrl}/driver`

  constructor(private http: HttpClient) { }

  public getDrivers(page?: number, itemsPerPage?: number): Observable<PaginationResult<Driver[]>> {
    const paginationResult: PaginationResult<Driver[]> = new PaginationResult<Driver[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    const url = `${this.baseUrl}`;
    return this.http.get<Driver[]>(url, { observe: 'response', params }).pipe(take(1), map((response: any) => {
      paginationResult.result = response.body.items;
      paginationResult.pagination.currentPage = response.body.currentPage;
      paginationResult.pagination.totalPages = response.body.totalPages;
      paginationResult.pagination.itemsPerPages = response.body.pageSize;
      paginationResult.pagination.totalItems = response.body.totalCount;
      return paginationResult;
    }));
  }

  public getById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  public put(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.baseUrl}/`, driver).pipe(take(1));
  }

  public post(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${this.baseUrl}/`, driver).pipe(take(1));
  }

  public delete(id: number): Observable<Driver> {
    return this.http.delete<Driver>(`${this.baseUrl}/${id}`).pipe(take(1));
  }
}
