import React from 'react';
import {connect} from 'react-redux';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import '../../styles/style.css';
import '../../styles/bootstrap.css';

class Login extends React.Component {


    render() {
        return (
            <div className={"loginWrapper"}>
            <Form className={"loginForm"}>
                <FormGroup>
                    <Label for="exampleEmail">Login</Label>
                    <Input type="text" name="email" id="exampleEmail" placeholder="login" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password" />
                </FormGroup>
                <Button color="success">Submit</Button>
            </Form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);