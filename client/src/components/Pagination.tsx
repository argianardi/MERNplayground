import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { ProductLoaderType } from '../types/ProductTypes';

const Pagination = () => {
  const { pagination } = useLoaderData() as ProductLoaderType;
  const { currentPage, totalPages } = pagination;
  const { search, pathname } = useLocation();
  const navigation = useNavigate();

  const handleChangePage = (page: number) => {
    console.log(page);
    console.log(search);
    console.log(pathname);

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
