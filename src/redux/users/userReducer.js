import userActionTypes from "./userActionType"

const initialState = {
    user: '',
    loading: true
}

const UserReduce = (state = initialState, { type, payload }) => {
    switch (type) {

        case userActionTypes.SET_USER:
            return { ...state, user: payload, loading: false }
        case userActionTypes.CLEAR_USER:
            return { ...state, user: null, loading: false }

        default:
            return state
    }
}
export default UserReduce
