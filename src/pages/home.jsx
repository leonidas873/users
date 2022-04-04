import styled from 'styled-components';
import Header from "../components/Header";
import UsersTable from "../components/UsersTable";
import {CgMathPlus} from 'react-icons/cg';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import AddUser from '../components/AddUser';
import { ToastContainer, toast } from "react-toastify";

const AddIcon = ({onClick}) => {


    return (
      <CostumIcon onClick={onClick}>
        <CgMathPlus />
      </CostumIcon>
    );
  };
  
  const CostumIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #305eca;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: white;
    font-size: 37px;
  `;

const Home = () => {
    
    const [show, setShow] = useState(false);

    
    return <div>
        <Header icon={<AddIcon onClick={()=>setShow(true)}/>} heading={"Proect Acess"} search={true}/>
        <UsersTable/>
        <ToastContainer autoClose={1000}/>
        <ModalStyled show={show} onHide={()=>setShow(false)} centered>
            <AddUser closeModal={()=>setShow(false)} notify={()=>toast("user is invited")}/>
        </ModalStyled>
        </div>
}

export default Home;

const ModalStyled = styled(Modal)`
  
.modal-dialog{
  max-width:min-content;
}

`