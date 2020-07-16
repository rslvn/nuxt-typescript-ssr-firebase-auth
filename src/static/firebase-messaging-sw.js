// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyB4QbSG8aZAuL6YDuZGvw2ydQQ11w_P72g',
  projectId: 'nuxt-development',
  messagingSenderId: '688028313376',
  appId: '1:688028313376:web:f491460bb65c9e40db9945'
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler((payload) => {
  console.log('firebase-messaging-sw.js setBackgroundMessageHandler', payload)
})
