const setMap = (type, target) => {
    // console.log(type, target)

    type = `SET_${type}`;
    return dispatch => {
        dispatch({type , target})
    }
};

export { setMap }