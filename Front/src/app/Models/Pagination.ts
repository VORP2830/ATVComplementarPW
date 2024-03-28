export class Pagination {
  currentPage: number = 1;
  itemsPerPages: number = 15;
  totalItems: number = 0;
  totalPages: number = 1;
}

export class PaginationResult<T> {
  result!: T;
  pagination = { } as Pagination;
}
