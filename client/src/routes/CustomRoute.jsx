import React, { Component as ReactComponent } from 'react';
import { Route } from 'react-router';

class CustomRoute extends ReactComponent {
    handleRender = ({ Component }) => (props) => (<Component {...props}/>);
    render() {
        const { component: Component, ...restProps } = this.props;
        return (
            <Route render={this.handleRender({ Component })} {...restProps}/>
        );
    }
}

export default CustomRoute;