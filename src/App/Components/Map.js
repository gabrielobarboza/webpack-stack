import React, { Component } from 'react';
import { fabric } from "fabric"

import $ from "cash-dom"

import lineSpitter from 'App/modules/LineSpitter';
import Colors from 'App/modules/Colors';
import SVG from 'App/services/InlineSVG';

let canvas;
class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {
            landscape: window.innerWidth >= window.innerHeight,
            width: 0,
            height: 0,
            scale: 1,
            borders: Colors.yellow,
            ways: Colors.green,
            lanes: Colors.transparent,
            paths: Colors.black,
            walls : [],
            lines : []
        }

        this.renderCanvasMap = this.renderCanvasMap.bind(this)
    }

    renderCanvasMap () {
        
        canvas.setDimensions({
            width: this.state.width,
            height: this.state.height
        })
        
        this.setState({
            ...this.setState,
            landscape: window.innerWidth >= window.innerHeight,
            scale : window.innerHeight*0.95/canvas.height
        }, () => {
            $(canvas.lowerCanvasEl).offsetParent().css({
                transform: `scale(${this.state.scale}, ${this.state.scale})`
            })
            canvas.renderAll()
        })
    }

    blinkColor(obj){
        const startColor = obj.target.fill;

        obj.target.set('animating', true)
        fabric.util.animateColor(startColor, obj.color, obj.duration || 100 , {
            onChange: color => {    
                obj.target.set(obj.prop, color);
                canvas.renderAll();
            },
            onComplete: () => {
                fabric.util.animateColor( obj.color, startColor, obj.duration || 100 , {
                    onChange: color => {    
                        obj.target.set(obj.prop, color);
                        canvas.renderAll();                        
                    },
                    onComplete: () => obj.target.set('animating', false)                    
                })        
            }
        })
    }

    componentDidMount() {
        const that = this;
        
        canvas = new fabric.Canvas('canvas_map', {
            height: this.state.width,
            width: this.state.width,
            enableRetinaScaling: true
        })

        // console.log(canvas)

        let ctx = canvas.getContext('2d')

        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.objectCaching = true;

        fabric.loadSVGFromURL('./assets/svg/FULL_MAP.svg', (svgPaths, options) => {
            let walls = []
            
            svgPaths.map((path, i) => {
                
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
                    strokeWidth: 1.5,
                    opacity: 1,
                    fill: path.id ?  this.state.lanes :  this.state.paths,
                    animating: false
                })

                
                if(path.id) {
                    path.on('mousedown', ev => {
                        let poly = null;

                        let x = ev.pointer.x-5;
                        let y = ev.pointer.y-5;
                        let { lines } = this.state

                        if(lines.length) {
                            
                            let lineDots = lineSpitter(lines.slice(-1).pop(), { x , y })
                            
                            let obstacles = this.state.walls.filter(wall => {
                                let ctxPath = new Path2D(wall.d)

                                return lineDots.some(p => {
                                    return ctx.isPointInPath(ctxPath, p.x, p.y)
                                })
                            })

                            if(obstacles.length) {
                                // console.log(obstacles)
                                obstacles.map(o => {
                                    if(o.animating) return 
                                    this.blinkColor({
                                        color: Colors.red,
                                        duration: 100,
                                        prop: 'fill',
                                        target: o
                                    })
                                })
                            } 
                            
                            if(!obstacles.length) {
                                lines.push({ x, y })
        
                                this.setState({
                                    lines
                                } , () => {
                                    let poly = new fabric.Polyline(lines, {
                                        width: canvas.width,
                                        height: canvas.height,
                                        selectable: false,
                                        hoverCursor: 'default',
                                        perPixelTargetFind: true,
                                        fill: '',
                                        stroke: Colors.green,
                                        strokeWidth: 3,
                                        strokeDashArray: [6 ,12],
                                        objectCaching: false
                                    })

                                    // console.log(poly)

                                    canvas.add(poly)
                                    canvas.renderAll()
                                })        
                            }
                        } else {
                            lines.push({ x, y })
        
                            this.setState({
                                lines
                            }, () => {                                
                                canvas.renderAll()
                            })
                        } 
                    })
                } else {
                    walls.push(path)
                }

                canvas.add(path)

                that.renderCanvasMap()
                
            })

            that.setState({ walls }, () => {
                // console.log("render:", canvas, walls)
            })

            canvas.on("mouse:down", ev => {
                if(!ev.target) console.log(ev, 'click')
            })
        })    

        window.addEventListener("resize", this.renderCanvasMap);
    }

    render() {
        return (
            <div id="Map" hidden={!this.state.landscape}>
                <div className="wrapper">
                    <canvas id="canvas_map" ref={canvas => this.canvas = canvas}></canvas> 
                </div>
            </div>
        )
    }
}

export default Map;
