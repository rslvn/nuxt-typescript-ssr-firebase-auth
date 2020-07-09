import tr from 'vee-validate/dist/locale/tr.json'

const messages = {
  validation: {
    ...tr.messages,
    username: '{field} zaten alinmis'
  },

  common: {
    field: {
      id: 'Kimlik',
      username: 'Kullanici Adi',
      usernamePlaceholder: 'kullanici adi giriniz',
      name: 'Ad',
      namePlaceholder: 'adinizi giriniz',
      surname: 'Soyad',
      surnamePlaceholder: 'Soyadinizi giriniz',
      email: 'Email',
      emailPlaceholder: 'E-posta adresinizi giriniz',
      biography: 'Biyografi',
      biographyPlaceholder: 'Biyografinizi giriniz',
      phone: 'Telefon',
      photo: 'Foto',
      password: 'Parola',
      passwordPlaceholder: 'Parolanizi giriniz',
      confirmPassword: 'Parola Tekrar',
      confirmPasswordPlaceholder: 'Parolanizi tekrar giriniz',
      rememberMe: 'Beni Hatirla',
      profilePhoto: 'Profil fotografi',
      coverPhoto: 'Kapak fotografi',
      privacy: 'Gizlilik',
      search: 'Ara',
      searchPlaceholder: 'ornegin: rslvn'
    },
    cancel: 'Iptal',
    save: 'Kaydet',
    delete: 'Sil',
    back: 'Geri',
    settings: 'Ayarlar',
    search: 'Ara',
    follow: 'Takip Et',
    unfollow: 'Takip Etme'
  },

  topNavbar: {
    home: 'Anasayfa',
    lightbox: 'Isik Kutusu',
    crop: 'Gorsel Kesme',
    images: 'Kare Gorsel',
    profile: 'Hesap',
    profileDynamic: 'Hesap (Dinamik)',
    register: 'Kayit Ol',
    login: 'Giris Yap',
    logout: 'Cikis Yap',
    search: {
      footer: 'Baska sonuc yok',
      detailedSearch: 'Detayli arama'
    }
  },

  profile: {
    card: {
      info: {
        verifyButton: 'E-posta Dogrula',
        updatePasswordButton: 'Parolayi guncelle',
        mailVerified: 'E-posta dogrulandi',
        mailNotVerified: 'E-posta dogrulanmadi'
      }
    },
    follow: {
      followers: 'takipci',
      following: 'takipte'
    }
  },

  page: {
    home: {
      title: 'Anasayfaya hosgeldiniz',
      goToSource: ' Github uzerinde kaynak koda ulas'
    },
    lightbox: {
      title: 'Lightbox ile Responsive Masonry',
      subtitle: 'Ornek fotograflar',
      description: 'Nuxt ve typescript ile hazirlanmis, lightbox icin ornek bir sayfadir'
    },
    crop: {
      title: 'Crop',
      description: 'Nuxt ve typescript ile hazirlanmis, cropperjs kutuphanesi ile resim kirpma islemleri icin ornek bir sayfadir'
    },
    images: {
      title: 'Kare Gorseller',
      description: 'Nuxt ve typescript ile hazirlanmis, kare/yuvarlak arkaplan resimler icin ornek bir sayfadir',
      original: 'Orjinal',
      roundedNoBorder: 'Cercevesiz Yuvarlak',
      squareNoBorder: 'Cercevesiz Kare',
      roundedWithBorder: 'Cerceveli Yuvarlak',
      squareWithBorder: 'Cerceveli Kare'
    },
    register: {
      title: 'Kayit Ol',
      description: 'Nuxt ve typescript ile hazirlanmis, yeni kullanici kaydi olusturan ornek bir sayfadir'
    },
    login: {
      title: 'Giris Yap',
      description: 'Nuxt ve typescript ile hazirlanmis, kayitli kullanicilarin sisteme giris yapmasini saglayan ornek bir sayfadir'
    },
    action: {
      processing: 'Isleniyor... Lutfen bekleyiniz.'
    },
    terms: {
      title: 'Sozlesme'
    },
    privacyAndPolicy: {
      title: 'Gizlilik Ve Prensipler'
    },
    search: {
      title: 'Arama',
      description: 'Nuxt ve typescript ile hazirlanmis, kayitli kullanicilar arasinda arama yapmayi saglayan ornek bir sayfadir',
      noResult: 'Sonuc yok 🥺',
      config: {
        total: 'toplam',
        perPage: 'sayfada'
      }
    },
    footer: {
      copyRight: 'Telif Hakki 2020,'
    },
    notFound: 'Sayfa bulunamadi'
  },

  notification: {
    systemError: 'Sistem su anda musait degil, sonra tekrar deneyiniz',
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
      canNotLoad: 'Profiliniz yuklenemiyor'
    },
    search: {
      notAllowedToSearch: 'Sadece kayitli kullanicilar arama yapabilir. Lutfen giris yapiniz...',
      canNotExecuted: 'Arama yapilamiyor'
    },
    follow: {
      alreadyFollowing: "@{username}'i zaten takip ediyorsunuz",
      alreadyUnfollowing: "@{username}'i zaten takip etmiyorsunuz",
      canNotLoadFollowing: 'Takip bilgisi guncellenemedi'
    }
  },

  form: {
    forgetPassword: {
      title: 'Parolami unuttum',
      submit: 'Mail Gonder'
    },
    loginForm: {
      title: 'Giris Yap',
      submit: 'Giris Yap',
      forgetPassword: 'parolami unuttum',
      noAccount: 'Hesabiniz yok mu? Kayit Ol!'
    },
    social: {
      title: {
        login: 'Sosyal Media ile Login',
        register: 'Sosyal Medya'
      },
      loginWith: '{provider} ile Giris Yap'
    },
    resetPassword: {
      title: 'Parolami yenile',
      submit: 'Parolami Degistir'
    },
    registerForm: {
      title: 'Kayit Ol',
      submit: 'Kayit Ol',
      hasAccount: 'Hesabiniz var mi? Giris Yap!'
    },
    profileUpdate: {
      title: 'Kullanici Bilgilerini Guncelle',
      submit: 'Guncelle'
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
        title: 'Sosyal Medya Giris'
      },
      passwordForm: {
        title: 'Parola Belirleme',
        description: '{email} icin bir parola belirleyiniz',
        submit: 'Parolayi Kaydet'
      }
    },
    submit: {
      link: 'Bagla',
      unlink: 'Baglantiyi kopar'
    },
    tooltip: {
      linkedProvider: '{provider} hesabiniza bagli. Baglantiyi kopar!',
      unlinkedProvider: '{provider} hesabiniza bagli degil. Bagla!'
    },
    dialog: {
      delete: {
        title: "{provider}'i Sil",
        message:
          "Hesabinizdan {provider}'i silmek mi istiyorsunuz?<br>Bu islem geri alinamaz",
        confirm: 'Sil'
      }
    }
  },

  image: {
    crop: {
      preview: 'On Izleme'
    },
    upload: {
      dragAndDropButton: 'Dosya yuklemek icin tikla veya surukle&birak'
    }
  },

  privacy: {
    account: {
      field: 'hesap gizliligi',
      private: {
        title: 'Gizli',
        subtitle: 'Kimse goremez',
        description: 'Kimse size ait her hangi bir bilgiye ulasamaz'
      },
      public: {
        title: 'Herkese Acik',
        subtitle: 'Herkes gorebilir',
        description: 'Giris yapmis kullanicilar, kisisel olmayan bilgileri gorebilir. ornegin isim, kullanici adi ...'
      },
      notSelected: 'Gizliligi belirle'
    },
    followers: {
      field: 'takipci gizliligi',
      private: {
        title: 'Gizli',
        subtitle: 'Takipcilerinizi kimse goremez',
        description: 'Giris yapmis kullanicilar bile takipcilerinizi kimse goremez'
      },
      public: {
        title: 'Herkese Acik',
        subtitle: 'Herkes takipcilerinizi gorebilir',
        description: 'Giris yapmis kullanicilar takipcilerinizi gorebilir'
      },
      notSelected: 'Takipci gizliligini belirle'
    },
    following: {
      field: 'takipte gizliligi',
      private: {
        title: 'Gizli',
        subtitle: 'Kimse takip ettiginiz kullanicilari goremez',
        description: 'Giris yapmis kullanicilar bile takip ettiginiz kullanicilari kimse goremez'
      },
      public: {
        title: 'Herkese Acik',
        subtitle: 'Herkes takip ettiklerinizi gorebilir',
        description: 'Giris yapmis kullanicilar, takip ettiginiz kullanicilari gorebilir'
      },
      notSelected: 'Takipte gizliligi belirle'
    }
  },

  module: {
    profileAboutMe: 'Hakkimda',
    linkedAccounts: 'Bagli Hesaplar',
    profileSettings: 'Ayarlar',
    profileFollowers: 'Takipci',
    profileFollowings: 'Takipte'
  },

  settings: {
    general: 'Genel',
    privacy: 'Gizlilik'
  }
}

export default messages
