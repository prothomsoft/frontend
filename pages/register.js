import {useState} from 'react'
import { useAuth } from "../hooks/auth-hook";

const Login = () => {    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {register} = useAuth();
    return (
        <div>
            <h1>Register user</h1>
            <form>
                <input type="text" onChange = {e => setUsername(e.target.value)} value={username} /><br/>
                <input type="text" onChange = {e => setPassword(e.target.value)} value={password}/><br/>
                <button type="button" onClick = {e => register(username, password, 'USER', true, '/login')}>Register</button>
            </form>
        </div>
    )
}
export default Login;