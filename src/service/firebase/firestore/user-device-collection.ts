import { collection, CollectionField, FirebaseQueryOperator, UserDevice, WhereClause } from 'types-module'
import { deleteModel, getModelsByWhereClauses, saveModel } from '~/service/firebase/firestore/collection-base-service'

export const saveUserDevice = async (userDevice: UserDevice): Promise<UserDevice> => {
  return await deleteUserDeviceByToken(userDevice.deviceToken)
    .then(async () => {
      return await saveModel(collection.USER_DEVICE, userDevice)
    })
}

export const deleteUserDeviceByToken = (deviceToken: string) => {
  return getUserDevicesByDeviceToken(deviceToken)
    .then((userDevices) => {
      console.log(`found ${userDevices.length} userDevices for the token`)
      if (userDevices.length === 0) {
        return
      }
      userDevices.forEach(async (userDevice) => {
        await deleteModel(collection.USER_DEVICE, userDevice)
      })
    })
}

export const getUserDevicesByDeviceToken = (deviceToken: string) => {
  const deviceTokenWhereClause: WhereClause = {
    field: CollectionField.USER_DEVICE.deviceToken,
    operator: FirebaseQueryOperator.EQ,
    value: deviceToken
  }
  return getModelsByWhereClauses(collection.USER_DEVICE, deviceTokenWhereClause)
}
