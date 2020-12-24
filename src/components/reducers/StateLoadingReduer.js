const initialState = false

export default (state = initialState, { type }) => {
    switch (type) {

    case "CHANGE_STATUS_LOADER":
        return !state

    default:
        return state
    }
}
