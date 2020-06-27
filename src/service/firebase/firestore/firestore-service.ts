import { auth, firestore } from '~/plugins/fire-init-plugin'
import { BaseModel, PagingResponse, WhereClause } from '~/types'
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;


const toBaseModelArray = (querySnapshot: QuerySnapshot) => {
  let docs: BaseModel[] = [];

  querySnapshot.forEach(function (doc) {
    docs.push(doc.data())
  });

  return docs
}

const updateBaseModel = (model: BaseModel) => {
  let date = new Date()
  if (!model.createdAt) {
    model.createdAt = date
  } else {
    // never overwrite createdAt
    delete model.createdAt
  }
  model.updatedAt = date;

  if (!model.createdBy) {
    model.createdBy = auth.currentUser?.uid
  } else {
    // never overwrite createdBy
    delete model.createdBy
  }
  model.updatedBy = auth.currentUser?.uid
}

const set = async (collection: string, model: BaseModel) => {
  updateBaseModel(model);

  let docRef = firestore.collection(collection).doc(model.id);

  return await docRef.set(model, {
      merge: true
    }
  )
    .then(() => {
      // get updated doc
      return docRef.get()
        .then((doc) => {
          return doc.data() as BaseModel
        }).catch((error) => {
          throw error;
        });

    })
};

const add = async (collection: string, model: BaseModel) => {
  let docRef = firestore.collection(collection).doc();
  model.id = docRef.id;

  return set(collection, model);
};

export const saveModel = async (collection: string, model: BaseModel) => {
  return model.id ?
    set(collection, model) :
    add(collection, model)
};


export const getCount = async (collection: string): Promise<number> => {
  return await firestore.collection(collection)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.size
    })
};

export const getModels = async (collection: string): Promise<BaseModel[]> => {
  return await firestore.collection(collection).get()
    .then((querySnapshot) => toBaseModelArray(querySnapshot))
}

export const searchModelByWhereClauses = async (collection: string,
                                                whereClause: WhereClause,
                                                ...whereClauses: WhereClause[])
  : Promise<BaseModel[]> => {
  const collectionReference = firestore.collection(collection);

  let query = collectionReference.where(whereClause.field, whereClause.operator, whereClause.value)
  whereClauses.forEach(wc => {
    query.where(wc.field, wc.operator, wc.value)
  })

  return await query.get()
    .then((querySnapshot) => toBaseModelArray(querySnapshot))
}

export const getModelById = async (collection: string, id: string): Promise<BaseModel> => {
  return await firestore.collection(collection).doc(id).get().then((doc) => {
    return doc.data() as BaseModel
  })
}

export const getModelByField = async (collection: string, field: string, value: any): Promise<BaseModel | null> => {
  return await firestore.collection(collection).where(field, "==", value).get()
    .then((querySnapshot) => {
      return querySnapshot.size > 0 ? querySnapshot.docs[0].data() : null
    })
};

export const getModelsByField = async (collection: string, field: string, value: any): Promise<BaseModel[]> => {
  return await firestore.collection(collection).where(field, "==", value).get()
    .then((querySnapshot) => toBaseModelArray(querySnapshot))
};

export const getModelsByFieldAndPaging = async (
  collection: string, field: string, value: any, page: number, limit: number
): Promise<PagingResponse<BaseModel>> => {

  return await firestore.collection(collection).get()
    .then((querySnapshot) => {
      let docs: BaseModel[] = [];

      querySnapshot.forEach(function (doc) {
        if (doc.data()[field]?.toLowerCase().includes(value.toLowerCase())) {
          docs.push(doc.data())
        }
      });

      docs.sort((a, b) => {
        // @ts-ignore
        return a[field] > b[field] ? 1 : (b[field] > a[field] ? -1 : 0)
      })

      const total = docs.length
      const totalPages = Math.ceil(total / limit)
      const limitedDocs = docs.splice((page * limit - limit), limit);

      return {
        total,
        totalPages,
        data: limitedDocs
      }
    })
};
