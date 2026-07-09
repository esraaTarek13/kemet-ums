import { useState } from "react";

interface UsePaginationProps {
  hasNext: boolean;
  hasPrev: boolean;
}

export function usePagination({ hasNext, hasPrev }: UsePaginationProps) {
  const [page, setPage] = useState(1);

  const goNext = () => hasNext && setPage((p) => p + 1);
  const goPrev = () => hasPrev && setPage((p) => p - 1);

  return { page, goNext, goPrev };
}
