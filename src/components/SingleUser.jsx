import styled from 'styled-components';
import {MdVpnKey, MdDelete} from 'react-icons/md';
import {IoIosSettings} from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, setUsers } from '../redux/actions';
import {useState} from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Switcher from './Switcher';


const SingleUser = ({user}) => {
    const dispatch = useDispatch();
    const users = useSelector(state=>state.users);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();



    const handleStatusChange = (id,active) => {
        const updatedUsers = users.map(user=>((user.id === id) ? {...user, active:!active} : user ))
        dispatch(setUsers(updatedUsers))
        
    }

    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        dispatch(deleteUser(updatedUsers))
        
    }

    return <BodyItem active={user.active} key={user.id}>
    <UserInfo>
        <UserIcon src="/images/user.svg" alt="user-icon"/>
        <UserName>
            <h5>{user.firstName + " " + user.lastName}</h5>
            <p>{user.email}</p>
        </UserName>
    </UserInfo>
    <UserInfo>
        {user.role == "admin" && <KeyStyled active={user.active}><MdVpnKey/></KeyStyled>}
        <span>{user.role}</span>
    </UserInfo>
    <UserInfo>
    <Switcher active={user.active} onClick={() => handleStatusChange(user.id, user.active)}/>
    </UserInfo>
    <UserInfo>
        {user.active && <IoIosSettings onClick={()=>navigate(`/${user.id}`)}/>}
        <MdDelete onClick={()=>setShow(true)}/>
    </UserInfo>
    <Modal show={show} onHide={()=>setShow(false)} centered>
        <ModalContent>
            <ModalTitle>Delete User</ModalTitle>
            <ModalBody>
                <div><img src="/images/face.svg" alt=""/></div>
                <p>{user.firstName + " " + user.lastName}</p>
                <span>{user.active ? "active " : "inactive "} user </span>
            </ModalBody >
            <DeleteButton onClick={()=>handleDeleteUser(user.id)}>Delete User</DeleteButton>
        </ModalContent>
      </Modal>
</BodyItem>
}

export default SingleUser;

const BodyItem = styled.div`
    display:flex;
    padding:30px 0;
    justify-content:space-between;
    gap:30px;
    border-bottom: 2px solid #a3a3a3;

    & > div {
        opacity: ${props=> props.active ? 1 : 0.35};
    } 
    
    & > div:nth-child(3) {
        opacity:1;
    }
    & > div:nth-child(4) {
        opacity:0.35;
    }
    svg {
        cursor: ${props=> props.active ? "pointer" : ""};
    }

`

const UserInfo = styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
flex:1;
gap:8px;
font-weight:bold;

&:nth-child(1){
    flex:2;
    justify-content:flex-start;

     h5 {
        
        margin:0;
        padding:0;
        text-align:left;
    }

    p {
        font-weight:100;
        margin:0;
        padding:0;
    }

}

`

const UserIcon = styled.img``

const UserName = styled.div``



const KeyStyled = styled.div`
    
    width:48px;
    height:32px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:${props=> props.active ? "#7E7EF1" : "none"};
    border-radius:30px;
    color:${props=> props.active ? "white" : "#a3a3a3"};
    font-size: 20px;
    
`

const ModalContent = styled.div`
    padding:40px;

`

const ModalTitle = styled.div`
    font-size:36px;
    font-weight:bold;
    padding-left:40px;
    margin-bottom:30px;
`

const ModalBody = styled.div`
display:flex;
border-bottom:1px solid #80808072;
margin-bottom:30px;
div {
    width:40px;    
}

p{
    flex:1;
    font-weight:200;
    font-size:16px;
}

span {
    color:#44A0D3;
    text-transform:capitalize;
}

`

const DeleteButton = styled.div`
    color:white;
    background-color:#F79696;
    border-radius:20px;
    width:fit-content;
    padding:5px 20px;
    cursor:pointer;
`