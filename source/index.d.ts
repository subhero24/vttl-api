export let provinces: { id: string; name: string }[];
export let categories: { id: string; description: string }[];

export function getInfo(options: any): any;
export function getClubs(options: any): any;
export function getTeams(options: { Club: string; Season?: number }): any;
export function getSystems(options: any): any;
export function getMembers(options: any): any;
export function getRanking(options: any): any;
export function getMatches(options: any): any;
export function getSeasons(options: any): any;
export function getDivisions(options: any): any;
export function getTournaments(options: any): any;
