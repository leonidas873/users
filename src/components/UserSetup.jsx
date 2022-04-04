import styled from "styled-components";
import UserInfo from "./UserInfo";
import UserDetails from "./UserDetails";
import Permissions from "./Permissions";


const UserSetup = ({ user }) => {


  return (
    <Content>
      <UserInfo user={user}/>
      <UserDetails user={user}/>
      <Permissions user={user}/>
    </Content>
  );
};

export default UserSetup;

const Content = styled.div`
  max-width: 1400px;
  margin: auto;
  margin-top: 60px;
  padding: 20px;


  display:flex;
  flex-wrap:wrap;
  gap:40px 20px;
  justify-content:space-evenly;
`;







