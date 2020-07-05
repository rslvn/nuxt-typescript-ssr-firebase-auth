import {
  collection,
  CollectionField,
  FirebaseQueryOperator,
  Image,
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
} from '~/service/firebase/firestore/firestore-service'

export const saveUser = async (user: User): Promise<User> => {
  return await saveModel(collection.USER, user)
}

export const getUser = async (id: string): Promise<User> => {
  return getModelById(collection.USER, id)
}

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  return getModelByField(collection.USER, CollectionField.USER.username, username)
}

export const getUsersByUsername = async (
  username: string
): Promise<User[]> => {
  return getModelsByField(collection.USER, CollectionField.USER.username, username)
}

export const getUsersByUsernameAndPage = async (
  username: string,
  page: number,
  limit: number
): Promise<PagingResponse<SearchData>> => {

  let userPagingResponse =
    await getModelsByFieldAndPaging(collection.USER, CollectionField.USER.username, username, page, limit) as PagingResponse<User>

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
  const users = await getModelsByWhereClausesAndOrderBy(collection.USER, orderByName, whereClause) as User[]
  const filteredUsers = users.filter(user => userIncludes(user, queryLower))

  return toSearchDataPagingResponse(filteredUsers, page, limit)
};

export const userIncludes = (user: User, query: string) => {
  if (!query) {
    return true
  }
  return user.username?.toLowerCase().includes(query)
    || user.name?.toLowerCase().includes(query)
    || user.surname?.toLowerCase().includes(query)
}

export const toSearchDataPagingResponse = (filteredUsers: User[], page: number, limit: number): PagingResponse<SearchData> => {
  const total = filteredUsers.length
  const totalPages = Math.ceil(total / limit)
  const limitedUsers = filteredUsers.splice((page * limit - limit), limit);

  return {
    total,
    totalPages,
    data: limitedUsers.map(toSearchData)
  }
}

const toSearchData = (user: User): SearchData => {
  return {
    name: user.name as string,
    username: user.username as string,
    profilePhoto: user.profilePhoto as Image,
    coverPhoto: user.coverPhoto as Image,
    privacy: user.privacy as PrivacyType,
  }
}
