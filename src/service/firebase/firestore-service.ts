import { auth, firestore } from "~/plugins/fire-init-plugin";
import { BaseModel, collection, User } from "~/types";

const updateBaseModel = (model: BaseModel) => {
  let date = new Date()
  if (!model.createdAt) {
    model.createdAt = date
  }
  model.updatedAt = date;

  if (!model.createdBy) {
    model.createdBy = auth.currentUser?.uid
  }
  model.updatedBy = auth.currentUser?.uid
};

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

export const getModelById = async (collection: string, id: string): Promise<BaseModel> => {
  return await firestore.collection(collection).doc(id).get().then((doc) => {
    return doc.data() as BaseModel
  })
}

export const saveUser = async (user: User): Promise<User> => {
  return await saveModel(collection.USER, user)
};

export const getUser = async (id: string): Promise<User> => {
  return getModelById(collection.USER, id)
};
