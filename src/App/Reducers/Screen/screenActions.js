export const setScreen = (props, value) => {
    return dispatch => {
        dispatch({ type: 'SET_SCREEN', props, value })
    }
}