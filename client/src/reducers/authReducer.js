const authReducer = (state = { authData: null, loading: false, error: false, updateLoading: false, profiles: null }, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, loading: true, error: false }

        case 'AUTH_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, loading: false, error: false }

        case 'AUTH_FAIL':
            return { ...state, loading: false, error: true }

        case 'UPDATING_START':
            return { ...state, updateLoading: true, error: false }

        case 'UPDATING_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, updateLoading: false, error: false }

        case 'UPDATING_FAIL':
            return { ...state, updateLoading: true, error: true }

        case 'LOGOUT':
            localStorage.clear()
            return { ...state, authData: null, loading: false, error: false, updateLoading: false }

        case 'FOLLOW_USER':
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, followings: [...state.authData.user.followings, action.data] } } }

        case 'UNFOLLOW_USER':
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, followings: [...state.authData.user.followings.filter((personId) => personId !== action.data)] } } }

        // case 'GET_USER_START':
        //     return { ...state, loading: true, error: false, test: null }

        // case 'GET_USER_SUCCESS':
        //     return { ...state, profiles: { ...state.authData, test: action.data }, loading: false, error: false }
        // case 'GET_USER_FAIL':
        //     return { ...state, loading: false, error: true , test: null }

        default:
            return state
    }
}

export default authReducer
