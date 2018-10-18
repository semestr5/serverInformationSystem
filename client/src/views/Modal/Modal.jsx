import React from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/actions';


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
            id:'',
        };

        this.handleChange = this.handleChange.bind(this);
        this.getPhoto = this.getPhoto.bind(this);

    }

    componentDidMount(){
    const {editingItemID=0, mas} = this.props;
    if(editingItemID){
       mas.forEach((el)=>{
           if(el.id==editingItemID){
              const {name,year,description,imgurl} = el;
              this.setState({name,year,description,imgUrl:imgurl,id:editingItemID})
           }
       })
    }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }


    setImg(event){
        console.log("event.target.value",event.target.value)
       // this.setState({[event.target.name]: event.target.value});
    }


    getPhoto(e){
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.readAsDataURL(file);

        reader.onloadend =()=> {
            this.setState({
             imgUrl: reader.result,
           });
         }
        
    }



    editFunc(evt){
        evt.preventDefault();
        this.props.edit();
// changeData
        if(!this.state.id){
            this.props.sentData(this.state)
        }else{
            this.props.changeData(this.state)

        }  

        // }else{
        //
        // }

    }
    skipEdit(evt){
        evt.preventDefault();

    }

    render() {
        // const {edit}=this.props;
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
                        <Input type="file" name="file" id="exampleFile"  onChange={this.getPhoto}/>
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <Button onClick={this.editFunc.bind(this)}>Submit</Button>
                    <Button onClick={this.props.edit} className={"skipBtn"}>Skip</Button>
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
        sentData:(data) => dispatch(actions.sentData(data)),
        changeData:(data) => dispatch(actions.changeData(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);