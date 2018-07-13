import React, { Component } from 'react';
import { Icons } from 'App/services/LoadAssets'

class SVG extends Component {
  constructor(props){
    super(props)

    
    const icon = this.props.src ? Icons.filter(icon => icon.path.indexOf(this.props.src)!=-1)[0] : null

    this.state = {
      class: icon ? "icon_"+icon.name : null,
      svg: icon ? icon.component : null
    }
  }

  render() {
    const
    Svg = this.state.svg || null,
    ClassName = this.props.className ? ' '+this.props.className : ''

    if(!Svg) console.error('ERROR: ' + this.props.src) 

    return Svg ? <Svg id={this.props.id} width={this.props.width} height={this.props.height} className={this.state.class + ClassName}/> : null;
  }
}

export default SVG;
