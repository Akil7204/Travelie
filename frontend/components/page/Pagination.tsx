import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        className={`px-4 py-2 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
