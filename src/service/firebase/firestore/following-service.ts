import { collection, CollectionField, FirebaseQueryOperator, Following, WhereClause } from '~/types';
import { deleteModel, getModelsByWhereClauses, saveModel } from '~/service/firebase/firestore/firestore-service';


export const saveFollowing = async (following: Following): Promise<Following> => {
  return await saveModel(collection.FOLLOWING, following) as Following
}

export const deleteFollowing = async (following: Following) => {
  return await deleteModel(collection.FOLLOWING, following)
}

export const getFollowingByFollowingAndFollower = async (follower: string, following: string) => {
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

  return followingList.length > 0 ? followingList[0] : null
}
