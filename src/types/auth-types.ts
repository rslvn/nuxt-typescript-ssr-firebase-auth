export enum FirebaseAuthAction {
  VERIFY_EMAIL = 'verifyEmail',
  RECOVERY_EMAIL = 'recoverEmail',
  RESET_PASSWORD = 'resetPassword'
}

export enum FirebaseAuthActionParams {
  ACTION = 'mode',
  ACTION_CODE = 'oobCode'
}
