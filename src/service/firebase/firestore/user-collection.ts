import {
  collection,
  CollectionField,
  FirebaseQueryOperator,
  orderByName,
  PagingResponse,
  PrivacyType,
  SearchData,
  User,
  WhereClause
} from '~/types'
import {
  getModelByField,
  getModelById,
  getModelsByField,
  getModelsByFieldAndPaging,
  getModelsByWhereClausesAndOrderBy,
  saveModel
} from '~/service/firebase/firestore/collection-base-service'

export const saveUser = async (user: User): Promise<User> => {
  return await saveModel(collection.USER, user)
}

export const getUser = async (id: string): Promise<User> => {
  return await getModelById(collection.USER, id)
}

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  return await getModelByField(collection.USER, CollectionField.USER.username, username)
}

export const getUsersByUsername = async (
  username: string
): Promise<User[]> => {
  return await getModelsByField(collection.USER, CollectionField.USER.username, username)
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
