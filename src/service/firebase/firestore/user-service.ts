import {
  collection,
  CollectionField,
  FirebaseQueryOperator,
  Image,
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
  saveModel,
  getModelsByWhereClauses
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

export const searchUsers = async (value: any, page: number, limit: number): Promise<PagingResponse<SearchData>> => {
  const valueLower = value?.toLocaleString()
  const whereClause: WhereClause = {
    field: CollectionField.USER.privacy,
    operator: FirebaseQueryOperator.EQ,
    value: PrivacyType.PUBLIC
  }
  const users = await getModelsByWhereClauses(collection.USER, whereClause) as User[]
  const filteredUsers = users.filter(user => user.username?.toLowerCase().includes(valueLower)
    || user.name?.toLowerCase().includes(valueLower)
    || user.surname?.toLowerCase().includes(valueLower))

  filteredUsers.sort((a, b) => {
    // @ts-ignore
    return a.name > b.name ? 1 : (b.name > a.name ? -1 : 0)
  })
  const total = filteredUsers.length
  const totalPages = Math.ceil(total / limit)
  const limitedUsers = filteredUsers.splice((page * limit - limit), limit);

  return toSearchDataPagingResponse(total, totalPages, limitedUsers)
};

const toSearchDataPagingResponse = (total: number, totalPages: number, limitedUsers: User[]): PagingResponse<SearchData> => {
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
    coverPhoto: user.coverPhoto as Image
  }
}
