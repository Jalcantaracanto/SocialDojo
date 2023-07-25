const profileReducer = (state = { profileData: null, loading: false, error: false, profiles: null }, action) => {
    switch (action.type) {
        case 'GET_USER_START':
            return { ...state, loading: true, error: false, profiles: null }
        case 'GET_USER_SUCCESS':
            console.log(state)
            return { ...state, profileData: { ...state.profiles, profiles: action.data }, loading: false, error: false }
        case 'GET_USER_FAIL':
            return { ...state, loading: false, error: true, profiles: null }
        default:
            return state
    }
}
export default profileReducer
