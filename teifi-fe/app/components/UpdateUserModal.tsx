'use client'
import '@shopify/polaris/build/esm/styles.css';
import {Button, Modal, PageActions} from '@shopify/polaris';
import EmailInput from './EmailInput';
import TextInput from './TextInput';
import { useState } from "react";
import { updateCurrentUser, getUsers, deleteCurrentUser} from '@/lib/features/customers/customerSlice';
import { useAppDispatch } from '@/lib/hooks';

export default function UpdateUserModal(user:any) {  
  const dispatch = useAppDispatch();
  const u = user.user;
  const [email, setEmail] = useState(u.email);
  const [emailError, setEmailError] = useState(false);
  const [firstName, setFirstName] = useState(u.firstName);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState(u.lastName);
  const [lastNameError, setLastNameError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => { 
    setShowModal(true);
    document.getElementById('createModalButton')?.classList.add('hidden');
   }

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

   const handleFormSubmit = async(id:string) => {
    if (emailError || firstNameError || lastNameError) {
        return;
    }
    else if(email === "" || firstName === "" || lastName === ""){
    return;
    }
    else{
      await dispatch(updateCurrentUser({id, firstName, lastName, email}));
      dispatch(getUsers());
      handleCloseModal();
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
    document.getElementById('createModalButton')?.classList.remove('hidden');
   }

   const handleDeleteUser = async(id:string) => {
    await dispatch(deleteCurrentUser(id));
    dispatch(getUsers());
   }

  return (
    <>
      <Button onClick={()=>handleShowModal()} variant='primary'>Update User</Button>
      <Button onClick={()=>handleDeleteUser(u.id)} variant='secondary'>Delete user</Button>
      <Modal title="Update User" open={showModal} onClose={handleCloseModal}>
            <TextInput value={firstName} onChange={handleFirstNameChange} onBlur={handleFirstNameBlur} err={firstNameError} label="First Name"/>
            <TextInput value={lastName} onChange={handleLastNameChange} onBlur={handleLastNameBlur} err={lastNameError} label="Last Name"/>
            <EmailInput value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} err={emailError}/>
            <br />
            <PageActions
            primaryAction={{content:'Save', onAction:()=>handleFormSubmit(u.id)}} 
            secondaryActions={[{content:'Discard', destructive:true, onAction:handleClearFields}]}/>
      </Modal>
    </>
  );
}
