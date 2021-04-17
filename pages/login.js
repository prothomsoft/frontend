import {useState} from 'react'
import Link from 'next/link'
import { useAuth } from "./hooks/auth-hook";

const Login = () => {    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, authState} = useAuth();
    return (
        <div>
            <h1>Login page token: {authState.token}{authState.username}</h1>
            <form>
                <input type="text" onChange = {e => setUsername(e.target.value)} value={username} /><br/>
                <input type="text" onChange = {e => setPassword(e.target.value)} value={password}/><br/>
                <button type="button" onClick = {e => login(username, password, '/payed-articles')}>Login</button>
            </form>
            <p>
            <Link href="/">
                <a>Home</a>
            </Link>
            </p>
        </div>
    )
}
export default Login;