import { Dispatch } from 'vuex'
import { errorToNotificationMessage, sendNotification } from '~/service/notification-service'
import { NotificationMessage } from '~/types';

const sendErrorNotification = async (dispatch: Dispatch, error: Error) => {
  await sendNotification(dispatch, errorToNotificationMessage(error))
}

export const handleError = async (dispatch: Dispatch, error: Error, notificationMessage ?: NotificationMessage) => {
  console.error(error)
  notificationMessage
    ? await sendNotification(dispatch, notificationMessage)
    : await sendErrorNotification(dispatch, error)
}
