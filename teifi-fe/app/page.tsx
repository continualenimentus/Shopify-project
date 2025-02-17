'use client'
import UserList from "./components/UserList";
import CreateUserModal from "./components/CreateNewUserModal";
import { AppProvider } from "@shopify/polaris";
import enTranslations from '@shopify/polaris/locales/en.json';

export default function IndexPage() {
  return (
    <>
      <AppProvider i18n={enTranslations}>
      <CreateUserModal/>
      <br />
      <UserList />
      </AppProvider>
    </>
    )
}
