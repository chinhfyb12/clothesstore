const initialState = []

export default (state = initialState, { type, products }) => {
    switch (type) {

    case "SEND_PRODUCTS_CART":
        return state = products

    default:
        return state
    }
}
