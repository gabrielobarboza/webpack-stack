import screenReducer from './Screen/screenReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    screen : screenReducer,
})

export default rootReducer