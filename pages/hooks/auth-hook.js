import Router from 'next/router'
import { useCallback, useEffect } from "react";
import { useAuthState, useAuthDispatch } from './auth-provider'
import { setCookie, destroyCookie } from 'nookies'
import jwt_decode from "jwt-decode";

export const useAuth = () => {
    const authState = useAuthState()
    const authDispatch = useAuthDispatch()

    const login = async (username, password, path) => {
        const loginDto = {
            username : username,
            password: password
        }
        const server = 'http://localhost:5000';
        const login = await fetch(`${server}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDto)
        })
        const loginResponse = await login.json();

        setCookie(null, 'jwt', loginResponse.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
        });

        var decoded = jwt_decode(loginResponse.jwt);
       
        authDispatch({
            type: 'LOGIN',
            payload: {
                token: loginResponse.jwt, 
                username : decoded.sub
            }            
        })

        Router.push(path);
    }

    const register = async (username, password, roles, enabled, path) => {
        const registerDto = {
            username : username,
            password: password,
            roles: roles,
            enabled: enabled
        }
        const server = 'http://localhost:5000';
        const register = await fetch(`${server}/register`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerDto)
        })
        ///const registerResponse = await register.json();

        Router.push(path);
    }

    const logout = useCallback((path) => {

        destroyCookie(null, 'jwt')

        authDispatch({
            type: 'LOGOUT',
            payload: {
                token: null, 
                username : null
            }
        })

        Router.push(path);
    }, [])

    return { login, logout, register, authState }
}