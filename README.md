# Spot the fire (Nasa Space Project)

## Siging Arduino sample

`PUT` request forwarded to /api/arduino/

```javascript
{
  'id': #generated automatically,
  'location': {
    'long': Numerical Value,
    'lat' : Numerical Value
  }
}
```

## Backend APIs

#### Google Place Search | Places API

The following example shows a Find Place request for "Mongolian Grill", using the locationbias parameter to prefer results within 2000 meters of the specified coordinates:

```javascript
const API_KEY = '';
const LNG = 47.6918452;
const LAT = -122.2226413;
const CIRCLE = 2000;
const PLACE = 'fire station';

const URL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${PLACE}&inputtype=textquery&fields=photos,formatted_address,name&locationbias=circle:${CIRCLE}@${LNG},${LAT}&key=${API_KEY}`;
```

#### Google Place Details | Places API
