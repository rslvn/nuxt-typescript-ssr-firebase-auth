import {
  collection,
  CollectionField,
  FirebaseQueryOperator,
  OrderBy,
  PushNotification,
  PushNotificationStatus,
  WhereClause
} from 'common-types'
import {
  getModelsByWhereClauses,
  getModelsByWhereClausesAndLimitAndOrderBy,
  getModelsByWhereClausesAndOrderBy,
  saveModel
} from '~/service/firebase/firestore/collection-base-service'
import { getUser } from '~/service/firebase/firestore/user-collection'
import { PushNotificationEnriched } from '~/types'

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

  return await getModelsByWhereClausesAndLimitAndOrderBy(collection.NOTIFICATION, undefined, limit, orderBy, toWhereClause, statusWhereClause)
}

export const getPushNotifications = async (to: string, limit: number, lastVisible: PushNotification): Promise<PushNotification[]> => {
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
    operator: FirebaseQueryOperator.IN,
    value: [PushNotificationStatus.READ, PushNotificationStatus.NEW]
  }

  return await getModelsByWhereClausesAndLimitAndOrderBy(
    collection.NOTIFICATION,
    lastVisible?.createdAt,
    limit,
    orderBy,
    toWhereClause,
    statusWhereClause
  )
}

export const toPushNotificationEnrichedList = async (pushNotifications: PushNotification[]) => {
  const pushNotificationEnricheds: PushNotificationEnriched[] = []

  for (const pushNotification of pushNotifications) {
    const fromUser = await getUser(pushNotification.from)
    if (fromUser) {
      pushNotificationEnricheds.push({
        pushNotification,
        fromUser
      })
    }
  }
  return pushNotificationEnricheds
}

export const loadLatestNotifications = (to: string, limit: number) => {
  return getNewPushNotifications(to)
    .then(async (pushNotifications) => {
      const pushNotificationEnrichedList: PushNotificationEnriched[] = await toPushNotificationEnrichedList(pushNotifications)

      const readLimit = limit - pushNotificationEnrichedList.length
      if (readLimit > 0) {
        await getReadPushNotifications(to, readLimit)
          .then(async (readPushNotifications) => {
            await toPushNotificationEnrichedList(readPushNotifications).then((readPushNotificationEnrichedList) => {
              readPushNotificationEnrichedList
                .forEach(pushNotificationEnriched => pushNotificationEnrichedList.push(pushNotificationEnriched))
            })
          })
      }
      return pushNotificationEnrichedList
    })
}

export const markPushNotificationAsRead = async (pushNotification: PushNotification) => {
  pushNotification.status = PushNotificationStatus.READ
  return await saveModel(collection.NOTIFICATION, pushNotification)
}

export const markPushNotificationAsDeleted = async (pushNotification: PushNotification) => {
  pushNotification.status = PushNotificationStatus.DELETED
  return await saveModel(collection.NOTIFICATION, pushNotification)
}
