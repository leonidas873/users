import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {  updateUser } from "../redux/actions";
import Switcher from "./Switcher";

//  form validation

const AddUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  
  
});
const UserDetails = ({user}) => {


    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    
    const handleSubmit = (values) => {
        const updatedUsers = users.map(elem=>((elem.id === user.id) ? {...elem, ...values} : elem ))
        dispatch(updateUser(updatedUsers));
      console.log(updatedUsers)
 

    };
    const handleStatusChange = (id,active) => {
        const updatedUsers = users.map(user=>((user.id === id) ? {...user, active:!active} : user ))
        dispatch(updateUser(updatedUsers))
        
    }


    return <DetailsWrapper>
    <UserDetailsStyled>
    
<Heading>Details</Heading>
<StatusSwitcher>
    <Switcher active={user.active} onClick={() => handleStatusChange(user.id, user.active)}/>
    <span>The user is </span>
    <strong>{user.active ? "active" : "inactive"}</strong>
</StatusSwitcher>
<Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }}
        validationSchema={AddUserSchema}
        onSubmit={handleSubmit}
        onChange={(values) => console.log(values)}
      >
        {({ errors, touched, values, isSubmitting }) => (
          <FormStyled>
        
              <FieldStyled
                name="firstName"
                placeholder={"* first name"}
                invalid={errors.firstName && touched.firstName}
                disabled={!user.active}
                
              />
              <FieldStyled
                name="lastName"
                placeholder={"* last name"}
                invalid={errors.lastName && touched.lastName}
                disabled={!user.active}
                
              />
        
        
        
            
              <Field as="select" name="role" className="form__select" disabled={!user.active}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Field>
        
            <FormFooter
              isSubmitting={
                !errors.firstName &&
                !errors.lastName &&
                values.firstName &&
                values.lastName 
              }
              active={user.active}
            >
              <button type="submit">save changes</button>
            </FormFooter>
          </FormStyled>
        )}
      </Formik>
    </UserDetailsStyled>
    </DetailsWrapper>

}

export default UserDetails;

const DetailsWrapper = styled.div`
  display:flex;
  justify-content:center;
  flex:1 300px;
`

const UserDetailsStyled = styled.div`
    padding:0 70px;
    
`

const Heading = styled.h2`
margin:0;
    padding:0;
    font-size:36px;
padding-bottom:55px;
text-align:left;
`

const StatusSwitcher = styled.div`
position:relative;
text-align:left;
img{
    position:absolute;
    position: absolute;
    left: -50px;
}
`


//  form 



const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top:30px;
  
  .form__select {
    width: 220px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  padding-left: 5px;
  background-color:transparent;
  border-color: ${(props) => (props.invalid ? "red" : "gray")};
  color:gray;
  }
`;


const FieldStyled = styled(Field)`
  width: 220px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  padding-left: 5px;
  background-color:transparent;
  border-color: ${(props) => (props.invalid ? "red" : "gray")};
  
`;



const FormFooter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction:column;
  

  & > button {
    background-color: ${(props) => (props.isSubmitting ? "#44A0D3" : "gray")};
    color: ${(props) => (props.isSubmitting ? "white" : "#3b3b3b")};
box-shadow: 0px 3px 6px #00000029;    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    outline: none;
    opacity:${props=>props.active ? "1" : "0"};
    transition:0.4s;
  }

  .validated {
    display: ${(props) => (props.isSubmitting ? "block" : "none")};
    color: green;
    font-style: italic;
  }

  .invalid {
    display: ${(props) => (!props.isSubmitting ? "block" : "none")};
    color: red;
    font-style: italic;
  }
`;

