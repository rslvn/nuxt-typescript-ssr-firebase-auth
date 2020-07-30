import { collection, CollectionField, FirebaseQueryOperator, Following, User, WhereClause } from 'types-module'
import {
  deleteModel,
  getCountByWhereClauses,
  getModelsByWhereClauses,
  saveModel
} from '~/service/firebase/firestore/collection-base-service'
import { getUser, toSearchDataPagingResponse, userIncludes } from '~/service/firebase/firestore/user-collection'
import { PagingResponse, SearchData } from '~/types'

const followingWhereClause = (user: User): WhereClause => {
  return {
    field: CollectionField.FOLLOWING.following,
    operator: FirebaseQueryOperator.EQ,
    value: user.id
  }
}

const followersWhereClause = (user: User): WhereClause => {
  return {
    field: CollectionField.FOLLOWING.follower,
    operator: FirebaseQueryOperator.EQ,
    value: user.id
  }
}

export const saveFollowing = (following: Following): Promise<Following> => {
  return saveModel(collection.FOLLOWING, following)
}

export const deleteFollowing = (following: Following) => {
  return deleteModel(collection.FOLLOWING, following)
}

export const getFollowingByFollowerAndFollowing = async (follower: string, following: string) => {
  const wcFollower: WhereClause = {
    field: CollectionField.FOLLOWING.follower,
    operator: FirebaseQueryOperator.EQ,
    value: follower
  }
  const wcFollowing: WhereClause = {
    field: CollectionField.FOLLOWING.following,
    operator: FirebaseQueryOperator.EQ,
    value: following
  }
  const followingList: Following[] = await getModelsByWhereClauses(collection.FOLLOWING, wcFollower, wcFollowing)

  return followingList.find(fllwng => fllwng.following === following && fllwng.follower === follower)
}

export const getCountOfFollowers = (user: User) => {
  const whereClause = followingWhereClause(user)
  return getCountByWhereClauses(collection.FOLLOWING, whereClause)
}

export const getCountOfFollowing = (user: User) => {
  const whereClause = followersWhereClause(user)
  return getCountByWhereClauses(collection.FOLLOWING, whereClause)
}

export const searchFollowers = async (user: User, query: string, page: number, limit: number): Promise<PagingResponse<SearchData>> => {
  const queryLower = query?.toLocaleString()
  const whereClauseForFollowings = followingWhereClause(user)
  const followingList: Following[] = await getModelsByWhereClauses(collection.FOLLOWING, whereClauseForFollowings)
  const users: User[] = []

  let loadedUser: User|null = null
  for (const following of followingList) {
    loadedUser = await getUser(following.follower)
    if (loadedUser && userIncludes(loadedUser, queryLower)) {
      users.push(loadedUser)
    }
  }

  users.sort((a, b) => {
    // @ts-ignore
    return a.name > b.name ? 1 : (b.name > a.name ? -1 : 0)
  })

  return toSearchDataPagingResponse(users, page, limit)
}

export const searchFollowings = async (user: User, query: string, page: number, limit: number): Promise<PagingResponse<SearchData>> => {
  const queryLower = query?.toLocaleString()
  const whereClauseForFollowers = followersWhereClause(user)

  const followingList: Following[] = await getModelsByWhereClauses(collection.FOLLOWING, whereClauseForFollowers)
  const users: User[] = []

  let loadedUser: User|null = null
  for (const following of followingList) {
    loadedUser = await getUser(following.following)
    if (loadedUser && userIncludes(loadedUser, queryLower)) {
      users.push(loadedUser)
    }
  }

  users.sort((a, b) => {
    // @ts-ignore
    return a.name > b.name ? 1 : (b.name > a.name ? -1 : 0)
  })

  return toSearchDataPagingResponse(users, page, limit)
}
