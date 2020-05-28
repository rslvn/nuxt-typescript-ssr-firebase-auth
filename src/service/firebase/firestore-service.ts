import { firestore } from "~/plugins/fire-init-plugin";
import { BaseCollection, collection, User } from "~/types";

const updateModelDates = (model: BaseCollection) => {
  let date = new Date()
  if (!model.createdAt) {
    model.createdAt = date
  }
  model.updatedAt = date;
};

const set = async (collection: string, model: BaseCollection) => {
  updateModelDates(model);

  let docRef = firestore.collection(collection).doc(model.id);

  return await docRef.set(model, {
      merge: true
    }
  )
    .then(() => {
      // get updated doc
      return docRef.get()
        .then((doc) => {
          return doc.data() as BaseCollection
        }).catch((error) => {
          throw error;
        });

    })
};

const add = async (collection: string, model: BaseCollection) => {
  let docRef = firestore.collection(collection).doc();
  model.id = docRef.id;

  return set(collection, model);
};

export const saveModel = async (collection: string, model: BaseCollection) => {
  return model.id ?
    set(collection, model) :
    add(collection, model)
};

export const getModelById = async (collection: string, id: string): Promise<BaseCollection> => {
  return await firestore.collection(collection).doc(id).get().then((doc) => {
    return doc.data() as BaseCollection
  })
}

export const saveUser = async (user: User): Promise<User> => {
  return await saveModel(collection.USER, user)
};

export const getUser = async (id: string): Promise<User> => {
  return getModelById(collection.USER, id)
};
