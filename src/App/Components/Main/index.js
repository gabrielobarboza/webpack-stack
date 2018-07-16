import React, { Component } from 'react';
class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screen: {
                landscape: window.innerWidth >= window.innerHeight,
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentWillMount() {        
        window.addEventListener("resize", this.updateDimensions, false);        
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions, false);
    }

    updateDimensions () {
        const screen = {
            landscape: window.innerWidth >= window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.setState({
            ...state,
            screen
        })
        this.forceUpdate()
    }
    
    render() {
        return (
            <div id="Main">
                <div className="wrapper">
                    <div className="overlay"></div>
                </div>
            </div>
        )
    }
}

export default Main

