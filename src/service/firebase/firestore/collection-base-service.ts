import firebase from 'firebase'
import { auth, firestore } from '~/plugins/fire-init-plugin'
import { BaseModel, OrderBy, PagingResponse, WhereClause } from '~/types'

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

const set = async <T extends BaseModel> (collection: string, model: T) => {
  updateBaseModel(model)

  const docRef = firestore.collection(collection).doc(model.id)

  return await docRef.set(model, {
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

const add = async <T extends BaseModel> (collection: string, model: T) => {
  const docRef = firestore.collection(collection).doc()
  model.id = docRef.id

  return await set(collection, model)
}

export const saveModel = async <T extends BaseModel> (collection: string, model: T) => {
  return model.id
    ? await set(collection, model)
    : await add(collection, model)
}

export const deleteModel = async (collection: string, model: BaseModel) => {
  return await firestore.collection(collection).doc(model.id).delete()
}

export const getCount = async (collection: string): Promise<number> => {
  return await firestore.collection(collection)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.size
    })
}

export const getCountByWhereClauses = async (
  collection: string,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[]): Promise<number> => {
  const query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)

  return await query.get()
    .then((querySnapshot) => {
      return querySnapshot.size
    })
}

export const getModels = async <T extends BaseModel> (collection: string): Promise<T[]> => {
  return await firestore.collection(collection).get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export const getModelsByWhereClauses = async <T extends BaseModel> (
  collection: string,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[]): Promise<T[]> => {
  const query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)

  return await query.get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export const getModelsByWhereClausesAndOrderBy = async <T extends BaseModel> (
  collection: string,
  orderBy: OrderBy,
  whereClause: WhereClause,
  ...whereClauses: WhereClause[])
  : Promise<T[]> => {
  let query = getQueryByWhereClauses(collection, whereClause, ...whereClauses)
  if (orderBy) {
    query = query.orderBy(orderBy.field, orderBy.direction)
  }

  return await query.get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export const getModelById = async (collection: string, id: string): Promise<BaseModel> => {
  return await firestore.collection(collection).doc(id).get().then((doc) => {
    return doc.data() as BaseModel
  })
}

export const getModelByField = async (collection: string, field: string, value: any): Promise<BaseModel | null> => {
  return await firestore.collection(collection)
    .where(field, '==', value)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.size > 0 ? querySnapshot.docs[0].data() : null
    })
}

export const getModelsByField = async (collection: string, field: string, value: any): Promise<BaseModel[]> => {
  return await firestore.collection(collection).where(field, '==', value).get()
    .then(querySnapshot => toBaseModelArray(querySnapshot))
}

export const getModelsByFieldAndPaging = async (
  collection: string, field: string, value: any, page: number, limit: number
): Promise<PagingResponse<BaseModel>> => {
  return await firestore.collection(collection).get()
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
