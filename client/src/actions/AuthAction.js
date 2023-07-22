import * as AuthService from '../services/auth-service'

export const logIn = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' })
    try {
        const { data } = await AuthService.logIn(formData)
        dispatch({ type: 'AUTH_SUCCESS', data: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'AUTH_FAIL', data: error.response.data })
    }
}

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' })
    try {
        const { data } = await AuthService.signUp(formData)
        dispatch({ type: 'AUTH_SUCCESS', data: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'AUTH_FAIL', data: error.response })
    }
}
