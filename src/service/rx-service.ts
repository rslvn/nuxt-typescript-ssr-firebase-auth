import { Subject } from 'rxjs'
import { Image, ModuleType } from '~/types'

export const coverPhotoObservable = new Subject<Image>()
export const profilePhotoObservable = new Subject<Image>()
export const reauthenticateObservable = new Subject<void>()
export const reloadUserFromDatabase = new Subject<string>()
export const loadMoreSearchResult = new Subject<void>()
export const showProfileModule = new Subject<ModuleType>()
