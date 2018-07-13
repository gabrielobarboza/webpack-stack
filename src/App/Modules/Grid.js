import PF from 'pathfinding';
import { mapTracker, getPointer } from 'App/Modules/Canvas';

export const Grid = {
    nodes: [],
    width: 0,
    height: 0,
    matrix: [],
    setWalkable: (canvas, time) => {
        let
        that = canvas,
        grid = null,
        matrix = localStorage.getItem('MATRIX'),
        nodeSize = canvas.state.nodeSize
        
        // console.log(grid)
        if(!matrix) {
            if(time) console.time('SET_GRID')

            grid = new PF.Grid(that.state.width, that.state.height);
                    
            for(let y = 0; y < that.state.height; y++){            
                for(let x = 0; x < that.state.width; x++){                
                    // that.setState({load: y})
                    if(grid.nodes[y][x].walkable) {
                        let walkable = mapTracker({ canvas, x, y })
                        if(!walkable) {
                            
                            for(let r = nodeSize; r > 0; r--) {
                                grid.setWalkableAt(x < (that.state.width - r) ? x+r : x, y < (that.state.height - r) ? y+r : y, walkable);
                                grid.setWalkableAt(x > r ? x-r : x, y > r ? y-r : y, walkable);
                                grid.setWalkableAt(x, y, walkable);
                            }
                        }
                    }
                }    
            }

            if(time) console.timeEnd('SET_GRID')
        } else {
            grid = new PF.Grid(JSON.parse(matrix));
        }
        
        that.setState({ grid }, () => {
            Grid.nodes = grid.nodes
            Grid.width = grid.width
            Grid.height = grid.height
            that.props.setMap('GRID', grid)
            Grid.exportMatrix()
        })
        
        return grid
    },
    exportMatrix: (time) => {
        if(time) console.time('EXPORT_MATRIX')

        let matrix = []

        Grid.nodes.map((y, i) => {
            matrix.push([])
            y.map(x => {
                matrix[i].push(Number(!x.walkable))
            })
        })

        matrix = JSON.stringify(matrix)

        localStorage.setItem("MATRIX", matrix)
        Grid.matrix = matrix
        if(time) console.timeEnd('EXPORT_MATRIX')
        return matrix;
    }
}
