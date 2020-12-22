const initialState = null

export default (state = initialState, { type, initPathname }) => {
    switch (type) {

    case "SEND_INIT_PATHNAME":
        return state = initPathname

    default:
        return state
    }
}