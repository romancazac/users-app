import React from 'react'
import ReactPaginate from 'react-paginate'
import { AppContext } from '../../App'
import './pagination.scss'
const Pagination = () => {
   const {onPaginationCount, pageCount} = React.useContext(AppContext);
   return (
      <div className="pagination">
         <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => onPaginationCount(e.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
         />
      </div>

   )
}

export default Pagination