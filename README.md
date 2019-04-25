# Spot the fire (Nasa Space Project)
When a user sees a fire, he reports it to the application via the `POST` method, then the neighbor users whore are using the application are notified by that fire alert.

`GET` request to /api/notify returns unnotified alerts

`GET` request to /api/notify/all returns all alerts

### Response Object

```javascript
[
  {
    'id': String,
    'message': String,
    'notified': Boolean,
    'current-location': {
      'long': Number,
      'lat' : Number
    },
    'fire-location': {
      'long': Number,
      'lat' : Number
    }
    'wind': {
      'speed': Number,
      'deg': Number
    }
  }
]
```

`POST` requset to /api/notify/ automatically chooses a message and initiate notified to false, while currentLocation
and firelocation are hardcoded for demonstration purpose, the `POST` request should be made by the person who saw the fire, and wants to notify the neighbor users.

`PUT` request to /api/notify/${alert id} will set notified to `true`
