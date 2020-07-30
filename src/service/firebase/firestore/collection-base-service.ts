import firebase from 'firebase'
import { BaseModel, OrderBy, WhereClause } from 'types-module'
import { auth, firestore } from '~/plugins/fire-init-plugin'
import { PagingResponse } from '~/types'

export const toBaseModelArray = <T extends BaseModel> (querySnapshot: firebase.firestore.QuerySnapshot) => {
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
  const collectionReference = firestore.collection(collection)

  let query = collectionReference.where(whereClause.field, whereClause.operator, whereClause.value)
  whereClauses.forEach((wc) => {
    query = query.where(wc.field, wc.operator, wc.value)
  })
  return query
}

const updateBaseModel = <T extends BaseModel> (model: T) => {
  const date = new Date()
  if (!model.createdAt) {
    model.createdAt = date
  } else {
    // never overwrite createdAt
    delete model.createdAt
  }
  model.updatedAt = date

  if (!model.createdBy) {
    model.createdBy = auth.currentUser?.uid
  } else {
    // never overwrite createdBy
    delete model.createdBy
  }
  model.updatedBy = auth.currentUser?.uid
}

const set = <T extends BaseModel> (collection: string, model: T) => {
  updateBaseModel(model)

  const docRef = firestore.collection(collection).doc(model.id)

  return docRef.set(model, {
    merge: true
  })
    .then(() => {
      // get updated doc
      return docRef.get()
        .then((doc) => {
          return doc.data() as T
        }).catch((error) => {
          throw error
        })
    })
}

const add = <T extends BaseModel> (collection: string, model: T) => {
  const docRef = firestore.collection(collection).doc()
  model.id = docRef.id

  return set(collection, model)
}

export const saveModel = <T extends BaseModel> (collection: string, model: T) => {
  return model.id
    ? set(collection, model)
    : add(collection, model)
}

export const deleteModel = (collection: string, model: BaseModel) => {
  return firestore.collection(collection).doc(model.id).delete()
}

export const getCount = (collection: string): Promise<number> => {
  return firestore.collection(collection)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.size
    })
}

export const getCountByWhereClauses = (
  collection: string,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[]): Promise<number> => {
  const query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)

  return query.get()
    .then((querySnapshot) => {
      return querySnapshot.size
    })
}

export const getModelById = (collection: string, id: string): Promise<BaseModel> => {
  return firestore.collection(collection).doc(id).get().then((doc) => {
    return doc.data() as BaseModel
  })
}

export const getModels = <T extends BaseModel> (collection: string): Promise<T[]> => {
  return firestore.collection(collection).get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export const getModelsByWhereClauses = <T extends BaseModel> (
  collection: string,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[]): Promise<T[]> => {
  const query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)

  return query.get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export const getModelsByWhereClausesAndOrderBy = <T extends BaseModel> (
  collection: string,
  orderBy: OrderBy,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[])
  : Promise<T[]> => {
  let query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)
  if (orderBy) {
    query = query.orderBy(orderBy.field, orderBy.direction)
  }

  return query.get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export const getModelsByWhereClausesAndLimitAndOrderBy = <T extends BaseModel> (
  collection: string,
  lastVisible: any,
  limit: number,
  orderBy: OrderBy,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[])
  : Promise<T[]> => {
  let query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)

  if (orderBy) {
    query = query.orderBy(orderBy.field, orderBy.direction)
  }

  if (lastVisible) {
    query = query.startAfter(lastVisible)
  }

  query = query.limit(limit)

  return query.get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export const getModelsByFieldAndPaging = (
  collection: string, field: string, value: any, page: number, limit: number
): Promise<PagingResponse<BaseModel>> => {
  return firestore.collection(collection).get()
    .then((querySnapshot) => {
      const docs: BaseModel[] = []

      querySnapshot.forEach(function (doc) {
        if (doc.data()[field]?.toLowerCase().includes(value.toLowerCase())) {
          docs.push(doc.data())
        }
      })

      docs.sort((a, b) => {
        // @ts-ignore
        return a[field] > b[field] ? 1 : (b[field] > a[field] ? -1 : 0)
      })

      const total = docs.length
      const totalPages = Math.ceil(total / limit)
      const limitedDocs = docs.splice((page * limit - limit), limit)

      return {
        total,
        totalPages,
        data: limitedDocs
      }
    })
}
