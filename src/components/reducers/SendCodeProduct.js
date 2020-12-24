const initialState = null

export default (state = initialState, { type, codeProduct }) => {
    switch (type) {

    case "SEND_CODE_PRODUCT":
        return state = codeProduct

    default:
        return state
    }
}
