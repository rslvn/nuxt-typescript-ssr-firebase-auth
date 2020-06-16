import { collection, User } from '~/types'
import { getModelByField, getModelById, saveModel } from '~/service/firebase/firestore/firestore-service'

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
