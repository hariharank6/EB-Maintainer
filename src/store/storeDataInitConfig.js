const storeData = {
  "services": [
    // {
    //   "nickname": "name-3530",
    //   "serviceNo": 206003530,
    //   "entryDate": "22/04/2020",
    //   "currencyCode": "₹",
    //   "units": 110,
    //   "rate": 0,
    //   "pastUpdates": [],
    //   "billData": {
    //     "unitsConsumed": 87,
    //     "meterReading": 100,
    //     "billGeneratedDate": "19/04/2020",
    //     "dueDate": "9/05/2020",
    //     "billAmount": 0,
    //     "paymentDate": "9/05/2020",
    //     "isValidEntry": true
    //   }
    // },
    // {
    //   "nickname": "name-1691",
    //   "serviceNo": 2070031691,
    //   "entryDate": "27/03/2020",
    //   "currencyCode": "₹",
    //   "units": 13760,
    //   "rate": 0,
    //   "pastUpdates": [],
    //   "billData": {
    //     "unitsConsumed": 400,
    //     "meterReading": 13750,
    //     "billGeneratedDate": "24/03/2020",
    //     "dueDate": "15/04/2020",
    //     "billAmount": 830,
    //     "paymentDate": "14/04/2020",
    //     "isValidEntry": true
    //   }
    // },
    // {
    //   "nickname": "name-1053",
    //   "serviceNo": 2150031053,
    //   "entryDate": "15/04/2020",
    //   "currencyCode": "₹",
    //   "units": 770,
    //   "rate": 0,
    //   "pastUpdates": [],
    //   "billData": {
    //     "unitsConsumed": 550,
    //     "meterReading": 760,
    //     "billGeneratedDate": "12/04/2020",
    //     "dueDate": "02/05/2020",
    //     "billAmount": 2110,
    //     "paymentDate": "02/05/2020",
    //     "isValidEntry": true
    //   }
    // },
    // {
    //   "nickname": "name-1054",
    //   "serviceNo": 2150031054,
    //   "entryDate": "15/04/2020",
    //   "currencyCode": "₹",
    //   "units": 470,
    //   "rate": 0,
    //   "pastUpdates": [],
    //   "billData": {
    //     "unitsConsumed": 330,
    //     "meterReading": 460,
    //     "billGeneratedDate": "12/04/2020",
    //     "dueDate": "02/05/2020",
    //     "billAmount": 620,
    //     "paymentDate": "02/05/2020",
    //     "isValidEntry": true
    //   }
    // },
    {
      "nickname": "name-1055",
      "serviceNo": 2150031055,
      "entryDate": "15/04/2020",
      "currencyCode": "₹",
      "units": 120,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 80,
        "meterReading": 110,
        "billGeneratedDate": "12/04/2020",
        "dueDate": "02/05/2020",
        "billAmount": 0,
        "paymentDate": "02/05/2020",
        "isValidEntry": true
      }
    },
    {
      "nickname": "name-1056",
      "serviceNo": 2150031056,
      "entryDate": "15/04/2020",
      "currencyCode": "₹",
      "units": 260,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 190,
        "meterReading": 250,
        "billGeneratedDate": "12/04/2020",
        "dueDate": "02/05/2020",
        "billAmount": 155,
        "paymentDate": "02/05/2020",
        "isValidEntry": true
      }
    },
    {
      "nickname": "name-717",
      "serviceNo": 215003717,
      "entryDate": "15/04/2020",
      "currencyCode": "₹",
      "units": 530,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 390,
        "meterReading": 520,
        "billGeneratedDate": "12/04/2020",
        "dueDate": "02/05/2020",
        "billAmount": 800,
        "paymentDate": "02/05/2020",
        "isValidEntry": true
      }
    },
    {
      "nickname": "name-785",
      "serviceNo": 215003785,
      "entryDate": "15/04/2020",
      "currencyCode": "₹",
      "units": 290,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 180,
        "meterReading": 280,
        "billGeneratedDate": "12/04/2020",
        "dueDate": "02/05/2020",
        "billAmount": 140,
        "paymentDate": "02/05/2020",
        "isValidEntry": true
      }
    }
  ],
  "suggestions": {},
  "config": {
    "dateFormat": "DD/MM/YYYY",
    "firebase": {
      apiKey: "AIzaSyAaarrq5v54_ux71LtMyu0UQ86pjQZZheY",
      authDomain: "eb-maintainer.firebaseapp.com",
      databaseURL: "https://eb-maintainer.firebaseio.com",
      projectId: "eb-maintainer",
      storageBucket: "eb-maintainer.appspot.com",
      messagingSenderId: "78882283244",
      appId: "1:78882283244:web:32b4c867f51d073b628fc9",
      measurementId: "G-05F4E66EQ1",
      clientId: "78882283244-1i19eaguu2bc96ncc777lmq3d53bd39d.apps.googleusercontent.com",
      clientSecret: "OUAowPrnvQMgamvn3TKDNDDn",
      scopes: "https://www.googleapis.com/auth/gmail.readonly"
    },
    "url": {
      "getAccessToken": "https://www.googleapis.com/oauth2/v4/token",
      'getEmailIds': "https://www.googleapis.com/gmail/v1/users/{{userId}}/messages?q=%22from%3Arpe-reminders%40amazon.com%22&access_token={{accessToken}}"
    }
  }
}

export default storeData