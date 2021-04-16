import Link from 'next/link'
import { useCount, useDispatchCount } from './utils/state'

const HomePage = () => {
  const count = useCount()
  const dispatch = useDispatchCount()

  const handleIncrease = (event) =>
    dispatch({
      type: 'INCREASE',
    })
  const handleIncrease15 = (event) =>
    dispatch({
      type: 'INCREASE_BY',
      payload: 15,
    })

  return (
    <>
    <h1>ABOUT</h1>
    <p>Counter: {count}</p>
    <button onClick={e => handleIncrease(e)}>Increase</button>
    <button onClick={e => handleIncrease15(e)}>Increase By 15</button>
    <p>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </p>
  </>
  )
}

export default HomePage;