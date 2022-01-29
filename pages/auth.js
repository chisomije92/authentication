import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const headData = (
    <Head>
      <title>Sign-Up/Login</title>
      <meta
        name="authentication"
        content={`Sign up or login to make use of the services offered`}
      />
    </Head>
  );

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {headData}
      <AuthForm />
    </>
  );
}

export default AuthPage;
