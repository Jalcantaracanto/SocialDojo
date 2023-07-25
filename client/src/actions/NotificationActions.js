// actions/notificationActions.js

export const addNotification = (message) => {
  return {
    type: 'ADD_NOTIFICATION',
    payload: message,
  };
};

export const updateNotificationCount = (count) => {
  return {
    type: 'UPDATE_NOTIFICATION_COUNT',
    payload: count,
  };
};
