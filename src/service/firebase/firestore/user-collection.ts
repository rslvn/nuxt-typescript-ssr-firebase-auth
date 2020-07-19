import {
  collection,
  CollectionField,
  FirebaseQueryOperator,
  OrderBy,
  PrivacyType,
  User,
  WhereClause
} from 'types-module'
import {
  getModelById,
  getModelsByFieldAndPaging,
  getModelsByWhereClauses,
  getModelsByWhereClausesAndOrderBy,
  saveModel
} from '~/service/firebase/firestore/collection-base-service'
import { PagingResponse, SearchData } from '~/types'

export const saveUser = async (user: User): Promise<User> => {
  return await saveModel(collection.USER, user)
}

export const getUser = async (id: string): Promise<User> => {
  return await getModelById(collection.USER, id)
}

export const getUserByUsername = async (
  username: string
): Promise<User|null> => {
  const users = await getUsersByUsername(username)
  return users.length > 0 ? users[0] : null
}

export const getUsersByUsername = async (
  username: string
): Promise<User[]> => {
  const usernameWhereClause: WhereClause = {
    field: CollectionField.USER.username,
    operator: FirebaseQueryOperator.EQ,
    value: username
  }

  return await getModelsByWhereClauses(collection.USER, usernameWhereClause)
}

export const getUsersByUsernameAndPage = async (
  username: string,
  page: number,
  limit: number
): Promise<PagingResponse<SearchData>> => {
  const userPagingResponse =
    await getModelsByFieldAndPaging(collection.USER, CollectionField.USER.username, username, page, limit)

  return {
    total: userPagingResponse.total,
    totalPages: userPagingResponse.totalPages,
    data: userPagingResponse.data.map(toSearchData)
  }
}

export const searchUsers = async (query: string, page: number, limit: number): Promise<PagingResponse<SearchData>> => {
  const queryLower = query?.toLocaleString()
  const whereClause: WhereClause = {
    field: CollectionField.USER.privacy,
    operator: FirebaseQueryOperator.EQ,
    value: PrivacyType.PUBLIC
  }
  const orderByName: OrderBy = {
    field: CollectionField.USER.name,
    direction: 'asc'
  }

  const users = await getModelsByWhereClausesAndOrderBy(collection.USER, orderByName, whereClause)
  const filteredUsers = users.filter(user => userIncludes(user, queryLower))

  return toSearchDataPagingResponse(filteredUsers, page, limit)
}

export const userIncludes = (user: User, query: string) => {
  if (!query) {
    return true
  }
  return user.username?.toLowerCase().includes(query) ||
    user.name?.toLowerCase().includes(query) ||
    user.surname?.toLowerCase().includes(query)
}

export const toSearchDataPagingResponse = (filteredUsers: User[], page: number, limit: number): PagingResponse<SearchData> => {
  const total = filteredUsers.length
  const totalPages = Math.ceil(total / limit)
  const limitedUsers = filteredUsers.splice((page * limit - limit), limit)

  return {
    total,
    totalPages,
    data: limitedUsers.map(toSearchData)
  }
}

const toSearchData = (user: User): SearchData => {
  return {
    name: user.name,
    username: user.username,
    profilePhoto: user.profilePhoto,
    coverPhoto: user.coverPhoto,
    privacy: user.privacy
  }
}
