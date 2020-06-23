import { collection, Image, PagingResponse, SearchData, User } from '~/types'
import {
  getModelByField,
  getModelById,
  getModelsByField,
  getModelsByFieldAndPaging,
  saveModel
} from '~/service/firebase/firestore/firestore-service'

const fieldUsername = 'username';

export const saveUser = async (user: User): Promise<User> => {
  return await saveModel(collection.USER, user)
}

export const getUser = async (id: string): Promise<User> => {
  return getModelById(collection.USER, id)
}

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  return getModelByField(collection.USER, fieldUsername, username)
}

export const getUsersByUsername = async (
  username: string
): Promise<User[]> => {
  return getModelsByField(collection.USER, fieldUsername, username)
}

export const getUsersByUsernameAndPage = async (
  username: string,
  page: number,
  limit: number
): Promise<PagingResponse<SearchData>> => {

  let userPagingResponse = await getModelsByFieldAndPaging(collection.USER, fieldUsername, username, page, limit) as PagingResponse<User>

  return {
    totalPage: userPagingResponse.totalPage,
    data: userPagingResponse.data.map(toSearchData)
  }
}

const toSearchData = (user: User): SearchData => {
  return {
    name: user.name as string,
    username: user.username as string,
    profilePhoto: user.profilePhoto as Image
  }
}
