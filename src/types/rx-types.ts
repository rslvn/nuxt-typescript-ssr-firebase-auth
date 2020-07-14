import { PushNotificationStatus } from '~/types/firebase-types';

export interface UpdatePushNotificationStatus {
  id: string,
  status: PushNotificationStatus
}
