importScripts('https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.11.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey:             'AIzaSyCMagGPLVM2pmaOc0uM6DXIV-FDdSEpxjg',
    projectId:          'tdvremote',
    messagingSenderId:  '498700427739',
    appId:              '1:498700427739:web:fecf2f1441975690b247fe'
});
const messaging = firebase.messaging();