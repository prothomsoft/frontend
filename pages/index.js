import Link from 'next/link'

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </p>
    </div>
  )
}

export default HomePage;
