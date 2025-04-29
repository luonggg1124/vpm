import usePagination, { PaginationMeta } from "@/api/hook/usePaginate";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
};

export default function Paginate({ meta, onPageChange }: Props) {
  const { currentPage, hasPrev, hasNext, visiblePages } = usePagination(
    meta,
    onPageChange
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <button
            className="size-8 flex items-center justify-center border border-gray-300 rounded-full disabled:opacity-50"
            disabled={!hasPrev}
            onClick={() => hasPrev && onPageChange(currentPage - 1)}
          >
            <ChevronLeft size={16} />
          </button>
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
              className="rounded-full cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <button
            className="size-8 flex items-center justify-center border border-gray-300 rounded-full disabled:opacity-50"
            disabled={!hasNext}
            onClick={() => hasNext && onPageChange(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
