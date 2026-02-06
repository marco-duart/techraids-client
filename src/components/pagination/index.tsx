import { ChevronLeft, ChevronRight } from "@styled-icons/boxicons-regular";
import * as S from "./styles";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: Props) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const pageNumbers = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return (
    <S.PaginationWrapper>
      <S.PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev || isLoading}
        title="Página anterior"
      >
        <ChevronLeft />
      </S.PaginationButton>

      {pageNumbers.map((num, idx) =>
        typeof num === "number" ? (
          <S.PaginationButton
            key={idx}
            active={num === currentPage}
            onClick={() => onPageChange(num)}
            disabled={isLoading}
          >
            {num}
          </S.PaginationButton>
        ) : (
          <S.PageInfo key={idx}>{num}</S.PageInfo>
        ),
      )}

      <S.PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext || isLoading}
        title="Próxima página"
      >
        <ChevronRight />
      </S.PaginationButton>

      <S.PageInfo>{`Página ${currentPage} de ${totalPages}`}</S.PageInfo>
    </S.PaginationWrapper>
  );
};
