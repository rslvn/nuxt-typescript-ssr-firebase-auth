import tr from 'vee-validate/dist/locale/tr.json'

const messages = {
  validation: tr.messages,

  common: {
    field: {
      id: 'Kimlik',
      name: 'Ad',
      namePlaceHolder: 'adinizi giriniz',
      surname: 'Soyad',
      surnamePlaceHolder: 'Soyadinizi giriniz',
      email: 'E-Posta',
      emailPlaceHolder: 'E-posta adresinizi giriniz',
      biography: 'Biyografi',
      biographyPlaceHolder: 'Biyografinizi giriniz',
      password: 'Parola',
      passwordPlaceHolder: 'Parolanizi giriniz',
      confirmPassword: 'Parola Tekrar',
      confirmPasswordPlaceHolder: 'Parolanizi tekrar giriniz',
      rememberMe: 'Beni Hatirla',
    },
    cancel: 'Iptal',
    save: 'Kaydet',
    back: 'Geri',
  },

  topNavbar: {
    home: 'Anasayfa',
    profile: 'Hesap',
    register: 'Kayit Ol',
    login: 'Giris Yap',
    logout: 'Cikis Yap',
  },

  page: {
    home: {
      title: 'Anasayfaya hosgeldiniz',
      goToSource: ' <b>Github</b> uzerinde kaynak koda ulas',
    },
    action: {
      processing: 'Isleniyor... Lutfen bekleyiniz.',
    },
    terms: {
      title: 'Sozlesme',
    },
    privacyAndPolicy: {
      title: 'Gizlilik Ve Prensipler',
    },
    crop: {
      title: 'Crop',
    },
    lightbox: {
      title: 'Lightbox ile Responsive Masonry',
      subtitle: 'Ornek fotograflar'
    }, footer: {
      copyRight: '&copy; Telif Hakki 2020,',
    },
  },

  notification: {
    verifyMailSent: 'Dogrulama maili {email} adresine gonderilmistir',
    verifyMailNotSent: 'Dogrulama maili {email} adresine gonderilemiyor',
    mailVerified: 'E-posta dogrulandi!',
    sendPasswordResetEmail: 'Parola sifirlama maili gonderildi',
    passwordResetVerified: 'Parola sifirlama onaylandi!',
    confirmPasswordReset: 'Parola sifirlama onaylandi',
    providerLinked: '<b>{provider}</b> hesaba basari ile baglandi',
    providerUnlinked: '<b>{provider}</b> baglantisi hesaptan koparildi',
    unlinkNotAllowed: 'Son login method <b>{provider}</b> hesaptan koparilamaz',
    passwordUpdated: 'Parolaniz basarili bir sekilde guncellendi.',
    missingActionCode: 'Action kodu yok',
    unknownAction: 'BU aksiyonu yurutmek icin yetkiniz yok',
  },

  form: {
    forgetPassword: {
      title: 'Parolami unuttum',
      submit: 'Mail Gonder',
    },
    loginForm: {
      title: 'Giris Yap',
      submit: 'Giris Yap',
      forgetPassword: 'parolami unuttum',
      noAccount: 'Hesabiniz yok mu? Kayit Ol!',
    },
    social: {
      title: {
        login: 'Sosyal Media ile Login',
        register: 'Sosyal Medya',
      },
      loginWith: '{provider} ile Giris Yap',
    },
    resetPassword: {
      title: 'Parolami yenile',
      submit: 'Parolami Degistir',
    },
    registerForm: {
      title: 'Kayit Ol',
      submit: 'Kayit Ol',
      hasAccount: 'Hesabiniz var mi? Giris Yap!',
    },
    profileUpdate: {
      title: 'Kullanici Bilgilerini Guncelle',
      submit: 'Guncelle'
    },
  },

  card: {
    user: {
      title: 'Hesap Bilgileri',
      biography: 'Biyografi',
      providers: 'Saglayicilar',
      verifyButton: 'E-posta Dogrula',
      updatePasswordButton: 'Parolayi guncelle',
      mailVerified: 'E-posta dogrulandi',
      mailNotVerified: 'E-posta dogrulanmadi',
      settingsButton: 'Ayarlar',
    },
    linkedAccounts: {
      title: 'Bagli Hesaplar:',
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
        title: 'Sosyal Medya Giris',
      },
      passwordForm: {
        title: 'Parola Belirleme',
        description: '<b>{email}</b> icin bir parola belirleyiniz',
        submit: 'Parolayi Kaydet',
      },
    },
    submit: {
      link: 'Bagla',
      unlink: 'Baglantiyi kopar',
    },
    info: {
      displayName: 'Ad:',
      email: 'E-Posta:',
      phoneNumber: 'Telefon Numarasi:',
      photoURL: 'Fotograf:',
      uid: 'Kimlik:',
    },
    tooltip: {
      linkedProvider: '{provider} hesabiniza bagli. Baglantiyi kopar!',
      unlinkedProvider: '{provider} hesabiniza bagli degil. Bagla!',
    },
    dialog: {
      delete: {
        title: "{provider}'i Sil",
        message:
          "Hesabinizdan {provider}'i silmek mi istiyorsunuz?<br>Bu islem geri alinamaz",
        confirm: 'Sil',
      },
    },
  },
  image: {
    crop: {
      preview: 'On Izleme',
    },
    upload: {
      dragAndDropButton: 'Dosya yuklemek icin tikla veya surukle&birak',
    },
  },
}

export default messages
