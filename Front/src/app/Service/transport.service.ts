import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.development';
import { PaginationResult } from '../Models/Pagination';
import { map, Observable, take } from 'rxjs';
import { Transport } from '../Models/transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  baseUrl = `${environment.apiUrl}/transport`

  constructor(private http: HttpClient) { }

  public getTransports(page?: number, itemsPerPage?: number): Observable<PaginationResult<Transport[]>> {
    const paginationResult: PaginationResult<Transport[]> = new PaginationResult<Transport[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    const url = `${this.baseUrl}`;
    return this.http.get<Transport[]>(url, { observe: 'response', params }).pipe(take(1), map((response: any) => {
      paginationResult.result = response.body.items;
      paginationResult.pagination.currentPage = response.body.currentPage;
      paginationResult.pagination.totalPages = response.body.totalPages;
      paginationResult.pagination.itemsPerPages = response.body.pageSize;
      paginationResult.pagination.totalItems = response.body.totalCount;

      return paginationResult;
    }));
  }

  public getById(id: number): Observable<Transport> {
    return this.http.get<Transport>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  public put(transport: Transport): Observable<Transport> {
    return this.http.put<Transport>(`${this.baseUrl}/`, transport).pipe(take(1));
  }

  public post(transport: Transport): Observable<Transport> {
    return this.http.post<Transport>(`${this.baseUrl}/`, transport).pipe(take(1));
  }

  public delete(id: number): Observable<Transport> {
    return this.http.delete<Transport>(`${this.baseUrl}/${id}`).pipe(take(1));
  }
}
