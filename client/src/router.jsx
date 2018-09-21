import React from 'react';
import {Switch} from 'react-router-dom';
import SubScreen from './views/SubScreen/SubScreen';
import Login from './views/Login/Login';

import CustomRoute from './routes/CustomRoute';


module.exports = (
                <Switch>
                    <CustomRoute
                        exact
                        path="/"
                        component={SubScreen}
                    />
                    <CustomRoute
                        exact
                        path="/login"
                        component={Login}
                    />
                </Switch>
);
