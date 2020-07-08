import en from 'vee-validate/dist/locale/en.json'

const messages = {
  validation: {
    ...en.messages,
    username: '{field} is already taken'
  },
  common: {
    field: {
      id: 'id',
      username: 'username',
      usernamePlaceholder: 'enter your username',
      name: 'name',
      namePlaceholder: 'enter your name',
      surname: 'surname',
      surnamePlaceholder: 'enter your surname',
      email: 'email',
      emailPlaceholder: 'enter your email',
      biography: 'biography',
      biographyPlaceholder: 'enter your biography',
      phone: 'phone',
      photo: 'photo',
      password: 'password',
      passwordPlaceholder: 'Enter password',
      confirmPassword: 'confirm Password',
      confirmPasswordPlaceholder: 'Re-enter password',
      rememberMe: 'remember Me',
      profilePhoto: 'profile photo',
      coverPhoto: 'cover photo',
      privacy: 'privacy',
      search: 'search',
      searchPlaceholder: 'e.g. rslvn'
    },
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    back: 'Back',
    settings: 'Settings',
    search: 'Search',
    follow: 'Follow',
    unfollow: 'Unfollow'
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
      detailedSearch: 'Detailed Search'
    }
  },

  profile: {
    card: {
      info: {
        verifyButton: 'Verify Email',
        updatePasswordButton: 'Update Password',
        mailVerified: 'Email is verified',
        mailNotVerified: 'Email is not verified'
      }
    },
    follow: {
      followers: 'followers',
      following: 'following'
    }
  },

  page: {
    home: {
      title: 'Welcome to Home',
      goToSource: 'Go to source on <b>Github</b>'
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
      squareWithBorder: 'Square With Border'
    },
    register: {
      title: 'Register',
      description: 'A sample registration page in nuxt and typescript with bulma'
    },
    login: {
      title: 'Login',
      description: 'A sample login page in nuxt and typescript with bulma'
    },
    action: {
      processing: 'Processing... Please wait.'
    },
    terms: {
      title: 'Terms',
      description: 'A sample terms page in nuxt and typescript'
    },
    privacyAndPolicy: {
      title: 'Privacy And Policy',
      description: 'A sample privacy and policy page in nuxt and typescript'
    },
    search: {
      title: 'Search',
      description: 'A sample search page in nuxt and typescript',
      noResult: 'No result 🥺',
      config: {
        total: 'total',
        perPage: 'per page'
      }
    },
    footer: {
      copyRight: '&copy; Copyright 2020, '
    },
    notFound: 'Page not found'
  },

  notification: {
    systemError: 'System is not available now, please try again later',
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
      canNotLoad: 'Profile can not load'
    },
    search: {
      notAllowedToSearch: 'Just authenticated users are allowed to search. Please login...',
      canNotExecuted: 'Can not search'
    },
    follow: {
      alreadyFollowing: 'You are already following to @{username}',
      alreadyUnfollowing: 'You are already unfollowing to @{username}',
      canNotLoadFollowing: 'Could not load following info'
    }
  },

  form: {
    forgetPassword: {
      title: 'Forget Password',
      submit: 'Send Email'
    },
    loginForm: {
      title: 'Login',
      submit: 'Login',
      forgetPassword: 'forgot my password',
      noAccount: 'No account? SignUp!'
    },
    social: {
      title: {
        login: 'Social Login',
        register: 'Social Register'
      },
      loginWith: 'Login with {provider}'
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
    profileUpdate: {
      title: 'User Update',
      submit: 'Update'
    }
  },

  provider: {
    label: {
      password: 'Password',
      google: { com: 'Google' },
      twitter: { com: 'Twitter' },
      facebook: { com: 'Facebook' }
    },
    linkPasswordProvider: {
      socialLogin: {
        title: 'Social Login'
      },
      passwordForm: {
        title: 'Set Password',
        description: 'Set a  password for <b>{email}</b>',
        submit: 'Save Password'
      }
    },
    submit: {
      link: 'Link',
      unlink: 'Unlink'
    },
    tooltip: {
      linkedProvider:
        '{provider} provider is linked to your account. Click to unlink!',
      unlinkedProvider:
        '{provider} provider is not linked to your account. Click to link!'
    },
    dialog: {
      delete: {
        title: 'Delete {provider}',
        message:
          'Are you sure you want to <b>delete</b> {provider} from your account?<br>This action cannot be undone.',
        confirm: 'Delete'
      }
    }
  },

  image: {
    crop: {
      preview: 'Preview'
    },
    upload: {
      dragAndDropButton: 'Drop your file here or click to upload'
    }
  },

  privacy: {
    account: {
      field: 'account privacy',
      private: {
        title: 'Private',
        subtitle: 'No one can see',
        description: 'No one can see any data of you'
      },
      public: {
        title: 'Public',
        subtitle: 'Everyone can see',
        description: 'The authenticated users can see your non-sensitive data like name, username, profile and cover photo'
      },
      notSelected: 'Select visibility'
    },
    followers: {
      field: 'followers privacy',
      private: {
        title: 'Private',
        subtitle: 'No one can see your followers',
        description: 'No one can see your followers even if they are authenticated'
      },
      public: {
        title: 'Public',
        subtitle: 'Everyone can see your followers',
        description: 'The authenticated users can see your followers'
      },
      notSelected: 'Select followers visibility'
    },
    following: {
      field: 'following privacy',
      private: {
        title: 'Private',
        subtitle: 'No one can see your following',
        description: 'No one can see your following even if they are authenticated'
      },
      public: {
        title: 'Public',
        subtitle: 'Everyone can see your following',
        description: 'The authenticated users can see your following'
      },
      notSelected: 'Select following visibility'
    }
  },

  module: {
    profileAboutMe: 'About Me',
    linkedAccounts: 'Linked Accounts',
    profileSettings: 'Settings',
    profileFollowers: 'Followers',
    profileFollowings: 'Following'
  },

  settings: {
    general: 'General',
    privacy: 'Privacy'
  }
}

export default messages
