import { Dispatch } from "vuex";
import { errorToNotificationMessage, sendNotification } from "~/service/notification-service";

const sendErrorNotification = async (dispatch: Dispatch, error: Error) => {
  await sendNotification(dispatch, errorToNotificationMessage(error))
}

export const handleError = async (dispatch: Dispatch, error: Error) => {
  console.error(error)
  await sendErrorNotification(dispatch, error)
}
