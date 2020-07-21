import { BaseModel, WhereClause } from 'types-module'
import admin from 'firebase-admin'
import { HandlerConfig } from '../handler-config'

const toBaseModelArray = <T extends BaseModel> (querySnapshot: admin.firestore.QuerySnapshot): T[] => {
  const docs: T[] = []
  querySnapshot.forEach(function (doc) {
    docs.push(doc.data() as T)
  })

  return docs
}

const getQueryByWhereClauses = (
  collection: string,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[]) => {
  const collectionReference = HandlerConfig.getAdmin().firestore().collection(collection)

  let query = collectionReference.where(whereClause.field, whereClause.operator, whereClause.value)
  whereClauses.forEach((wc) => {
    query = query.where(wc.field, wc.operator, wc.value)
  })

  return query
}

export async function getModelById<T extends BaseModel> (collection: string, modelId: string) {
  return await HandlerConfig.getAdmin().firestore()
    .collection(collection)
    .doc(modelId)
    .get()
    .then((document) => {
      return document.data() as T
    })
}

export async function getModelsByWhereClauses<T extends BaseModel> (
  collection: string,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[]
): Promise<T[]> {
  const query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)

  return await query
    .get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export const deleteModel = <T extends BaseModel> (collection: string, model: T) => {
  return HandlerConfig.getAdmin().firestore().collection(collection).doc(model.id as string).delete()
}
