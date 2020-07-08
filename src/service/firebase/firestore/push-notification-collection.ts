import { collection, PushNotification } from '~/types'
import { saveModel } from '~/service/firebase/firestore/collection-base-service'

export const savePushNotification = async (pushNotification: PushNotification): Promise<PushNotification> => {
  return await saveModel(collection.FOLLOWING, pushNotification)
}
