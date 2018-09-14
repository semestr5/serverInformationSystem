import React from 'react';
import {Switch} from 'react-router-dom';
import SubScreen from './views/SubScreen/SubScreen';
import SecondScreen from './views/SecondScreen/SecondScreen';

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
                        path="/two"
                        component={SecondScreen}
                    />
                </Switch>
);
