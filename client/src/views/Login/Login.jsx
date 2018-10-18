import React from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/actions';


import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import {  Redirect} from 'react-router-dom';

import '../../styles/style.css';
import '../../styles/bootstrap.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login:'',
            password:'',
            goBack:false,

        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }
    componentDidMount(){
        
    }
    componentWillReceiveProps(props){
        if(!this.props.loginErr &&props.loginErr){
            alert("incorrect data");
            this.props.clearLoginFail();
        }
        if(props.tunnelMe){
            this.setState({goBack:true})
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    login(evt){
        const{login,password}=this.state
        evt.preventDefault();
        if(!this.state.login || !this.state.password){
            alert("incorrect data")
        }else{
        this.props.login({login,password});
        }
    }

    goBack=()=>{
        this.setState({goBack:true})
    }   

    render() {
        const{goBack}=this.state

        if (goBack) {
            return <Redirect to='/' />;
          }

        return (
            <div className={"loginWrapper"}>
            <Form className={"loginForm"}>
                <FormGroup>
                    <Label for="exampleEmail">Login</Label>
                    <Input type="text" name="login" id="exampleEmail" autoComplete="off" placeholder="login" value={this.state.login} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                </FormGroup>
                <Button color="success" onClick={this.login}>Submit</Button>
                <Button color="primary" className={"loginBack"} onClick={this.goBack}>Go Back</Button>
            </Form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loginErr:state.history.loginErr,
        tunnelMe:state.history.tunnelMe,

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(actions.login(data)),
        generateHTML: (itemId) => dispatch(actions.generateHTML(itemId)),
        clearLoginFail: () => dispatch(actions.clearLoginFail()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);