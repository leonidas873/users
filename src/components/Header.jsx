import styled from "styled-components";
import { CgMathPlus } from "react-icons/cg";
import { useState } from "react";
import {MdOutlineSearch} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import { setSearchQuery } from "../redux/actions";
import {AiOutlineHome} from "react-icons/ai"
import {useNavigate} from "react-router-dom";

const Header = ({icon, heading, search}) => {

const dispatch = useDispatch();
const navigate = useNavigate();


    const [searchValue, setSearchValue] = useState('')
    const onSearch = (e) => {
        setSearchValue(e.target.value)
        dispatch(setSearchQuery(e.target.value));
    }

  return (
    <HeaderStyled>
      <ContentStyled>
        <TitleStyled>{heading}</TitleStyled>
        {search && <SearchStyled>
        <input type="text" placeholder="Type to filter the table" value={searchValue} onChange={onSearch} />
        <SearchIcon/>
        </SearchStyled>}
      </ContentStyled>
      <HeaderIcon>
      {icon}
        </HeaderIcon>
        <AiOutlineHome className="home-icon" onClick={()=>navigate("/")}/>
    </HeaderStyled>
  );
};

export default Header;

const HeaderStyled = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .home-icon{
    position:absolute;
    left:0;
    top:0;
  }
`;
const ContentStyled = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  padding:100px 20px 60px 20px;
  gap:40px;
  flex-wrap:wrap;

  
`;
const HeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  bottom: 0;
  left: 0;
  position: absolute;
  margin-bottom: -36px;
  margin-left: 80px;
  cursor:pointer;
`;

const TitleStyled = styled.div`
  flex: 1;
  text-align: left;
  font-size: 36px;
  line-height: 48px;
  white-space:nowrap;
  
`;

const SearchStyled = styled.div`
    
    display: flex;
    align-items: end;
    font-size:26px;
    border-bottom:2px solid black;
    line-height:27px;
    padding-bottom:3px;
    width: 100%;
        max-width: 330px;

    & > input {
        border:none;
        outline:none;
        width:100%;
    }

    & > input::placeholder{
        color:#70707076;
    }
`;

const SearchIcon = styled(MdOutlineSearch)`
font-size: 24px;
`