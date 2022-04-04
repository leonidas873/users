import { useParams } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import {IoMdSettings} from 'react-icons/io';
import UserSetup from "../components/UserSetup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HeaderIcon = ({onClick}) => {



    return (
      <CostumIcon onClick={onClick}>
        <IoMdSettings />
      </CostumIcon>
    );
  };
  
  const CostumIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #C6C6C6;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: white;
    font-size: 37px;
  `;


const UserSettings = () => {


const {userID} = useParams();
const [user, setUser] = useState(false);
const users = useSelector(state=>state.users);
  useEffect(() => {
  const singleUser = users.find(x => x.id === userID);
  setUser(singleUser);
}, [users]);


    return <UserSettingsStyled>
        <Header icon={<HeaderIcon/>} heading={"User Setup"} search={false}/>
        {user && <UserSetup user={user}/>}
    </UserSettingsStyled>
}

export default UserSettings;


const UserSettingsStyled = styled.div`
background-color:#F3F3F3;
padding-bottom:200px;
`

