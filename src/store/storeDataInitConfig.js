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
    //     "isValidEntry": true
    //   }
    // },
    {
      "nickname": "Old-717",
      "serviceNo": 215003717,
      "entryDate": "11/06/2020",
      "currencyCode": "₹",
      "units": 1220,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 700,
        "meterReading": 1220,
        "billGeneratedDate": "11/06/2020",
        "dueDate": "01/07/2020",
        "billAmount": 560,
        "isValidEntry": true
      }
    },
    {
      "nickname": "Terrace-785",
      "serviceNo": 215003785,
      "entryDate": "11/06/2020",
      "currencyCode": "₹",
      "units": 1080,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 800,
        "meterReading": 1080,
        "billGeneratedDate": "11/06/2020",
        "dueDate": "01/07/2020",
        "billAmount": 1520,
        "isValidEntry": true
      }
    },
    {
      "nickname": "1st floor-1053",
      "serviceNo": 2150031053,
      "entryDate": "11/06/2020",
      "currencyCode": "₹",
      "units": 1780,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 1020,
        "meterReading": 1780,
        "billGeneratedDate": "11/06/2020",
        "dueDate": "01/07/2020",
        "billAmount": 1582,
        "isValidEntry": true
      }
    },
    {
      "nickname": "Home-1054",
      "serviceNo": 2150031054,
      "entryDate": "11/06/2020",
      "currencyCode": "₹",
      "units": 1130,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 670,
        "meterReading": 1130,
        "billGeneratedDate": "11/06/2020",
        "dueDate": "01/07/2020",
        "billAmount": 650,
        "isValidEntry": true
      }
    },
    {
      "nickname": "Near home-1055",
      "serviceNo": 2150031055,
      "entryDate": "11/06/2020",
      "currencyCode": "₹",
      "units": 620,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 510,
        "meterReading": 620,
        "billGeneratedDate": "11/06/2020",
        "dueDate": "01/07/2020",
        "billAmount": 790,
        "isValidEntry": true
      }
    },
    {
      "nickname": "Motor-1056",
      "serviceNo": 2150031056,
      "entryDate": "11/06/2020",
      "currencyCode": "₹",
      "units": 950,
      "rate": 0,
      "pastUpdates": [],
      "billData": {
        "unitsConsumed": 700,
        "meterReading": 950,
        "billGeneratedDate": "11/06/2020",
        "dueDate": "01/07/2020",
        "billAmount": 1205,
        "isValidEntry": true
      }
    }
  ],
  "suggestions": {},
  "config": {
    "dateFormat": "DD/MM/YYYY",
    "amazonPayDateFormat": "DD MMMM YYYY",
    "email": {
      "emailBatchThreshold": 4, //Maximum number of batches to be executed
      "emailsPerBatch": 5,  //No of emails to be processed as a batch
      "emailBatchTimeGap": 6, //Wait time/Time gap between two consecutive batches
      "maxEmailBatchSkip": 10, //Maximum number of skips between batches(on waiting for data)/used to overcome call failures
      "emailVendor": "amazonPay",
      "emailQuery": "from:rpe-reminders@amazon.com"
    },
    "firebase": {
      apiKey: "AIzaSyAqt1B3qFs3pzukFvtr6icqmf2g7zqquxw",
      authDomain: "electricity-tracker-personal.firebaseapp.com",
      databaseURL: "https://electricity-tracker-personal.firebaseio.com",
      projectId: "electricity-tracker-personal",
      storageBucket: "electricity-tracker-personal.appspot.com",
      messagingSenderId: "426946603646",
      appId: "1:426946603646:web:0bec50e2a5da2237a8062f",
      measurementId: "G-6N4L7TBHB8",
      clientId: "426946603646-706sfnnipmiqv8sm9h09ggj14a13ep0q.apps.googleusercontent.com",
      clientSecret: "vYg-FMGdUenIRSkd-N3acfg6",
      scopes: "https://www.googleapis.com/auth/gmail.readonly",
      discoveryDocs : ""
    },
    "url": {
      "getAccessToken": "https://www.googleapis.com/oauth2/v4/token",
      'getEmailIds': "https://www.googleapis.com/gmail/v1/users/{{userId}}/messages?q=%22from%3Arpe-reminders%40amazon.com%22&access_token={{accessToken}}"
    }
  }
}

export default storeData