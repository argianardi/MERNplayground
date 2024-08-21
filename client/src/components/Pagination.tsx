// src/components/Pagination.tsx

import { useLocation, useNavigate } from 'react-router-dom';

interface PaginationType {
  totalItems: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ pagination }: { pagination: PaginationType }) => {
  const { currentPage, totalPages } = pagination;
  const { search, pathname } = useLocation();
  const navigation = useNavigate();

  const handleChangePage = (page: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', page.toString());
    navigation(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });

  return (
    <div className="join">
      {pages?.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`btn btn-md border-none join-item ${
            currentPage === pageNumber ? 'btn-primary' : ''
          }`}
          onClick={() => handleChangePage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
