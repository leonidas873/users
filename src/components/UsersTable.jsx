import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import SingleUser from "./SingleUser";

const UsersTable = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);
  const [sort, setSort] = useState({ type: "", asc: true });
  const [sortBy, setSortBy] = useState("");
  const users = useSelector((state) => state.users);
  const [force, setForce] = useState(0);
//  pagination




const [itemOffset, setItemOffset] = useState(0);
const [endOffset, setEndOffset] = useState(0)

  const handleSortChange = (sortType) => {
    setSort((state) =>
      state.type === sortType
        ? { ...state, asc: !state.asc }
        : { type: sortType, asc: true }
    );

    if (sortType === "user") {
      setSortBy("firstName");
    } else if (sortType === "role") {
      setSortBy("role");
    } else if (sortType === "status") {
      setSortBy("active");
    }
  };

  // useEffect(()=>{

  let createDisplayUsers = sort.type
    ? (
      sort.type !== "user" ?
      users.sort((a, b) =>
        sort.asc
          ? String(a[sortBy]).toUpperCase() > String(b[sortBy]).toUpperCase()
            ? 1
            : -1
          : String(a[sortBy]).toUpperCase() < String(b[sortBy]).toUpperCase()
          ? 1
          : -1
      ) :
      users.sort((a, b) =>
        sort.asc
          ? (`${a.firstName}${a.lastName}`).toUpperCase() > (`${b.firstName}${b.lastName}`).toUpperCase()
            ? 1
            : -1
          : (`${a.firstName}${a.lastName}`).toUpperCase() < (`${b.firstName}${b.lastName}`).toUpperCase()
          ? 1
          : -1
      )
      
      )
    : users;
  createDisplayUsers = users?.filter((user) =>
    (user.firstName + " " + user.lastName)
      .toLowerCase()
      .includes(searchQuery.toLocaleLowerCase())
  );
  const displayUsers = createDisplayUsers;
  useEffect(()=>{
    setItemOffset(0);
    setEndOffset(5);
    setForce(0)
  },[searchQuery])

  

  
  return (
    <UsersTableStyled>
      <UsersTableContent>
        <Thead>
          <HeadItem
            onClick={() => handleSortChange("user")}
            active={sort.type === "user"}
          >
            <span>USER</span>
            <IoMdArrowDropdown />
          </HeadItem>
          <HeadItem
            onClick={() => handleSortChange("role")}
            active={sort.type === "role"}
          >
            <span>ROLE</span>
            <IoMdArrowDropdown />
          </HeadItem>
          <HeadItem
            onClick={() => handleSortChange("status")}
            active={sort.type === "status"}
          >
            <span>STATUS</span>
            <IoMdArrowDropdown />
          </HeadItem>
          <HeadItem>
            <span>ACTIONS</span>
          </HeadItem>
        </Thead>
        <Tbody>
          {displayUsers &&
            displayUsers.slice(itemOffset, endOffset).map((user) => (
              <SingleUser user={user} key={user.id} />
            ))}
        </Tbody>
        {Object.keys(displayUsers).length !== 0 && <Pagination force={force} setForce={(n)=>setForce(n)} searchQuery={searchQuery} items={displayUsers}
        setItemOffsetP = {(e) => setItemOffset(e)}
        setEndOffsetP = {(e) => setEndOffset(e)}
        />}
      </UsersTableContent>
    </UsersTableStyled>
  );
};

export default UsersTable;

const UsersTableStyled = styled.div`
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
`;
const UsersTableContent = styled.div`
  max-width: 1400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
  padding-bottom:100px;
`;

const Thead = styled.div`
  display: flex;
  padding: 30px 0;
  justify-content: space-between;
  gap: 30px;
  border-bottom: 2px solid #a3a3a3;
`;

const HeadItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => (props.active ? "#000000" : "#0000007b")};

  &:nth-child(1) {
    flex: 2;
    justify-content: flex-start;
  }
`;
const Tbody = styled.div`
  display: flex;
  flex-direction: column;
`;
