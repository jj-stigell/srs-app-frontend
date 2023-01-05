import 'react-notifications-component/dist/theme.css';
import { Store } from 'react-notifications-component';
import { constants } from './constants';

export const notification = (
  title = '', message = '',
  duration = constants.notification.defaultDuration,
  type = 'error'
) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: 'top-center',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: duration
    }
  });
};
