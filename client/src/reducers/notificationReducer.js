// reducers/notificationReducer.js

const initialState = {
  notifications: [],
  notificationCount: 0,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'UPDATE_NOTIFICATION_COUNT':
      return {
        ...state,
        notificationCount: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
