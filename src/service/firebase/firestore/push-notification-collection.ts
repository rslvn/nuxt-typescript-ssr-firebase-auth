import {
  collection,
  CollectionField,
  FirebaseQueryOperator,
  OrderBy,
  PushNotification,
  PushNotificationStatus,
  WhereClause
} from '~/types'
import {
  getModelsByWhereClauses,
  getModelsByWhereClausesAndLimitAndOrderBy,
  getModelsByWhereClausesAndOrderBy,
  saveModel
} from '~/service/firebase/firestore/collection-base-service'

export const savePushNotification = async (pushNotification: PushNotification): Promise<PushNotification> => {
  return await saveModel(collection.NOTIFICATION, pushNotification)
}

export const getAlreadyExistPushNotification = async (pushNotification: PushNotification): Promise<PushNotification[]> => {
  const fromWhereClause: WhereClause = {
    field: CollectionField.NOTIFICATION.from,
    operator: FirebaseQueryOperator.EQ,
    value: pushNotification.from
  }
  const toWhereClause: WhereClause = {
    field: CollectionField.NOTIFICATION.to,
    operator: FirebaseQueryOperator.EQ,
    value: pushNotification.to
  }
  const statusWhereClause: WhereClause = {
    field: CollectionField.NOTIFICATION.status,
    operator: FirebaseQueryOperator.EQ,
    value: PushNotificationStatus.NEW
  }

  return await getModelsByWhereClauses(collection.NOTIFICATION, fromWhereClause, toWhereClause, statusWhereClause)
}

export const getNewPushNotifications = async (to: string): Promise<PushNotification[]> => {
  const orderBy: OrderBy = {
    field: CollectionField.BASE.createdAt,
    direction: 'desc'
  }
  const toWhereClause: WhereClause = {
    field: CollectionField.NOTIFICATION.to,
    operator: FirebaseQueryOperator.EQ,
    value: to
  }
  const statusWhereClause: WhereClause = {
    field: CollectionField.NOTIFICATION.status,
    operator: FirebaseQueryOperator.EQ,
    value: PushNotificationStatus.NEW
  }

  return await getModelsByWhereClausesAndOrderBy(collection.NOTIFICATION, orderBy, toWhereClause, statusWhereClause)
}

export const getReadPushNotifications = async (to: string, limit: number): Promise<PushNotification[]> => {
  const orderBy: OrderBy = {
    field: CollectionField.BASE.createdAt,
    direction: 'desc'
  }
  const toWhereClause: WhereClause = {
    field: CollectionField.NOTIFICATION.to,
    operator: FirebaseQueryOperator.EQ,
    value: to
  }
  const statusWhereClause: WhereClause = {
    field: CollectionField.NOTIFICATION.status,
    operator: FirebaseQueryOperator.EQ,
    value: PushNotificationStatus.READ
  }

  return await getModelsByWhereClausesAndLimitAndOrderBy(collection.NOTIFICATION, limit, orderBy, toWhereClause, statusWhereClause)
}

export const markAsRead = async (pushNotification: PushNotification) => {
  pushNotification.status = PushNotificationStatus.READ
  return await saveModel(collection.NOTIFICATION, pushNotification)
}
