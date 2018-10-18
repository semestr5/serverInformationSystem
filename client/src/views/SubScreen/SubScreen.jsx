import React from 'react';
import {connect} from 'react-redux';
import {  Link,
    Redirect,history, withRouter} from 'react-router-dom';
import actions from '../../redux/actions';

import Modal from '../Modal/Modal';


import '../../styles/style.css';
import '../../styles/bootstrap.css';

// import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input } from 'reactstrap';



import {Form, FormGroup, Label,FormText } from 'reactstrap';
import {ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SubScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditPopUp:false,
            editingItemID:0,
            adminMode:false,
            delID:0,
            redirToItem:false,
            redirToLogin:false,
        };
        this.switchMode = this.switchMode.bind(this);

        this.editFunc = this.editFunc.bind(this);
    }

    componentDidMount(){
        this.props.getData();
    }

    componentWillReceiveProps(props){
       if(this.state.showEditPopUp){
           document.body.style.overflow = 'hidden';
       }
       if(this.props.isModer && props.tunnelMe){
           this.setState({adminMode:true});
            this.props.clearTunnel();
       }
       if(this.props.isModer && !props.isModer){
        this.setState({
            adminMode: false
        });
       }
    }

    componentDidUpdate(){
        if(this.state.showEditPopUp){
            document.body.style.overflow = 'hidden';
        }
    }

    handleClick(){
    this.props.changeLogin();

    }

    editFunc(){
        // evt.preventDefault();
        this.setState({
            showEditPopUp: false,
            editingItemID:0,
        });
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
        this.props.getData();
            
        }, 1000);
    }

    switchMode(evt) {

        
        evt.stopPropagation();
        const{isModer}=this.props
    if(isModer){
        this.setState({
            adminMode: !this.state.adminMode
        });
    }else{
        this.setState({redirToLogin:true})
    }
       
    }


    showMe(el,evt){
        evt.preventDefault();
        console.log("generateHTML")
        // this.props.generateHTML(el)
        this.props.setAskingId(el)
this.setState({redirToItem:true})

    }
    editBtnClick(el,evt){
        evt.preventDefault();
        console.log("edit")
        evt.stopPropagation();
        this.setState({showEditPopUp: true, editingItemID: el})
    }
    deleteBtnClick(el,evt){
        console.log("del")
        evt.preventDefault();
        evt.stopPropagation();
        this.props.delData(el)
        setTimeout(() => {
            this.props.getData()},1000);
    }

    renderItems(){
        const { mas } = this.props;
        console.log("mas",mas)
        if(mas){
         let list=mas.map((el)=>{
            return(
                <ListGroupItem key={el.id} tag="a" href="#" action onClick={(this.showMe.bind(this, el.id))}>
                    <Card className={"card"}>
                        <CardImg className={"cardImg"} width="100%"
                                 src={`${el.imgurl}`}
                                 alt="Card image cap"/>
                        <CardBody className={"cardBody"}>
                            <CardTitle>{el.name}</CardTitle>
                            <CardSubtitle>{el.year}</CardSubtitle>
                            <CardText className={"cardText"}>{el.description}</CardText>
                            {this.state.adminMode &&
                                <div className={"btnBlock"}>
                                    <Button className={"oneBtn"} color="success"  onClick={(this.editBtnClick.bind(this, el.id))}>EDIT</Button>
                                    <Button className={"oneBtn"} color="danger" onClick={(this.deleteBtnClick.bind(this, el.id))}>DELETE</Button>
                                </div>
                            }
                        </CardBody>
                    </Card>
                </ListGroupItem>
            )
        });
        return list;
    }
    }

    redir(){
        console.log("redir")
      this.setState({redirToLog:true})
    }

  render() {
        const{ editingItemID,redirToItem,redirToLogin }=this.state;
        const{ isModer }=this.props
        if (redirToItem) {
            return <Redirect to='/item' />;
        }
        if (redirToLogin) {
            return <Redirect to='/login' />;
        }

  return (<div className={"main"}>
          {this.state.showEditPopUp &&
          <Modal
              editingItemID={editingItemID}
              edit={this.editFunc}/>
          }
        <div className={"header"}>
          <div className={"headerContent"}>
              <div className={"headerTitle"}>
                  <div className={"title"}>MY AWERSOME COLLECTION</div>
              </div>
              <div className={"headerControls"}>
                  {/*<Input type="email" name="email" id="exampleEmail" placeholder="enter searching year" />*/}
                  {/*<Button className={"search"}  color="primary">SEARCH</Button>*/}
                  {isModer && <Button className={"sort"} color="primary" onClick={this.props.logOff} >Log off</Button>}
                  {this.state.adminMode ?
                      <Button className={"sort"} color="warning" onClick={this.switchMode}>Switch to view</Button>
                      :
                      < Button className={"sort"} color="warning" onClick={this.switchMode}>Switch to Edit</Button>
                  }
                  <Button className={"add"} color="success" onClick={() => {
                      this.setState({showEditPopUp: true})
                }}>ADD</Button>
              </div>
          </div>
        </div>
         <div className={"listBlock"}>
            <ListGroup className={"listGroup"}>
                {this.renderItems()}
            </ListGroup>
           </div>

        </div>
  )
    
  
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    history: state.history,
    mas:state.history.content,
    isModer:state.history.isModer,
    tunnelMe:state.history.tunnelMe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLogin: () => dispatch(actions.changeLogin()),
    changeHistory: () => dispatch(actions.changeHistory()),
    getData: () => dispatch(actions.getData()),
    delData: (delId) => dispatch(actions.delData(delId)),
    generateHTML: (itemId) => dispatch(actions.generateHTML(itemId)),
    setAskingId: (id) => dispatch(actions.setAskingId(id)),
    logOff: () => dispatch(actions.logOff()),
    clearTunnel: () => dispatch(actions.clearTunnel()),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubScreen);

