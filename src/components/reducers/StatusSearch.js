const initialState = true

export default (state = initialState, { type }) => {
    switch (type) {

        case "CHANGE_STATUS_SEARCH":
            return !state

        default:
            return state
        }
}