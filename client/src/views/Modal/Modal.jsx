import React from 'react';
import {connect} from 'react-redux';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'


import '../../styles/style.css';
import '../../styles/bootstrap.css';

class Modal extends React.Component {
    editFunc(evt){
        evt.preventDefault();
        this.props.edit();
    }

    render() {
        // const {edit}=this.props;
        return (
            <div className={"modal2"}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile"/>
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <Button onClick={this.editFunc.bind(this)}>Submit</Button>
                </Form>
            </div>
        )
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
)(Modal);