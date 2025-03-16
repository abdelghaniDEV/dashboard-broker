"use client"; 

const Pagination = ({
  totalPages,
  currentPage,
  setPage,
  page,
}: {
  totalPages: number;
  currentPage: number;
  setPage: any;
  page: number;
}) => {

  return (
    <div className="flex gap-2 justify-center">
      <button
        className="px-3 py-1 border hover:bg-main-primary hover:text-white text-[14px]"
        type="button"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            type="button"
            className={`px-3 py-1 border ${
              currentPage === page
                ? " text-black"
                : "bg-white text-black"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        className="px-3 py-1 border hover:bg-main-primary hover:text-white text-[14px]"
        type="button"
        onClick={() => {
          if (page < totalPages) {
            setPage(page + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
