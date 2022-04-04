import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";
import { addUser } from "../redux/actions";

// permissions


const permissionsData = {
  superAdmin:false,
  permissionsGroups:[
    { id:0,
      name:"permissionName1",
      active:true,
      group:[
        {id:0, name:"permission1", active:false},
        {id:1, name:"permission11", active:true},
        {id:2, name:"permission1323", active:false},
        {id:3, name:"permission12", active:true},
        {id:4, name:"permission1122", active:true}
      ]
    },
    {id:1,
      name:"permissionName2",
      active:true,
      group:[
        {id:0, name:"permission1", active:false},
        {id:1, name:"permission2", active:true},
        {id:2, name:"permission3", active:false},
        {id:3, name:"permission4", active:true},
        {id:4, name:"permission5", active:true}
      ]
    },
    {id:2,
      name:"permissionName3",
      active:true,
      group:[
        {id:0, name:"permission1", active:false},
        {id:1, name:"permission12", active:true},
        {id:2, name:"permission13", active:false},
        {id:3, name:"permission14", active:true},
        {id:4, name:"permission15", active:true}
      ]
    }
  ]
}


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
  email: Yup.string().email("Invalid email").required("Required"),
  
});

//  form

const AddUser = ({closeModal, notify}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const handleSubmit = (values) => {
    const updated = [...users];
    const id = uniqid();
    updated.push({ id:id , ...values, active:true, permissions:permissionsData })
    dispatch(addUser(updated));
    notify()
    closeModal()
  };

  return (
    <FormWrapper>

      <FormTitle>Invite New User</FormTitle>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          role: "admin",
        }}
        validationSchema={AddUserSchema}
        onSubmit={handleSubmit}
        onChange={(values) => console.log(values)}
      >
        {({ errors, touched, values, isSubmitting }) => (
          <FormStyled>
            <FieldContainer>
              <FormIcon>
                <img src={"/images/face.svg"} alt="icon" />
              </FormIcon>
              <FieldStyled
                name="firstName"
                placeholder={"* first name"}
                invalid={errors.firstName && touched.firstName}
              />
              <FieldStyled
                name="lastName"
                placeholder={"* last name"}
                invalid={errors.lastName && touched.lastName}
              />
            </FieldContainer>
            <FieldContainer>
              <FormIcon>
                <img src={"/images/email.svg"} alt="icon" />
              </FormIcon>
              <FieldStyled
                name="email"
                type="email"
                placeholder={"* email"}
                invalid={errors.email && touched.email}
              />
            </FieldContainer>
            <FieldContainer>
              <FormIcon>
                <img src={"/images/key.svg"} alt="icon" />
              </FormIcon>
              <Field as="select" name="role" className="form__select">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Field>
            </FieldContainer>
            <FormFooter
              isSubmitting={
                !errors.firstName &&
                !errors.lastName &&
                !errors.email &&
                values.firstName &&
                values.lastName &&
                values.email
              }
            >
              <button type="submit">send invitation</button>{" "}
              <span className={"validated"}>good to go</span>
              <span className={"invalid"}>fill in all the fields</span>
            </FormFooter>
          </FormStyled>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default AddUser;

const FormWrapper = styled.div`
  padding: 70px;
  width: 100%;
  max-width: 650px;
`;

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .form__select {
    width: 200px;
    border: none;
    border-bottom: 1px solid gray;
  }
`;

const FormTitle = styled.div`
  width: 100%;
  text-align: left;
  font-size: 36px;
  margin-bottom: 60px;
  padding-left: 40px;
`;

const FieldStyled = styled(Field)`
  width: 220px;
  flex: 1 220px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  padding-left: 5px;
  border-color: ${(props) => (props.invalid ? "red" : "gray")};
`;

const FieldContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const FormFooter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > button {
    background-color: ${(props) => (props.isSubmitting ? "#44A0D3" : "gray")};
    color: ${(props) => (props.isSubmitting ? "white" : "#3b3b3b")};
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    outline: none;
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

const FormIcon = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
