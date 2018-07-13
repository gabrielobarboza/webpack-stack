export const managePlayers = (type, player) => {
    if(!type) return
    return dispatch => {
        dispatch({type: `${type}_PLAYER`, player})
    }
}