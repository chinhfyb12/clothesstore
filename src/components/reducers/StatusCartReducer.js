const initialState = true

export default (state = initialState, { type }) => {
    switch (type) {

        case "CHANGE_STATUS_CART":
            return !state

        default:
            return state
        }
}