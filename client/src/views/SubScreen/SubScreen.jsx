import React from 'react';
import {connect} from 'react-redux';
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
            mas: [1,2,3,4,5,6],
            showEditPopUp:false,
            editingItemID:0,
            adminMode:false,
        };
        this.toggle = this.toggle.bind(this);
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

    }

  handleClick(){
    console.log("handleClick")
    console.log("-",this.props.login)
    this.props.changeLogin();

  }
  getData(){
      console.log("get data")
      this.props.getData();
  }

    test(){
      console.log("test")
        return ()=>{
            return ()=>{
                return {"name":"alex"}
         }
        }
    }
    editFunc(){
        // evt.preventDefault();
        this.setState({
            showEditPopUp: false
        });
        document.body.style.overflow = 'auto';
    }
    toggle() {
        this.setState({
            showEditPopUp: false,
            editingItemID:0,
        });
    }
    switchMode() {
        this.setState({
            adminMode: !this.state.adminMode
        });
    }
    renderItems(){
        const { mas } = this.props;

         let list=mas.map((el)=>{
            return(
                <ListGroupItem key={el.id} tag="a" href="#" action>
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
                                    <Button className={"oneBtn"} color="success" onClick={() => {
                                        this.setState({showEditPopUp: true, editingItemID: el.id})
                                    }}>EDIT</Button>
                                    <Button className={"oneBtn"} color="danger">DELETE</Button>
                                </div>
                            }
                        </CardBody>
                    </Card>
                </ListGroupItem>
            )
        });
        return list;
    }
  render() {
        const{ editingItemID }=this.state;

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

      
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLogin: () => dispatch(actions.changeLogin()),
    changeHistory: () => dispatch(actions.changeHistory()),
      getData: () => dispatch(actions.getData()),


  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubScreen);