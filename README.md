# VTTL-API

A javascript library to use the VTTL table tennis API in the browser

```
npm install vttl-api
```

## Basic usage

```javascript
import { getTeams } from 'vttl-api';

let teams = await getTeams({ club: 'lk052' });
```

## Exports

-   getInfo
-   getClubs
-   getTeams
-   getSystems
-   getPlayers
-   getRanking
-   getMatches
-   getSeasons
-   getProvinces
-   getDivisions
-   getCategories
-   getTournaments

-   postData

These functions are mapped to the official TabT API for which documentation can be found [here](http://api.frenoy.net/group__TabTAPIfunctions.html)
