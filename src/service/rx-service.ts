import { Subject } from 'rxjs'
import { Image, ModuleType, PushNotification, UpdatePushNotificationStatus } from '~/types'

export const coverPhotoObservable = new Subject<Image>()
export const profilePhotoObservable = new Subject<Image>()
export const reauthenticateObservable = new Subject<void>()
export const reloadUserFromDatabase = new Subject<string>()
export const loadMoreSearchResult = new Subject<void>()
export const showProfileModule = new Subject<ModuleType>()
export const reloadFollowing = new Subject<void>()
export const sendNotificationObservable = new Subject<PushNotification>()
export const configureFcmObservable = new Subject<void>()
export const loadNotificationObservable = new Subject<void>()
export const updateNotificationStatusObservable = new Subject<UpdatePushNotificationStatus>()
