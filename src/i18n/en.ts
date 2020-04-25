import en from 'vee-validate/dist/locale/en.json'

const messages = {
  validation: en.messages,

  common: {
    field: {
      name: 'Name',
      namePlaceHolder: 'enter your name',
      email: 'Email',
      emailPlaceHolder: 'enter your email',
      password: 'Password',
      passwordPlaceHolder: 'Enter password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceHolder: 'Re-enter password',
    },
    cancel: 'Cancel'
  },

  topNavbar: {
    home: 'Home',
    profile: 'Profile',
    register: 'Register',
    login: 'Login',
    logout: 'Logout'
  },

  page: {
    home: {
      title: 'Welcome to Home'
    },
    action: {
      processing: 'Processing... Please wait.'
    }
  },

  notification: {
    verifyMailSent: 'Verification mail has been sent to {email}',
    verifyMailNotSent: 'Verification mail can not sent to {email}',
    mailVerified: 'Mail address verified!',
    sendPasswordResetEmail: 'Password reset mail has been sent',
    passwordResetVerified: 'Password reset verified!',
    confirmPasswordReset: 'Password reset confirmed!',
    providerLinked: '<b>{provider}</b> is successfully linked',
    providerUnlinked: '<b>{provider}</b> is successfully unlinked',
    unlinkNotAllowed: 'The last provider <b>{provider}</b> can not be unlinked'
  },

  form: {
    forgetPassword: {
      title: 'Forget Password',
      submit: 'Send Email'
    },
    loginForm: {
      title: 'Login',
      submit: 'Login',
      forgetPassword: 'I forgot my password',
      noAccount: 'No account? SignUp!'
    },
    social: {
      title: {
        login: 'Social Login',
        register: 'Social Register'
      },
      google: 'Login with Google',
      twitter: 'Login with Twitter',
      facebook: 'Login with Facebook',
    },
    resetPassword: {
      title: 'Reset Password',
      submit: 'Change Password'
    },
    registerForm: {
      title: 'Register',
      submit: 'Register',
      hasAccount: 'Already has an account? Login!'
    },
  },

  card: {
    user: {
      title: 'Profile',
      userId: 'Id:',
      name: 'Name:',
      email: 'Email: ',
      providers: 'Providers:',
      verifyButton: 'Verify Email'
    }
  },

  provider: {
    linkPasswordProvider: {
      socialLogin: {
        title: 'Social Login',
      },
      passwordForm:
        {
          title: 'Set Password',
          description: 'Set a  password for <b>{email}</b>',
          submit: 'Save Password'
        }
    },
    tooltip: {
      linkedProvider: '{provider} provider is linked to your account. Click to unlink!',
      unlinkedProvider: '{provider} provider is not linked to your account. Click to link!'
    },
    dialog: {
      delete: {
        title: 'Delete {provider}',
        message: 'Are you sure you want to <b>delete</b> {provider} from your account?<br>This action cannot be undone.',
        confirm: 'Delete'
      }
    }
  }

};

export default messages;
