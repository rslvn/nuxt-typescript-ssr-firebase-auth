import tr from 'vee-validate/dist/locale/tr.json'

const messages = {
  validation: {
    ...tr.messages,
    username: '{field} zaten alinmis',
  },

  common: {
    field: {
      id: 'Kimlik',
      username: 'Kullanici Adi',
      usernamePlaceHolder: 'kullanici adi giriniz',
      name: 'Ad',
      namePlaceHolder: 'adinizi giriniz',
      surname: 'Soyad',
      surnamePlaceHolder: 'Soyadinizi giriniz',
      email: 'Email',
      emailPlaceHolder: 'E-posta adresinizi giriniz',
      biography: 'Biyografi',
      biographyPlaceHolder: 'Biyografinizi giriniz',
      phone: 'Telefon',
      photo: 'Foto',
      password: 'Parola',
      passwordPlaceHolder: 'Parolanizi giriniz',
      confirmPassword: 'Parola Tekrar',
      confirmPasswordPlaceHolder: 'Parolanizi tekrar giriniz',
      rememberMe: 'Beni Hatirla',
      profilePhoto: 'Profil fotografi',
      coverPhoto: 'Kapak fotografi',
      privacy: 'Gizlilik',
      search: 'Ara...',
    },
    cancel: 'Iptal',
    save: 'Kaydet',
    delete: 'Sil',
    back: 'Geri',
    settings: 'Ayarlar',
  },

  topNavbar: {
    home: 'Anasayfa',
    lightbox: 'Isik Kutusu',
    crop: 'Gorsel Kesme',
    images: 'Kare Gorsel',
    profile: 'Hesap',
    profileDynamic: 'Hesap (Dinamic)',
    register: 'Kayit Ol',
    login: 'Giris Yap',
    logout: 'Cikis Yap',
  },

  profile: {
    card: {
      info: {
        title: 'Hesap Bilgileri',
        verifyButton: 'E-posta Dogrula',
        updatePasswordButton: 'Parolayi guncelle',
        mailVerified: 'E-posta dogrulandi',
        mailNotVerified: 'E-posta dogrulanmadi',
      },
      linkedAccounts: {
        title: 'Bagli Hesaplar',
      },
    },
  },

  page: {
    home: {
      title: 'Anasayfaya hosgeldiniz',
      goToSource: ' <b>Github</b> uzerinde kaynak koda ulas',
    },
    lightbox: {
      title: 'Lightbox ile Responsive Masonry',
      subtitle: 'Ornek fotograflar',
      description: 'Nuxt ve typascript ile hazirlanmis, lightbox icin ornek bir sayfadir',
    },
    crop: {
      title: 'Crop',
      description: 'Nuxt ve typascript ile hazirlanmis, cropperjs kutuphanesi ile resim kirpma islemleri icin ornek bir sayfadir',
    },
    images: {
      title: 'Kare Gorseller',
      description: 'Nuxt ve typascript ile hazirlanmis, kare/yuvarlak arkaplan resimler icin ornek bir sayfadir',
      original: 'Orjinal',
      roundedNoBorder: 'Cercevesiz Yuvarlak',
      squareNoBorder: 'Cercevesiz Kare',
      roundedWithBorder: 'Cerceveli Yuvarlak',
      squareWithBorder: 'Cerceveli Kare'
    },
    register: {
      title: 'Kayit Ol',
      description: 'Nuxt ve typascript ile hazirlanmis, yeni kullanici kaydi olusturan ornek bir sayfadir',
    },
    login: {
      title: 'Giris Yap',
      description: 'Nuxt ve typascript ile hazirlanmis, kayitli kullanicilarin sisteme giris yapmasini saglayan ornek bir sayfadir',
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
    footer: {
      copyRight: '&copy; Telif Hakki 2020,',
    },
    notFound: 'Sayfa bulunamadi',
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
    profile: {
      updated: 'Profiliniz basari ile guncellendi',
      updateFailed: 'Profiliniz guncellenemedi',
    },
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
  privacy: {
    private: {
      title: 'Gizli',
      subtitle: 'Kimse goremez',
      description: 'Kimse size ait her hangi bir bilgiye ulasamaz',
    },
    public: {
      title: 'Herkese Acik',
      subtitle: 'Herkes gorebilir',
      description: 'Giris yapmis kullanicilar, kisisel olmayan bilgilerinize gorebilir. ornegin isim, kullanici adi, profil ve kapak fotografi',
    },
    notSelected: 'Gizliligi belirle',
  },
}

export default messages
