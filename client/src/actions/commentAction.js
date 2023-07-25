import * as CommentApi from '../services/comment-service'

export const addComment = (data) => async (dispatch) => {
    dispatch({ type: 'ADD_COMMENT_START' })
    try {
        const newComment = await CommentApi.addComment(data)
        dispatch({ type: 'ADD_COMMENT_SUCCESS', data: newComment.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'ADD_COMMENT_FAILED' })
    }
}
