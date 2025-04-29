export type PaginationMeta = {
  first_page: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  last_page: number;
  total_item: number;
};

const usePagination = (
  meta: PaginationMeta,
  onPageChange: (page: number) => void
) => {
  const { current_page, last_page, prev_page, next_page } = meta;


  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(current_page - 2, 1);
    const end = Math.min(start + 4, last_page);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return {
    currentPage: current_page,
    hasPrev: !!prev_page,
    hasNext: !!next_page,
    visiblePages: getVisiblePages(),
    onPageChange,
  };
};

export default usePagination;