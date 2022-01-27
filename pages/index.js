import StartingPageContent from "../components/starting-page/starting-page";
import { getSession } from "next-auth/react";
function HomePage() {
  return <StartingPageContent />;
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
