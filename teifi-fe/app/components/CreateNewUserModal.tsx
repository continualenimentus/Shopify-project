'use client'
import '@shopify/polaris/build/esm/styles.css';
import {Button, Modal, PageActions} from '@shopify/polaris';
import EmailInput from '@/app/components/EmailInput';
import TextInput from '@/app/components/TextInput';
import { useState } from "react";
import { createNewUser, getUsers } from '@/lib/features/customers/customerSlice';
import { useAppDispatch } from '@/lib/hooks';

export default function CreateUserModal() {  
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const createUser = async() => {
    await dispatch(createNewUser({firstName: firstName, lastName: lastName, email: email}));
    dispatch(getUsers());
    handleCloseModal();
  };

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

   const handleFormSubmit = () => {
        if (emailError || firstNameError || lastNameError) {
            return;
        }
        else if(email === "" || firstName === "" || lastName === ""){
            return;
        }
        else createUser();
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
    handleClearFields();
    setShowCreateModal(false);
    document.getElementById('createModalButton')?.classList.remove('hidden');
   }

   const handleOpenModal = () => {
    setShowCreateModal(true);
    document.getElementById('createModalButton')?.classList.add('hidden');
   }


  return (
    <>
      {!showCreateModal&&<Button onClick={handleOpenModal} variant='primary' id='createModalButton'>Create new user</Button>}
      <Modal title="Create new" open={showCreateModal} onClose={handleCloseModal}>
            <TextInput value={firstName} onChange={handleFirstNameChange} onBlur={handleFirstNameBlur} err={firstNameError} label="First Name"/>
            <TextInput value={lastName} onChange={handleLastNameChange} onBlur={handleLastNameBlur} err={lastNameError} label="Last Name"/>
            <EmailInput value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} err={emailError}/>
            <br />
            <PageActions
            primaryAction={{content:'Save', onAction:handleFormSubmit}} 
            secondaryActions={[{content:'Discard', destructive:true, onAction:handleClearFields}]}/>
      </Modal>
    </>
  );
}
