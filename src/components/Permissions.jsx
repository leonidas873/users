import styled from "styled-components";
import Switcher from "./Switcher";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/actions";

const Permissions = ({ user }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const changeSuperAdmin = (bool) => {
    const updatedUser = {
      ...user,
      permissions: { ...user.permissions, superAdmin: !bool },
    };
    const updatedUsers = users.map((elem) =>
      elem.id === user.id ? updatedUser : elem
    );
    dispatch(setUsers(updatedUsers));
    console.log(updatedUser);
    console.log(user);
  };



  return (
    <PermissionsStyled>
      <Heading>
        <h2>Permissions</h2>
        <span>admin</span>
      </Heading>
      <SuperAdmin active={user.active}>
        <strong>Super Admin</strong>
        <Switcher
          active={user.permissions.superAdmin}
          onClick={() => changeSuperAdmin(user.permissions.superAdmin)}
          disabled={!user.active}
        />
      </SuperAdmin>
      {user.permissions.permissionsGroups.map((item, index) => (
        <PermissionsGroup
          key={item.id}
          permissionsGroup={item}
          active={user.active}
          user={user}
          groupIndex={index}
        />
      ))}
    </PermissionsStyled>
  );
};

export default Permissions;

const PermissionsStyled = styled.div`
  flex: 1 350px;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  h2 {
    margin: 0;
    padding: 0;
    font-size: 36px;
  }

  span {
    color: #4b4343;
  }
  margin-bottom: 55px;
`;

const SuperAdmin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #4a4a4a20;
  padding: 20px 0;
  opacity: ${(props) => (props.active ? "1" : "0.35")};
`;

const PermissionsGroup = ({ active, permissionsGroup, user, groupIndex }) => {
  const [showBody, setShowBody] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const changePermissionsGroup = (bool, id) => {

    const updatedGroup = user.permissions.permissionsGroups.find(
      (elem) => elem.id === id 
    ).group.map(elem=>({...elem, active:!bool}));

    const updatedPermissionsGroups = user.permissions.permissionsGroups.map(
      (elem) => (elem.id === id ? { ...elem, group:updatedGroup, active: !bool } : elem)
    );




    const updatedUser = {
      ...user,
      permissions: {
        ...user.permissions,
        permissionsGroups: updatedPermissionsGroups,

      },
    };
    const updatedUsers = users.map((elem) =>
      elem.id === user.id ? updatedUser : elem
    );
    dispatch(setUsers(updatedUsers));
   
  };

  const changeSinglePermission = (bool, id, index, permissionsGroup) => {
      const updatedPermissions = user.permissions.permissionsGroups[index].group.map(
            (elem) => ((elem.id === id) ? { ...elem, active: !bool } : elem)
          );;
    const updatedPermissionsGroups = user.permissions.permissionsGroups.map(
        (elem) => (elem.id === permissionsGroup.id ? { ...elem, group: updatedPermissions } : elem)
      );
      const updatedUser = {
        ...user,
        permissions: {
          ...user.permissions,
          permissionsGroups: updatedPermissionsGroups,

        },
      };
      const updatedUsers = users.map((elem) =>
        elem.id === user.id ? updatedUser : elem
      );
      dispatch(setUsers(updatedUsers));
        
  };

  return (
    <PermissionGroupStyled active={active}>
      <PermissionGroupHead>
        <MdKeyboardArrowDown onClick={() => setShowBody((state) => !state)} />
        <strong onClick={() => setShowBody((state) => !state)}>
          {permissionsGroup.name}
        </strong>{" "}
        <Switcher
        disabled={!user.active}
          active={permissionsGroup.active}
          onClick={() =>
            changePermissionsGroup(permissionsGroup.active, permissionsGroup.id)
          }
        />
      </PermissionGroupHead>
      {showBody && (
        <PermissionGroupBody>
          {permissionsGroup.group.map((item) => (
            <SinglePermission key={item.id} active={item.active}>
              <GoPrimitiveDot /> <strong>{item.name}</strong>{" "}
              <Switcher disabled={!user.active} active={item.active} onClick={()=>changeSinglePermission(item.active,item.id, groupIndex, permissionsGroup)}/>
            </SinglePermission>
          ))}
        </PermissionGroupBody>
      )}
    </PermissionGroupStyled>
  );
};

const PermissionGroupStyled = styled.div`
  border-bottom: 2px solid #4a4a4a20;
  opacity: ${(props) => (props.active ? "1" : "0.35")};
`;

const PermissionGroupHead = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 20px 0;
  cursor: pointer;
    
  & > svg {
    position: absolute;
    left: -18px;
    top: 27px;
    color: black;
  }
`;

const PermissionGroupBody = styled.div`
  padding-left: 40px;
  padding-bottom: 20px;
`;

const SinglePermission = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 10px 0;
  & > svg {
    position: absolute;
    color:${props=>props.active ? "#44a0d3" : "red"} ;
    top: 6px;
    left: -17px;
  }
`;
