import playersReducer from './Players/playersReducer';
import screenReducer from './Screen/screenReducer';
import mapReducer from './Map/mapReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    map: mapReducer,
    screen : screenReducer,
    players: playersReducer
})

export default rootReducer