import en from 'vee-validate/dist/locale/en.json'

const messages = {
  validation: {
    ...en.messages,
    username: '{field} is already taken',
  },
  common: {
    field: {
      id: 'Id',
      username: 'Username',
      usernamePlaceHolder: 'enter your username',
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
      profilePhoto: 'profile photo',
      coverPhoto: 'cover photo',
      privacy: 'Privacy',
      search: 'Search...',
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
    profileDynamic: 'Profile Dynamic',
    register: 'Register',
    login: 'Login',
    logout: 'Logout',
    search: {
      footer: 'No more result',
    },
  },

  page: {
    home: {
      title: 'Welcome to Home',
      goToSource: 'Go to source on <b>Github</b>',
    },
    lightbox: {
      title: 'Responsive Masonry with Lightbox',
      subtitle: 'Sample photos',
      description: 'A sample lightbox page in nuxt and typescript with bulma'
    },
    crop: {
      title: 'Crop',
      description: 'A sample cropperjs page in nuxt and typescript with bulma'
    },
    images: {
      title: 'Square Image',
      description: 'A sample square/round background images page in nuxt and typescript',
      original: 'Original',
      roundedNoBorder: 'Borderless Round',
      squareNoBorder: 'Borderless Square',
      roundedWithBorder: 'Round With Border',
      squareWithBorder: 'Square With Border',
    },
    register: {
      title: 'Register',
      description: 'A sample registration page in nuxt and typescript with bulma'
    },
    login: {
      title: 'Login',
      description: 'A sample login page in nuxt and typescript with bulma',
    },
    action: {
      processing: 'Processing... Please wait.',
    },
    terms: {
      title: 'Terms',
      description: 'A sample terms page in nuxt and typescript',
    },
    privacyAndPolicy: {
      title: 'Privacy And Policy',
      description: 'A sample privacy and policy page in nuxt and typescript',
    },
    footer: {
      copyRight: '&copy; Copyright 2020, ',
    },
    notFound: 'Page not found',
  },

  profile: {
    card: {
      info: {
        title: 'Account Info',
        verifyButton: 'Verify Email',
        updatePasswordButton: 'Update Password',
        mailVerified: 'Email is verified',
        mailNotVerified: 'Email is not verified',
      },
      linkedAccounts: {
        title: 'Linked Accounts',
      },
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
    profile: {
      updated: 'Your profile is updated successfully',
      updateFailed: 'Your profile could not be updated',
    },
    search: {
      notAllowedToSearch: 'Just authenticated users are allowed to search. Please login...',
    },
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
      submit: 'Update',
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

  privacy: {
    private: {
      title: 'Private',
      subtitle: 'No one can see',
      description: 'No one can see any data of you',
    },
    public: {
      title: 'Public',
      subtitle: 'Everyone can see',
      description: 'The authenticated users can see your non-sensitive data like name, username, profile and cover photo',
    },
    notSelected: 'Select visibility',
  },
}

export default messages
