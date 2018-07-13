import React, { Component } from 'react';
import Canvas from './Canvas'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setScreen } from 'App/Reducers/Screen/screenActions';

class Main extends Component {
    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentWillMount() {
        window.addEventListener("resize", this.updateDimensions, false);        
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions, false);
    }

    updateDimensions () {
        this.props.setScreen({
            landscape: window.innerWidth >= window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight
        })
        this.forceUpdate()
    }
    
    render() {
        return (
            <div id="Main" hidden={!this.props.screen.landscape}>
                <div className="wrapper">
                    <div className="overlay"></div>
                    <Canvas /> 
                </div>
            </div>
        )
    }
}

const StateToProps = state => ({ ...state })
const DispatchToProps = dispatch => 
    bindActionCreators({ setScreen }, dispatch)
export default connect(StateToProps, DispatchToProps)(Main)

