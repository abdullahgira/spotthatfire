# Spot the fire (Nasa Space Project)

`GET` request to /api/notify/ returns all unnotified alerts
`GET` request to /api/notify/ returns all alerts

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
and firelocation are hardcoded for demonstration purpose.

`PUT` request to /api/notify/${alert id} will set notified to `true`
