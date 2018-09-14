import React from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/actions';



class SubScreen extends React.Component {

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

  render() {
    console.log("login",this.props.login)
  return <div>
    
   <div onClick={::this.handleClick}> changeLogin </div>
   <div style={{height:"100px"}} >ppp</div>
   <div onClick={()=>{console.log(this.props.login)}}> ++++++++ </div>
   <div style={{height:"100px"}} >ppp</div>
   <div style={{height:"100px"}} >ppp</div>
   <div onClick={this.props.changeHistory}> changeHistory</div>
      <div style={{height:"100px"}} >ppp</div>
      <div onClick={::this.getData}> getData</div>

      {this.props.history &&

      <div>{this.props.history.mystr}</div>}

  </div>
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    history: state.history,

      
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