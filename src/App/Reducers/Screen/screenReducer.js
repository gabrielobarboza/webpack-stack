import { fabric } from "fabric";

const SCREEN_INITIAL_STATE = { landscape: window.innerWidth >= window.innerHeight, width: window.innerWidth, height: window.innerHeight }

export default (state = SCREEN_INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_SCREEN':
            let { props , value } = action
            if(props instanceof Object && !Array.isArray(props)) {
                for (var i in props) {
                    state[i] = props[i]
                }
            } else if (typeof(props) === 'string') {
                state[props] = value
            }
        
            return state
        default:
            return state
    }
}