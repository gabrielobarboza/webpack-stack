import { fabric } from "fabric";

const MAP_INITIAL_STATE = { canvas: null, grid: null, path: null }

export default (state = MAP_INITIAL_STATE, data) => {
    switch(data.type) {
        case 'SET_GRID':
            return { ...state, grid: data.target }
        case 'SET_PATH':
            return { ...state, path: data.target }
        case 'SET_CANVAS':
            return { ...state, canvas: data.target }
        case 'SET_FINDER':
            return { ...state, finder: data.target }
        default:
            return state
    }
}