import {useState} from 'react'
import {setCookie} from 'nookies'
import Router from 'next/router'
import Link from 'next/link'
import { useCount, useDispatchCount } from './utils/state'

export const server = 'http://localhost:5000';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const count = useCount();
 
    async function handleLogin () {
        
        const loginCredentials = {
            username : username,
            password: password
        }

        const login = await fetch(`${server}/login`,
        {
            method: "POST",
            headers: {
            Accept: "application/json; charset=UTF-8"
            },
            body: JSON.stringify(loginCredentials)
        })

        const loginResponse = await login.json();

        setCookie(null, 'jwt', loginResponse.jwt, {
            maxAge: 30 * 24 * 60 *60,
            path: '/'
        });

        Router.push('payed-articles');
    }

    return (<div>
        
        <h1>Login page {count}</h1>
        <form>
            <input type="text" onChange = {e => setUsername(e.target.value)} value={username} /><br/>
            <input type="text" onChange = {e => setPassword(e.target.value)} value={password}/><br/>
            <button type="button" onClick = {e => handleLogin()}>Login</button>
        </form>
        
        <p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </p>
        </div>)
}
export default Login;