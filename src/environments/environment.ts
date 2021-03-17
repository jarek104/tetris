// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:3000',
  firebase: {
    apiKey: "AIzaSyA7dG7kzrqqx2Wl_L6pWfVwZUMJPcWIQKc",
    authDomain: "ngtetris-53106.firebaseapp.com",
    projectId: "ngtetris-53106",
    storageBucket: "ngtetris-53106.appspot.com",
    messagingSenderId: "375481430720",
    appId: "1:375481430720:web:dd264c7370bc09a1cd3325",
    measurementId: "G-L7TYQHK5JS"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
