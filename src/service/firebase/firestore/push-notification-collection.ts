import {
  collection,
  CollectionField,
  FirebaseQueryOperator,
  OrderBy,
  PushNotification,
  PushNotificationStatus,
  WhereClause
} from '~/types'
import { getModelsByWhereClausesAndOrderBy, saveModel } from '~/service/firebase/firestore/collection-base-service'

export const savePushNotification = async (pushNotification: PushNotification): Promise<PushNotification> => {
  return await saveModel(collection.NOTIFICATION, pushNotification)
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
