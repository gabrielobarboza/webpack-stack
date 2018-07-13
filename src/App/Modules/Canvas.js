import PF from 'pathfinding';

import { Colors } from 'App/Modules/Colors';
import { lineSpitter } from 'App/Modules/Lines';

export const getPointer = ( params ) => {
    let { canvas, x, y }  = params
    let map = canvas.props.map.path

    return {
        x : x - map.left,
        y : y - map.top
    }
}

export const mapTracker = params => {
    let { canvas, x, y, obstacles } = params

    let ctx = canvas.props.map.canvas.getContext('2d')
    let mapPath = new Path2D(canvas.props.map.path.d)


    if(obstacles) {
        let lineDots = lineSpitter(canvas.state.lines.slice(-1).pop(), { x , y })
                        
        let obstacles = canvas.state.wallsPaths.filter(wall => {
            let ctxPath = new Path2D(wall.d)
            
            return lineDots.some(p => {
                return ctx.isPointInPath(ctxPath, p.x, p.y)
            })
        })

        return obstacles.length ? obstacles : null
    } else {
        return ctx.isPointInPath(mapPath, x, y)
    }
}

export const mapBinds = (canvas,  ev) => {
        let poly = null;

        let x = Math.round(ev.pointer.x);
        let y = Math.round(ev.pointer.y);
        let { lines } = canvas.state

        if(lines.length) {
                                       
            let obstacles = mapTracker({x, y, canvas, obstacles: true})

            if(obstacles) {

                let last = lines.slice(-1).pop()
                let gridClone = canvas.props.map.grid.clone();
                let newPath = canvas.props.map.finder.findPath(last.x, last.y, x, y, gridClone)
                // console.log("NEW:", newPath)

                newPath= PF.Util.smoothenPath(gridClone, newPath)
                // console.log("SMOOTH:", newPath)
                
                lines = lines.concat(newPath.map(node => ({ x : node[0], y : node[1]})));

            } else {
                lines.push({ x, y })        
            }

            // console.log(lines)

            canvas.setState({ lines }, () => {
                poly = new fabric.Polyline(lines, {
                    width: canvas.props.map.canvas.width,
                    height: canvas.props.map.canvas.height,
                    selectable: false,
                    hoverCursor: 'default',
                    perPixelTargetFind: true,
                    fill: '',
                    stroke: Colors.green,
                    strokeWidth: 2,
                    // strokeDashArray: [nodeSize, nodeSize*2],
                    objectCaching: false
                })

                // console.log(poly)

                canvas.props.map.canvas.add(poly)
                canvas.props.map.canvas.renderAll()
            })
        } else {
            lines.push({ x, y })

            canvas.setState({
                lines
            }, () => {                                
                canvas.props.map.canvas.renderAll()
            })
        } 

}