import type { LaravelPaginated, LaravelPaginationLink } from './types';

const withPage = (baseUrl: string, page: number) => `${baseUrl}?page=${page}`;

export function paginateMock<T>(
  items: T[],
  page: number,
  perPage: number,
  baseUrl: string,
): LaravelPaginated<T> {
  const currentPage = Math.max(1, page);
  const safePerPage = Math.max(1, perPage);
  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / safePerPage));
  const boundedPage = Math.min(currentPage, lastPage);
  const start = (boundedPage - 1) * safePerPage;
  const data = items.slice(start, start + safePerPage);
  const from = data.length > 0 ? start + 1 : null;
  const to = data.length > 0 ? start + data.length : null;

  const numericLinks: LaravelPaginationLink[] = Array.from({ length: lastPage }, (_, index) => {
    const linkPage = index + 1;
    return {
      url: withPage(baseUrl, linkPage),
      label: String(linkPage),
      active: linkPage === boundedPage,
    };
  });

  return {
    data,
    links: {
      first: withPage(baseUrl, 1),
      last: withPage(baseUrl, lastPage),
      prev: boundedPage > 1 ? withPage(baseUrl, boundedPage - 1) : null,
      next: boundedPage < lastPage ? withPage(baseUrl, boundedPage + 1) : null,
    },
    meta: {
      current_page: boundedPage,
      from,
      last_page: lastPage,
      links: [
        {
          url: boundedPage > 1 ? withPage(baseUrl, boundedPage - 1) : null,
          label: '&laquo; Previous',
          active: false,
        },
        ...numericLinks,
        {
          url: boundedPage < lastPage ? withPage(baseUrl, boundedPage + 1) : null,
          label: 'Next &raquo;',
          active: false,
        },
      ],
      path: baseUrl,
      per_page: safePerPage,
      to,
      total,
    },
  };
}
