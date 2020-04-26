export enum FirebaseAuthAction {
  VERIFY_EMAIL = 'verifyEmail',
  RECOVERY_EMAIL = 'recoverEmail',
  RESET_PASSWORD = 'resetPassword'
}

export enum FirebaseAuthActionParams {
  ACTION = 'mode',
  ACTION_CODE = 'oobCode'
}

export interface RegistrationCredentials {
  name: string
  email: string
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface UpdatePasswordCredentials{
  credentials: LoginCredentials
  newPassword: string
}
