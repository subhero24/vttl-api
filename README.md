# VTTL-API

A javascript library to use the VTTL table tennis API in the browser

```
npm install vttl-api
```

## Basic usage

```javascript
import { provinces, getClubs } from 'vttl-api'

async function run() {
	for (let provinceId in provinces) {
		let clubs = await getClubs({ clubCategory: provinceId })
	}
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
