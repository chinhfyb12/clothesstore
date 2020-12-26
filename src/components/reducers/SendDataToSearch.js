const initialState = []

export default (state = initialState, { type, productsSearch }) => {
    switch (type) {

    case "SEND_DATA_SEARCH":
        return state = [...productsSearch]

    default:
        return state
    }
}
