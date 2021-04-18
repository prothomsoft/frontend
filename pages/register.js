import {useState} from 'react'
import Link from 'next/link'
import { useAuth } from "./hooks/auth-hook";

const Login = () => {    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState('USER')
    const [enabled, setEnabled] = useState('true')
    const {login, register, authState} = useAuth();
    return (
        <div>
            <h1>Register user: {authState.token}{authState.username}</h1>
            <form>
                <input type="text" onChange = {e => setUsername(e.target.value)} value={username} /><br/>
                <input type="text" onChange = {e => setPassword(e.target.value)} value={password}/><br/>
                <button type="button" onClick = {e => register(username, password, roles, enabled, '/login')}>Register</button>
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