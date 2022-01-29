import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/layout";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <title>Authentication</title>
          <meta
            name="viewport"
            contents="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
