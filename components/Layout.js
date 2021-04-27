import Link from "next/link";
import Head from "next/head";
import { useAuth } from "../hooks/auth-hook";

export default function Layout({
  children,
  title = "This is the default title",
}) {
  const { logout, authState } = useAuth();

  let logoutButton = null;
  if (authState.username) {
    logoutButton = (
      <button type="button" onClick={(e) => logout("/login")}>
        Logout
      </button>
    );
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          |{" "}
          <Link href="/login">
            <a>Login</a>
          </Link>{" "}
          |{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>{" "}
          |{" "}
          <Link href="/upload-file">
            <a>Upload File</a>
          </Link>{" "}
          |{" "}
          <Link href="/upload-files">
            <a>Upload Files</a>
          </Link>{" "}
          |{" "}
          <Link href="/posts">
            <a>Posts</a>
          </Link>{" "}
          | {logoutButton}
        </nav>
      </header>

      {children}

      <footer>
        <br />
        {"footer"}
      </footer>
    </div>
  );
}
