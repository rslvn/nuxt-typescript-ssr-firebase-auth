import { Subject } from 'rxjs'
import { Image, PushNotification } from 'types-module'
import { ModuleType, UpdatePushNotificationStatus } from '~/types'

// Configuration
export const configureFcmObservable = new Subject<void>()
export const configureAxiosObservable = new Subject<void>()

// Profile
export const coverPhotoObservable = new Subject<Image>()
export const profilePhotoObservable = new Subject<Image>()
export const reauthenticateObservable = new Subject<void>()
export const reloadUserFromDatabase = new Subject<string>()
export const loadMoreSearchResult = new Subject<void>()
export const showProfileModule = new Subject<ModuleType>()
export const reloadFollowing = new Subject<void>()

// Notification
export const sendNotificationObservable = new Subject<PushNotification>()
export const loadNotificationObservable = new Subject<void>()
export const updateNotificationStatusObservable = new Subject<UpdatePushNotificationStatus>()
