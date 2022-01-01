# VTTL-API

A javascript library to use the VTTL table tennis API in the browser

```
npm install vttl-api
```

## Basic usage

```javascript
import { provinces, getClubs } from 'vttl-api';

for (const province of provinces) {
  let clubs = await getClubs({ ClubCategory: province.id })
}
```

## Exports

Objects:

-   provinces
-   categories

Functions:

-   getClubs
-   getTeams
-   getMembers
-   getRanking
-   getMatches
-   getSeasons
-   getDivisions
-   getTournaments

These functions are mapped to the official TabT API for which documentation can be found [here](http://api.frenoy.net/group__TabTAPIfunctions.html)
