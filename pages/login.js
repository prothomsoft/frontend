import { useState } from 'react'
import { useAuth } from '../hooks/auth-hook'

const Login = () => {    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useAuth();
    return (
        <div>
            <h1>Login page</h1>
            <form>
                <input type="text" onChange = {e => setUsername(e.target.value)} value={username} /><br/>
                <input type="text" onChange = {e => setPassword(e.target.value)} value={password}/><br/>
                <button type="button" onClick = {e => login(username, password, '/posts')}>Login</button>
            </form>
        </div>
    )
}
export default Login;