// actions/notificationActions.js

export const updateNotificationCount = (count) => {
    return {
      type: "UPDATE_NOTIFICATION_COUNT",
      payload: count,
    };
  };
  