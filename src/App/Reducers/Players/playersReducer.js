import async from 'async';

const PLAYERS_INITIAL_STATE = { list: [] }

export default (state = PLAYERS_INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ADD_PLAYER':
            return { ...state, list: state.players.push(action.player)}
        case 'DELETE_PLAYER':
            return { ...state, list: state.players.filter(player => player.id !== action.player.id) }
        case 'UPDATE_PLAYER':
            let { id, ...player } = action.player
            return {
                ...state,
                list: state.list.map(p => {
                    if(p.id === player.id) {
                        for(let prop in player) {
                            p[prop] = player[prop]
                        }
                    }

                    return p
                })
            }
        default:
            return state
    }
}