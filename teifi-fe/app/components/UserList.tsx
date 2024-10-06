import '@shopify/polaris/build/esm/styles.css';
import {DataTable} from '@shopify/polaris'
import UpdateUserModal from './UpdateUserModal';
import {selectUsers, getUsers, selectStatus } from '@/lib/features/customers/customerSlice';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { useEffect } from 'react';


const UserList = () =>{
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const users = useAppSelector(selectUsers);
    const status = useAppSelector(selectStatus);

    const customers:any[] = [];
    if(users){
        console.log(users);
        users.map((user:any) => {
        customers.push([user.firstName, user.lastName, user.email, user.tags, <UpdateUserModal user={user}/>]);
        });
    }

  return (
  <>
    {status == "loading" ? <div>Loading...</div> :
    <DataTable
        columnContentTypes={['text', 'text', 'text', 'text', 'text']}
        headings={['First Name', 'Last Name', 'Email', 'Tags', 'Actions']}
        rows={customers}
         />}
    </>
);
}
export default UserList;