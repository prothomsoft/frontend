import Router from 'next/router'
import jwt_decode from 'jwt-decode'
import { useCallback } from 'react'
import { useAuthState, useAuthDispatch } from './auth-provider'
import { setCookie, destroyCookie } from 'nookies'
import { loginUser, registerUser } from '../api/api'

export const useAuth = () => {
    const authState = useAuthState()
    const authDispatch = useAuthDispatch()

    const login = async (username, password, path) => {
      
        const jwt = await loginUser(username, password);
       
        if (jwt == "") {
            return false;
        }

        setCookie(null, 'jwt', jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
        });

        var decoded = jwt_decode(jwt);
       
        authDispatch({
            type: 'LOGIN',
            payload: {
                token: jwt, 
                username : decoded.sub
            }            
        })

        Router.push(path);
    }

    const register = async (username, password, roles, enabled, path) => {
        
        await registerUser(username, password, roles, enabled);
        
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