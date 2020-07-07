import { collection, PushNotification } from '~/types';
import { saveModel } from '~/service/firebase/firestore/firestore-service';

export const savePushNotification = async (pushNotification: PushNotification): Promise<PushNotification> => {
  return await saveModel(collection.FOLLOWING, pushNotification) as PushNotification
}
