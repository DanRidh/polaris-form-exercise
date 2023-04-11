import React from 'react';
import { Layout, Page } from '@shopify/polaris';
import UpdateUserForm from '../components/UpdateUserForm';

const UpdateUser = () => {
  // I'm assuming that we are just mocking the backend data based on the README
  // but if using an API we can just add the fetch here in a useEffect
  const mockUserData = {
    "first_name": "Lunaris",
    "last_name": "S.",
    "address": "Tokyo, Kichijoji Honcho 1",
    "birthday": "2008-02-20",
    "gender": "unknown"
  }

  return (
    <Page title="Update User">
      <Layout>
        <Layout.Section>
          <UpdateUserForm userData={mockUserData} />
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default UpdateUser;