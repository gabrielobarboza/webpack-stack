import React, { Component } from 'react';
import cookies from 'react-cookies';
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
        // console.log(this.state.screen)
        let timestamp = cookies.load('timestamp');

        if(!timestamp) {
            timestamp = Number(new Date())
            cookies.save('timestamp', timestamp, {path: '/'})
        } 

        console.log(timestamp)
        
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

