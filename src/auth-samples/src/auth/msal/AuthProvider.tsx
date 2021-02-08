import React, { useContext, useState, useEffect, useCallback, createContext } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { authConfigurations } from './AuthConfig';


export interface IAuthContext {
    error: any;
    isAuthenticated: boolean;
    user: any;
    login: Function;
    logout: Function;
    getAccessToken: Function;
    //getUserDetails: Function;
}

export const AutContextDefault = {
    error: null,
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
    getAccessToken: (scopes: string[]) => { }
    //getUserDetails: () => { }
}

//Auth Context
const AuthContext = createContext<IAuthContext>(AutContextDefault)


export const useAuth = (): IAuthContext => {

    const [error, setError] = useState<any>();
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setAuthenticated] = useState(false);


    const publicClientApplication = new PublicClientApplication({
        auth: {
          clientId: authConfigurations.appId,
          redirectUri: authConfigurations.redirectUri,
          authority: authConfigurations.authority
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: false
        }
      });

    const login = useCallback(async() => {

        try {
            // Login via popup
            await publicClientApplication.loginPopup(
              {
                scopes: authConfigurations.scopes,
                prompt: "select_account"
              });
    
            // After login, get the user's profile
            //await getUserProfile();
          }
          catch (err) {
            setAuthenticated(false); 
            setError(err);
          }

        setAuthenticated(true);
    }, [])

    const logout = useCallback((): void  =>{
        publicClientApplication.logout()
    }, [])

    const getAccessToken = useCallback(async(scopes: string[])  =>{
        try {
            const accounts = publicClientApplication
              .getAllAccounts();
    
            if (accounts.length <= 0) throw new Error('login_required');
            // Get the access token silently
            // If the cache contains a non-expired token, this function
            // will just return the cached token. Otherwise, it will
            // make a request to the Azure OAuth endpoint to get a token
            var silentResult = await publicClientApplication
              .acquireTokenSilent({
                scopes: scopes,
                account: accounts[0]
              });
    
            return silentResult.accessToken;
          } catch (err) {
            // If a silent request fails, it may be because the user needs
            // to login or grant consent to one or more of the requested scopes
            if (isInteractionRequired(err)) {
              var interactiveResult = await publicClientApplication
                .acquireTokenPopup({
                  scopes: scopes
                });
    
              return interactiveResult.accessToken;
            } else {
              throw err;
            }
          }
    }, [])

    const isInteractionRequired = (error: Error): boolean => {
        if (!error.message || error.message.length <= 0) {
          return false;
        }
  
        return (
          error.message.indexOf('consent_required') > -1 ||
          error.message.indexOf('interaction_required') > -1 ||
          error.message.indexOf('login_required') > -1 ||
          error.message.indexOf('no_account_in_silent_request') > -1
        );
      }

    return {
        error,
        isAuthenticated,
        user,
        logout,
        login,
        getAccessToken
    }
}

export default AuthContext;