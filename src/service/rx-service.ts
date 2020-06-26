import { Subject } from 'rxjs'
import { Image } from '~/types'

export const coverPhotoObservable = new Subject<Image>()
export const profilePhotoObservable = new Subject<Image>()
export const reauthenticateObservable = new Subject<void>()
export const reloadUserFromDatabase = new Subject<string>()
export const loadMoreSearchResult = new Subject<void>()
