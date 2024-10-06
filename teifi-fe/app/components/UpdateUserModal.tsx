'use client'
import '@shopify/polaris/build/esm/styles.css';
import {Button, Modal, PageActions} from '@shopify/polaris';
import EmailInput from './EmailInput';
import TextInput from './TextInput';
import { useState } from "react";

export default function UpdateUserModal(
  user:any
) {  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(false);
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      setEmailError(true);
    }
  }

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    setFirstNameError(false);
  };

  const handleFirstNameBlur = () => {
    const nameRegex = /^[a-zA-Z\s\-]+$/;
    const fn = firstName.trim();
    if (fn.length < 2 || !nameRegex.test(fn)) {
      setFirstNameError(true);
    }
    else{
      setFirstName(fn);
    }
  }

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    setLastNameError(false);
  };

  const handleLastNameBlur = () => {
    const nameRegex = /^[a-zA-Z\s\-]+$/;
    const ln = lastName.trim();
    if (ln.length < 2 || !nameRegex.test(ln)) {
      setLastNameError(true);
    }
    else{
      setLastName(ln);
    }
  }

   const handleFormSubmit = (id:string) => {
    if (emailError || firstNameError || lastNameError) {
        return;
      }
      if(email === "" || firstName === "" || lastName === ""){
        return;
      }
    if(user.id){
        // make api call to back-end to update the user
    }
  }

   const handleClearFields = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setEmailError(false);
    setFirstNameError(false);
    setLastNameError(false);
   }

   const handleCloseModal = () => {
    setShowModal(false);
    handleClearFields();
   }

   const handleDeleteUser = (id:string) => {
    // make api call to back-end to delete the user using the id
   }

  return (
    <>
      <Button onClick={()=>setShowModal(true)} variant='primary'>Update User</Button>
      <Button onClick={()=>handleDeleteUser(user.id)} variant='secondary'>Delete user</Button>
      <Modal title="Update User" open={showModal} onClose={handleCloseModal}>
            <TextInput value={firstName} onChange={handleFirstNameChange} onBlur={handleFirstNameBlur} err={firstNameError} label="First Name"/>
            <TextInput value={lastName} onChange={handleLastNameChange} onBlur={handleLastNameBlur} err={lastNameError} label="Last Name"/>
            <EmailInput value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} err={emailError}/>
            <br />
            <PageActions
            primaryAction={{content:'Save', onAction:()=>handleFormSubmit(user.id)}} 
            secondaryActions={[{content:'Discard', destructive:true, onAction:handleClearFields}]}/>
      </Modal>
    </>
  );
}
