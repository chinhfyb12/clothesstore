const initialState = null;

export default (state = initialState, { type, path }) => {
    switch (type) {

    case "SEND_PATH":
        return state=path

    default:
        return state
    }
}