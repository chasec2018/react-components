
export interface IAuthComponentProps {
    error: any;
    isAuthenticated: boolean;
    user: any;
    login: Function;
    logout: Function;
    getAccessToken: Function;
    setError: Function;
}

export interface IAuthProviderState {
    error: any;
    isAuthenticated: boolean;
    user: any;
}