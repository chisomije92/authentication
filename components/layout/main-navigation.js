import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { data: session, status, loading } = useSession();
  console.log(loading);
  console.log(status);
  console.log(session);

  const isAuthenticated = status === "authenticated";

  const isLoading = loading === "loading";

  function logOutHandler() {
    signOut();
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!isAuthenticated && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {isAuthenticated && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}

          {isAuthenticated && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
