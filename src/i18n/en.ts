import en from 'vee-validate/dist/locale/en.json'

const messages = {
  validation: en.messages,

  common: {
    field: {
      id: 'Id',
      name: 'Name',
      namePlaceHolder: 'enter your name',
      surname: 'Surname',
      surnamePlaceHolder: 'enter your surname',
      email: 'Email',
      emailPlaceHolder: 'enter your email',
      biography: 'Biography',
      biographyPlaceHolder: 'enter your biography',
      phone: 'Phone',
      photo: 'Photo',
      password: 'Password',
      passwordPlaceHolder: 'Enter password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceHolder: 'Re-enter password',
      rememberMe: 'Remember Me',
    },
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    back: 'Back',
    settings: 'Settings',
  },

  topNavbar: {
    home: 'Home',
    lightbox: 'Lightbox',
    crop: 'Image Crop',
    images: 'Square Images',
    profile: 'Profile',
    register: 'Register',
    login: 'Login',
    logout: 'Logout',
  },

  page: {
    home: {
      title: 'Welcome to Home',
      goToSource: 'Go to source on <b>Github</b>',
    },
    action: {
      processing: 'Processing... Please wait.',
    },
    terms: {
      title: 'Terms',
    },
    privacyAndPolicy: {
      title: 'Privacy And Policy',
    },
    crop: {
      title: 'Crop',
    },
    lightbox: {
      title: 'Responsive Masonry with Lightbox',
      subtitle: 'Sample hotos'
    },
    images: {
      title: 'Square Image',
      original: 'Original',
      roundedNoBorder: 'Borderless Round',
      squareNoBorder: 'Borderless Square',
      roundedWithBorder: 'Round With Border',
      squareWithBorder: 'Square With Border'
    },
    footer: {
      copyRight: '&copy; Copyright 2020, ',
    },
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
    unlinkNotAllowed: 'The last provider <b>{provider}</b> can not be unlinked',
    passwordUpdated: 'Your password updated successfully',
    missingActionCode: 'Action code is missing',
    unknownAction: 'You are not allowed to execute that process',
  },

  form: {
    forgetPassword: {
      title: 'Forget Password',
      submit: 'Send Email',
    },
    loginForm: {
      title: 'Login',
      submit: 'Login',
      forgetPassword: 'forgot my password',
      noAccount: 'No account? SignUp!',
    },
    social: {
      title: {
        login: 'Social Login',
        register: 'Social Register',
      },
      loginWith: 'Login with {provider}',
    },
    resetPassword: {
      title: 'Reset Password',
      submit: 'Change Password',
    },
    registerForm: {
      title: 'Register',
      submit: 'Register',
      hasAccount: 'Already has an account? Login!',
    },
    profileUpdate: {
      title: 'User Update',
      submit: 'Update'
    },
  },

  card: {
    user: {
      title: 'Account Info',
      providers: 'Providers',
      verifyButton: 'Verify Email',
      updatePasswordButton: 'Update Password',
      mailVerified: 'Email is verified',
      mailNotVerified: 'Email is not verified',
    },
    linkedAccounts: {
      title: 'Linked Accounts:',
    },
  },

  provider: {
    label: {
      password: 'Password',
      google: { com: 'Google' },
      twitter: { com: 'Twitter' },
      facebook: { com: 'Facebook' },
    },
    linkPasswordProvider: {
      socialLogin: {
        title: 'Social Login',
      },
      passwordForm: {
        title: 'Set Password',
        description: 'Set a  password for <b>{email}</b>',
        submit: 'Save Password',
      },
    },
    submit: {
      link: 'Link',
      unlink: 'Unlink',
    },
    tooltip: {
      linkedProvider:
        '{provider} provider is linked to your account. Click to unlink!',
      unlinkedProvider:
        '{provider} provider is not linked to your account. Click to link!',
    },
    dialog: {
      delete: {
        title: 'Delete {provider}',
        message:
          'Are you sure you want to <b>delete</b> {provider} from your account?<br>This action cannot be undone.',
        confirm: 'Delete',
      },
    },
  },
  image: {
    crop: {
      preview: 'Preview',
    },
    upload: {
      dragAndDropButton: 'Drop your files here or click to upload',
    },
  },
}

export default messages
