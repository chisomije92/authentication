import StartingPageContent from "../components/starting-page/starting-page";
import { getSession } from "next-auth/react";
import Head from "next/head";
function HomePage() {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta
          name="welcome"
          content={`Hi!, welcome to nextAuth. The service for you.`}
        />
      </Head>
      <StartingPageContent />
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

export default HomePage;
