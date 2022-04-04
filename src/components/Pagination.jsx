import styled from 'styled-components';
import {IoMdArrowDropdown} from 'react-icons/io';
import { useEffect, useState } from 'react';


const Pagination = ({users}) => {

    const [currentItems, setCurrentItems] = useState(5);
    const [currentPage, setcurrentPage] = useState(1);
    const [countPage, setCountPage] = useState(0);
useEffect(()=>{
const countItems = users.length;
const countPage = Math.ceil(countItems.length/currentItems);


},[])


    return <PaginationStyled>
<Records>
    <p>Records on page</p>
    <span>5</span>
    <IoMdArrowDropdown/>
</Records>
<Pages>
    <Button>Previus</Button>
    <NumberOfPage>1</NumberOfPage>
    <NumberOfPage active >2</NumberOfPage>
    <NumberOfPage>3</NumberOfPage>
    <Button>Next</Button>
    </Pages>
    </PaginationStyled>
}

export default Pagination;

const PaginationStyled = styled.div`
display:flex;
padding:30px 0;

`;

const Records = styled.div`
flex:1;
display:flex;
align-items:center;
p {
    margin:0 20px 0 0;
    padding:0;
}

span {
    margin-right:5px;
    font-weight:bold;
}

`;

const Pages = styled.div`
display:flex;
align-items:center;
gap:10px;
`

const Button = styled.button`
outline:none;
border:none;
background-color:transparent;

`

const NumberOfPage = styled.span`
background: ${ props => props.active ? "#C6C6C6 0% 0% no-repeat padding-box" : "transparent"};
box-shadow: ${ props => props.active ?" 0px 3px 6px #00000029" : "none"};
border-radius: 4px;
padding:4px 9px;
`