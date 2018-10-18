import React from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/actions';
import {  Link,
    Redirect,history, withRouter} from 'react-router-dom';

import { Button} from 'reactstrap';

import '../../styles/style.css';
import '../../styles/bootstrap.css';

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goBack:false,
        };
      
    }
    componentDidMount(){
         this.props.generateHTML(this.props.askId);
    }
    goBack=()=>{
        this.setState({goBack:true})
    }

    render() {
        const {template} = this.props
        const {goBack} = this.state
        if (goBack) {
            return <Redirect to='/' />;
          }

        return (
            <div className={"itemWrapper"}>
            <div className={"headerLine"}>
                <Button color="primary" onClick={this.goBack}>GoBack</Button>
            </div>
            <div className={"contentBlock"}>
                <div className={"innerBlock"} dangerouslySetInnerHTML={{__html:template.data}}/>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        template:state.history.template,
        askId:state.history.askId,

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(actions.login(data)),
        generateHTML: (itemId) => dispatch(actions.generateHTML(itemId)),

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);