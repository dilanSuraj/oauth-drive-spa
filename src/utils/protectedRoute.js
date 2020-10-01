import React from 'react';
import Auth from './auth';

import { Route, Redirect, HashRouter } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {

    return (
        
            <Route
                {...rest}
                render={
                    (props) => {
                        if (Auth.checkAuthenticated()) {
                            return <Component {...props} />
                        }
                        else {
                            return <Redirect from={props.location} to="/register" />
                        }
                    }

                }
            />
  
    );
}