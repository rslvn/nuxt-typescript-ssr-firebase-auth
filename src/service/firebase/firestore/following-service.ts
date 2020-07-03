import { collection, CollectionField, FirebaseQueryOperator, Following, User, WhereClause } from '~/types';
import {
  deleteModel,
  getCountByWhereClauses,
  getModelsByWhereClauses,
  saveModel
} from '~/service/firebase/firestore/firestore-service';


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
  const whereClause: WhereClause = {
    field: CollectionField.FOLLOWING.following,
    operator: FirebaseQueryOperator.EQ,
    value: user.id
  }

  return getCountByWhereClauses(collection.FOLLOWING, whereClause)
}

export const getCountOfFollowing = (user: User) => {
  const whereClause: WhereClause = {
    field: CollectionField.FOLLOWING.follower,
    operator: FirebaseQueryOperator.EQ,
    value: user.id
  }

  return getCountByWhereClauses(collection.FOLLOWING, whereClause)
}
