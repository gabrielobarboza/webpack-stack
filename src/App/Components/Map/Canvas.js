import React, { Component } from 'react';

import cookies from 'react-cookies';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fabric } from "fabric";
import async from 'async';
import PF from 'pathfinding';
import $ from "cash-dom"

import { Grid } from 'App/Modules/Grid';
import { Colors } from 'App/Modules/Colors';
import { mapBinds } from 'App/Modules/Canvas';

import { setMap } from 'App/Reducers/Map/mapActions';

console.log(cookies)

class Canvas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            load: 0,
            width: 0,
            height: 0,
            scale: 1,
            borders: Colors.yellow,
            ways: Colors.green,
            lanes: Colors.transparent,
            paths: Colors.black,
            mapPath: null,
            wallsPaths : [],
            nodeSize: 5,
            lines : []
        }

        this.renderCanvasMap = this.renderCanvasMap.bind(this)
        this.setWalkableGrid = this.setWalkableGrid.bind(this)
    }

    setWalkableGrid() {
        let grid = Grid.setWalkable(this, true)        
        // console.log(grid)
        this.setState({ grid : grid }, () => {
            this.props.setMap('GRID', grid)
        })
        
        return
    }

    renderCanvasMap () {        
        this.props.map.canvas.setDimensions({
            width: this.state.width,
            height: this.state.height
        })        

        this.setState({
            ...this.setState,
            scale : window.innerHeight*0.95/this.props.map.canvas.height
        }, () => {

            $(this.props.map.canvas.lowerCanvasEl).offsetParent().css({
                transform: `scale(${this.state.scale}, ${this.state.scale})`,
                opacity: 1
            })
            this.props.map.canvas.renderAll()
        })
    }

    blinkColor(obj){
        const startColor = obj.target.fill;

        obj.target.set('animating', true)
        fabric.util.animateColor(startColor, obj.color, obj.duration || 100 , {
            onChange: color => {    
                obj.target.set(obj.prop, color);
                this.props.map.canvas.renderAll();
            },
            onComplete: () => {
                fabric.util.animateColor( obj.color, startColor, obj.duration || 100 , {
                    onChange: color => {    
                        obj.target.set(obj.prop, color);
                        this.props.map.canvas.renderAll();                        
                    },
                    onComplete: () => obj.target.set('animating', false)                    
                })        
            }
        })
    }

    componentDidMount() {
        const that = this;
        
        let canvas = new fabric.Canvas('canvas_map', {
            height: this.state.width,
            width: this.state.width,
            enableRetinaScaling: true,
            opacity: 0
        })
        this.setState({canvas}, () => {
            this.props.setMap('CANVAS', canvas)
        })

        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.objectCaching = true;

        fabric.loadSVGFromURL('./assets/svg/FULL_MAP_SMALL.svg', (svgPaths, options) => {
            let wallsPaths = []
            
            async.map(svgPaths, (path, cb) => {
                // console.log(path)

                that.setState({
                    ...that.state,
                    width : path.width > that.state.width ? path.width : that.state.width,
                    height : path.height > that.state.height ? path.height : that.state.height
                })
                
                path.set({
                    selectable: false,
                    hoverCursor: 'default',
                    perPixelTargetFind: true,
                    left: path.left,
                    top: path.top,
                    stroke: path.id ? this.state.borders : '',
                    strokeWidth: 1,
                    opacity: 1,
                    fill: path.id ?  this.state.lanes :  this.state.paths,
                    animating: false
                })
                
                if(path.id) {
                    path.on('mousedown', ev => mapBinds(that, ev))
                    that.setState({ mapPath: path}, () => that.props.setMap('PATH', path))
                } else {
                    wallsPaths.push(path)
                }

                this.props.map.canvas.add(path)

                cb()
            }, () => {
                that.setState({ wallsPaths }, () => {
                    that.props.setMap('FINDER', new PF.AStarFinder({
                        allowDiagonal: true,
                        dontCrossCorners: true,
                        heuristic: PF.Heuristic.octile
                    }));
                    that.setWalkableGrid()
                    that.renderCanvasMap()

                    // this.props.map.canvas.on("mouse:down", ev => {
                    //     if(!ev.target) console.log(ev, 'click')
                    // })
                    // console.log("render:", canvas, walls)
                })
            })
        })    

        window.addEventListener("resize", this.renderCanvasMap);
    }

    render() {
        return <canvas id="canvas_map" /> ;
    }
}


const StateToProps = state => ({ ...state })
const DispatchToProps = dispatch => 
    bindActionCreators({ setMap }, dispatch)
export default connect(StateToProps, DispatchToProps)(Canvas)
