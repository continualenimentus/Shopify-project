import '@shopify/polaris/build/esm/styles.css';
import {DataTable} from '@shopify/polaris'
import UpdateUserModal from './UpdateUserModal';

const UserList = (users:any
) =>{
  let customers: any[][] = [];
  if(users.users){
    users.users.map((user:any) => {
      const u = user.node;
      customers.push([u.firstName, u.lastName, u.email, u.tag, <UpdateUserModal user={u}
        />]);
    });
  }

  return (
    <DataTable
        columnContentTypes={['text', 'text', 'text', 'text', 'text']}
        headings={['First Name', 'Last Name', 'Email', 'Tag', 'Actions']}
        rows={customers}
         />
);
}
export default UserList;