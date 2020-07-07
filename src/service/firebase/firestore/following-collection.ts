import {
  collection,
  CollectionField,
  FirebaseQueryOperator,
  Following,
  PagingResponse,
  SearchData,
  User,
  WhereClause
} from '~/types'
import {
  deleteModel,
  getCountByWhereClauses,
  getModelsByWhereClauses,
  saveModel
} from '~/service/firebase/firestore/firestore-service'
import { getUser, toSearchDataPagingResponse, userIncludes } from '~/service/firebase/firestore/user-collection'

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

export const saveFollowing = async (following: Following): Promise<Following> => {
  return await saveModel(collection.FOLLOWING, following) as Following
}

export const deleteFollowing = async (following: Following) => {
  return await deleteModel(collection.FOLLOWING, following)
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

  return followingList.find((fllwng) => fllwng.following === following && fllwng.follower === follower)
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

  const followingList = await getModelsByWhereClauses(collection.FOLLOWING, whereClauseForFollowings) as Following[]

  const users: User[] = [];

  let loadedUser: User | null = null;
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

  const followingList = await getModelsByWhereClauses(collection.FOLLOWING, whereClauseForFollowers) as Following[]

  const users: User[] = [];

  let loadedUser: User | null = null;
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

