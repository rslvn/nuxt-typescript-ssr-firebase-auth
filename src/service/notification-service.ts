import { NotificationMessage, NotificationType, StoreConfig } from '~/types'
import { NotificationProgrammatic } from 'buefy'
import { Dispatch } from 'vuex'

const hasIcon = true
const position = 'is-top-right'

const toasterConfig = {
  hasIcon,
  queue: false,
  duration: 3000,
}

export const sendNotification = async (
  dispatch: Dispatch,
  notificationMessage: NotificationMessage
) => {
  await dispatch(
    StoreConfig.notification.saveNotificationMessage,
    notificationMessage,
    {
      root: true,
    }
  )
}

export const sendSuccessNotification = async (
  dispatch: Dispatch,
  message: any
) => {
  await sendNotification(dispatch, getSuccessNotificationMessage(message))
}

export const sendDangerNotification = async (
  dispatch: Dispatch,
  message: any
) => {
  await sendNotification(dispatch, getDangerNotificationMessage(message))
}

export const sendWarningNotification = async (
  dispatch: Dispatch,
  message: any
) => {
  await sendNotification(dispatch, getWarningNotificationMessage(message))
}

export const sendInfoNotification = async (
  dispatch: Dispatch,
  message: any
) => {
  await sendNotification(dispatch, getInfoNotificationMessage(message))
}

export const errorToNotificationMessage = (
  error: Error
): NotificationMessage => {
  return {
    type: NotificationType.DANGER,
    message: error.message,
    hasIcon,
  }
}

export const getSuccessNotificationMessage = (
  message: any
): NotificationMessage => {
  return {
    type: NotificationType.SUCCESS,
    message,
    hasIcon,
  }
}

export const getDangerNotificationMessage = (
  message: any
): NotificationMessage => {
  return {
    type: NotificationType.DANGER,
    message,
    hasIcon,
  }
}

export const getWarningNotificationMessage = (
  message: any
): NotificationMessage => {
  return {
    type: NotificationType.WARNING,
    message,
    hasIcon,
  }
}

export const getInfoNotificationMessage = (
  message: any
): NotificationMessage => {
  return {
    type: NotificationType.INFO,
    message,
    hasIcon,
  }
}

export const showErrorToaster = (message: any): void => {
  NotificationProgrammatic.open({
    type: 'is-danger',
    message,
    position,
    ...toasterConfig,
  })
}

export const showInfoToaster = (message: any): void => {
  NotificationProgrammatic.open({
    type: 'is-info',
    message,
    position,
    ...toasterConfig,
  })
}

export const showWarningToaster = (message: any): void => {
  NotificationProgrammatic.open({
    type: 'is-warning',
    message,
    position,
    ...toasterConfig,
  })
}

export const showSuccessToaster = (message: any): void => {
  NotificationProgrammatic.open({
    type: 'is-success',
    message,
    position,
    ...toasterConfig,
  })
}
