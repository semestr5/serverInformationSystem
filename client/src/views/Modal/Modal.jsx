import React from 'react';
import {connect} from 'react-redux';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'


import '../../styles/style.css';
import '../../styles/bootstrap.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            year:'',
            description:'',
            imgUrl:'',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        console.log("-----------------------------")
    const {editingItemID=0, mas} = this.props;
        console.log("editingItemID from props",editingItemID)
        console.log("mas",this.props.mas)
    if(editingItemID){
       mas.forEach((el)=>{
           if(el.id==editingItemID){
              const {name,year,description} = el;
              this.setState({name,year,description})
           }
       })
    }
    }

    handleChange(event){
        console.log("event",event.target.name);
        this.setState({[event.target.name]: event.target.value});
    }

    editFunc(evt){
        evt.preventDefault();
        this.props.edit();
    }

    render() {
        // const {edit}=this.props;
        console.log(this.state.name)
        return (
            <div className={"modal2"}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Name</Label>
                        <Input type="Name" name="name" id="exampleEmail" placeholder="name" value={this.state.name} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Year</Label>
                        <Input type="Year" name="year" id="examplePassword" placeholder="year" value={this.state.year} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Description</Label>
                        <Input type="textarea" name="description" id="exampleText" value={this.state.description} onChange={this.handleChange}/>
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
        mas:state.history.content,
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