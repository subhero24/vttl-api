import { getTeams } from '../source/index.js';

let result = await getTeams({ club: 'lk052' });

document.body.innerHTML = JSON.stringify(result, null, 4);
