import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';


const Pagination = ({ items, setItemOffsetP, setEndOffsetP, searchQuery, force, setForce }) => {


const [showPerPageBody, setShowPerPageBody] = useState(false);
const [itemsPerPage, setItemsPerPage] = useState(5);



    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    

    useEffect(() => {

      const endOffset = itemOffset + itemsPerPage;
      // setCurrentItems(items.slice(itemOffset, endOffset));
      setEndOffsetP(endOffset)
      setPageCount(Math.ceil(items.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, items]);
  
    useEffect(()=>{
      setItemOffset(0);
    },[searchQuery])

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
      setItemOffsetP(newOffset);
      setForce(event.selected)
      
    };

  return (
    <PaginationStyled>
      <Records onClick={()=>setShowPerPageBody(!showPerPageBody)}>
        <p>Records on page</p>
        <span>{itemsPerPage}</span>
        {showPerPageBody && <PerPageBody>
            <span onClick={()=>{setItemsPerPage(5)}}>5</span>
            <span onClick={()=>{setItemsPerPage(10)}}>10</span>
        </PerPageBody>}
        <IoMdArrowDropdown />
      </Records>
      

      <Pages>

      <PaginateStyled
        //   breakLabel={"..."}
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={3}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          pageClassName={"num"}
          activeClassName={"active-page"}
          forcePage={force}
          
        />

      </Pages>


    </PaginationStyled>
  );
};

export default Pagination;

const PaginationStyled = styled.div`
  display: flex;
  padding: 30px 0;
  justify-content:space-between;
`;



const Pages = styled.div`
  /* display: flex;
  align-items: center;
  gap: 10px; */
`;

// const Button = styled.button`
//   outline: none;
//   border: none;
//   background-color: transparent;
// `;

// const NumberOfPage = styled.span`
//   background: ${(props) =>
//     props.active ? "#C6C6C6 0% 0% no-repeat padding-box" : "transparent"};
//   box-shadow: ${(props) => (props.active ? " 0px 3px 6px #00000029" : "none")};
//   border-radius: 4px;
//   padding: 4px 9px;
// `;



// records per page

const Records = styled.div`
  cursor:pointer;
  display: flex;
  align-items: center;
  position:relative;
  p {
    margin: 0 20px 0 0;
    padding: 0;
  }

  span {
    margin-right: 5px;
    font-weight: bold;
  }
`;


const PerPageBody = styled.div`
position:absolute;
right:0;
top: 34px;
padding:5px;
box-shadow: 10px 13px 29px -20px #c43232bf;
-webkit-box-shadow: 10px 13px 29px -20px #c52f2fbf;
-moz-box-shadow: 10px 13px 29px -20px #d32e2ebf;
display:flex;
flex-direction:column;

span {
    color:#121212;
    cursor:pointer;
    padding:5px;
    margin:3px;
    border-radius:3px;

    &:hover{
        background:#7e7e7e;
    }
    
}

`
//  pages

const PaginateStyled = styled(ReactPaginate)`

display:flex;
gap:20px;
list-style:none;

a{
  text-decoration:none;
  color:gray;
}
.num{
  background:  transparent;
  box-shadow:  none;
  border-radius: 4px;
  padding: 4px 9px;
}

.active-page{
  background: #C6C6C6;
  box-shadow: " 0px 3px 6px #00000029";
  border-radius: 4px;
  padding: 4px 9px;
}
`

const ChangePage = styled.div`
  color:Gray;
  text-decoration:none;
`