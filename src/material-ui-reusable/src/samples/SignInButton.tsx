import React from 'react';
import Button from '@material-ui/core/Button';
import { AccountCircle } from '@material-ui/icons';

const SignInButton = () => {
    return(
        <> 
            <AccountCircle />
            <Button className="btn-link nav-link border-0"> Sign Out</Button>
        </>
    );
}

export default SignInButton;