import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";
import Head from "next/head";

function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta
          name="Profile"
          content={`You may proceed to change your password as this is your profile page`}
        />
      </Head>
      <UserProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default ProfilePage;
