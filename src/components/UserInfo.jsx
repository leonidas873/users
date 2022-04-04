import styled from 'styled-components';
import { MdVpnKey } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const UserInfo = ({user}) => {

  

    return <UserInfoStyled>
        <UserImage active={user.active}>
            <Avatar>
            <img src={"/images/userImage.svg"} />
          {(user.role == "admin") && <KeyStyled active={user.role === "admin"}>
            <MdVpnKey />
          </KeyStyled>}
            </Avatar>
          <p>uploda photo</p>
        </UserImage>
        <UserName active={user.active}>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
        </UserName>
        <UserEmail active={user.active}>{user.email}</UserEmail>
         <ResendButton active={user.active}>Resend invite</ResendButton>
    </UserInfoStyled>
}

export default UserInfo;

const UserInfoStyled = styled.div`
width:fit-content;
display:flex;
flex-direction:column;
align-items:center;
flex:1;

`



const UserName = styled.div`
margin-top:30px;
opacity:${props=>props.active ? "1" : "0.35"};
div{
    font-size:48px;
    line-height:48px;
}
`;

const UserEmail = styled.div`
font-size:16px;
color:gray;
margin-top:13px;
opacity:${props=>props.active ? "1" : "0.35"};
`;

const ResendButton = styled.button`

background: #7E7EF1 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #00000029;
border-radius: 100px;
margin-top:60px;
color:white;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    outline: none;
    transition:0.4s;
    opacity:${props=>props.active ? "1" : "0"};
`;

const UserImage = styled.div`

p{
    margin:0;
    padding:0;
    text-align:center;
    font-size:14px;
    color:#12121250;
    margin-top:15px;
    transition:0.4;
    opacity:${props=>props.active ? "1" : "0"};
}


`;


const KeyStyled = styled.div`
  width: 48px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  font-size: 20px;
  position:absolute;
  right: 0px;
    bottom: 24px;
    display: ${(props) => (props.active ? "block" : "none")};
    background-color:rgb(126, 126, 241);
    color:white;
`;

const Avatar = styled.div`
    
    position:relative;
    

`