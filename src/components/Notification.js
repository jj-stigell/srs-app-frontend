import React from 'react';

const Notification = ({ notification, error }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: error ? 'red' : 'green'
  };

  if (!notification) {
    return null;
  }

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;
