import Link from 'next/link'
import { useAuth } from "./hooks/auth-hook";

const HomePage = () => {
  const {authState} = useAuth();

  return (
    <>
    <h1>Home</h1>
    <p>Token: {authState.token} {authState.username}</p>
    <p>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </p>
  </>
  )
}

export default HomePage;