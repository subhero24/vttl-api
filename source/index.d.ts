export function getInfo(options: InfoOptions): Promise<Info>;
export function getClubs(options: ClubsOptions): Promise<Club[]>;
export function getTeams(options: TeamsOptions): Promise<Team[]>;
export function getSystems(options: SystemsOptions): Promise<System[]>;
export function getSeasons(options: SeasonsOptions): Promise<Season[]>;
export function getPlayers(options: PlayersOptions): Promise<Player[]>;
export function getRanking(options: RankingOptions): Promise<Ranking>;
export function getMatches(options: MatchesOptions): Promise<Match[]>;
export function getProvinces(options: ProvincesOptions): Promise<Province[]>;
export function getDivisions(options: DivisionsOptions): Promise<Division[]>;
export function getCategories(options: CategoriesOptions): Promise<Category[]>;
export function getTournaments(options: TournamentsOptions): Promise<Tournament[]>;

export function postData(options: UploadOptions): Promise<Upload>;

type Id = string | number;

type Authentication = {
	imitate: string;
	username: string;
	password: string;
};

interface AuthenticationOptions {
	authentication?: Authentication;
}

interface InfoOptions extends AuthenticationOptions {}

interface ClubsOptions extends AuthenticationOptions {
	club?: Id;
	season?: Id;
	province?: Id;
}

interface TeamsOptions extends AuthenticationOptions {
	club: Id;
	season?: Id;
}

interface SystemsOptions extends AuthenticationOptions {
	id?: Id;
}

interface SeasonsOptions extends AuthenticationOptions {}

interface PlayersOptions extends AuthenticationOptions {
	id: Id;
	club?: Id;
	season?: Id;
	search?: string;
	points?: boolean;
	results?: boolean;
	details?: boolean;
	category?: Id;
	opponents?: boolean;
}

interface RankingOptions extends AuthenticationOptions {
	week?: Id;
	system?: Id;
	division: Id;
}

interface MatchesOptions extends AuthenticationOptions {
	id?: Id;
	name?: string;
	club?: Id;
	team?: string;
	week?: Id;
	level?: number;
	start?: Date;
	finish?: Date;
	season?: Id;
	details?: boolean;
	division?: Id;
	divisions?: 'yes' | 'no' | 'short';
	category?: Id;
}

interface ProvincesOptions extends AuthenticationOptions {}

interface DivisionsOptions extends AuthenticationOptions {
	level?: number;
	season?: Id;
	divisions?: 'yes' | 'no' | 'short';
}

interface CategoriesOptions extends AuthenticationOptions {
	id?: Id;
	type?: Id;
	season?: Id;
	search?: string;
}

interface TournamentsOptions extends AuthenticationOptions {
	id?: Id;
	season?: Id;
	results?: boolean;
	registrations?: boolean;
}

interface UploadOptions extends AuthenticationOptions {
	data: string;
}

type Info = {
	ip: string;
	ticks: number;
	account: boolean;
	language: string;
	database: string;
	timestamp: Date;

	quota: {
		current: number;
		allowed: number;
	};

	versions: {
		api: string;
		php: string;
		database: string;
	};
};

type Club = {
	id: Id;
	name: string;
	venues?: Venue[];
	longname: string;
	province: Province;
};

type Venue = {
	id?: Id;
	name: string;
	town: string;
	phone?: string;
	street: string;
	comment?: string;
	position?: number;
};

type Team = {
	id: Id;
	letter: string;
	category: Id;

	club: {
		id: Id;
		name: string;
	};

	division: {
		id: Id;
		name: string;
		system: Id;
	};
};

type System = {
	id: Id;
	name: string;
	sets: number;
	points: number;
	forced: number;
	singles: number;
	doubles: number;
	substitutes: number;

	matches: {
		type: Id;
		home: number;
		away: number;
		position: number;
		substitute: boolean;
	}[];
};

type Season = {
	id: Id;
	name: string;
	current: boolean;
};

type Player = {
	id: Id;
	club: Id;
	index?: number;
	email?: string;
	phone?: {
		fax?: string;
		home?: string;
		work?: string;
		mobile?: string;
	};
	status?: string;
	gender?: 'M' | 'F';
	points?: {
		value: number;
		method: string;
		timestamp: Date;
	}[];
	results?: {
		date: Date;
		type: 'C' | 'T';
		team: string;
		score: [number, number];
		match: {
			id: string;
			name: string;
		};
		result: 'V' | 'D';
		player: {
			id: Id;
			club: Id;
			ranking: string;
			lastname: string;
			firstname: string;
		};
		rankings: {
			type: string;
			value: string;
		}[];
		category: Id;
		tournament: {
			name: string;
			serie: string;
		};
	}[];
	address?: {
		zip: string;
		town: string;
		line1: string;
		line2: string;
	};
	ranking?: string;
	rankings?: {
		elo?: number;
		points?: number;
		position?: number;
	};
	position?: number;
	category?: Id;
	lastname: string;
	firstname: string;
	birthdate?: Date;
	attestation?: boolean;
	nationality?: string;
	identification?: string;
};

type Ranking = {
	division: {
		id: Id;
		name: string;
	};
	rankings: {
		points: number;
		position: number;
		team: {
			club: Id;
			name: string;
		};
		matches: {
			won: number;
			lost: number;
			draw: number;
			total: number;
			forfeit: number;
		};
		games: {
			won: number;
			lost: number;
		};
		sets: {
			won: number;
			lost: number;
		};
	};
};

type Match = {
	id: Id;
	name: string;
	week: Id;
	weeks: {
		prev: Id;
		next: Id;
	};
	venue: Venue & {
		club: Id;
	};
	category: Id;
	division: {
		id: Id;
		name: string;
	};
	home: MatchTeam;
	away: MatchTeam;
	score: string;
	games: Game[];
	start: string;
	finish: string;
	system: Id;
	locked: boolean;
	referee: Id;
	commissioner: Id;
	comments: Comment[];
	validated?: boolean;
	timestamp?: Date;
};

type MatchTeam = {
	club: Id;
	team: string;
	score: number;
	captain: Id;
	singles: Single[];
	doubles: Double[];
	withdrawn: boolean;
	forfaited: boolean;
};

type Single = {
	player: {
		id: Id;
		lastname: string;
		firstname: string;
	};
	ranking?: string;
	position?: number;
	victories?: number;
	forfeited?: boolean;
};

type Double = {
	team: string;
	position?: number;
	forfeited?: boolean;
};

type Game = {
	position: number;
	home: GameTeam;
	away: GameTeam;
	sets: [number, number][];
};

type GameTeam = {
	sets: number;
	players: GamePlayer[];
	forfeited: boolean;
};

type GamePlayer = {
	id: Id;
	index: number;
};

type Comment = {
	code: string;
	author: Player;
	comment: string;
	timestamp: Date;
};

type Province = {
	id: Id;
	name: string;
};

type Division = {
	id: Id;
	name?: string;
	level: number;
	system: Id;
	category: Id;
};

type Category = {
	id: Id;
	type: Id;
	name: string;
	groups?: Id[];
	filters?: {
		loose: CategoryFilter;
		strict: CategoryFilter;
	};
	abbreviation: string;
};

type CategoryFilter = {
	sex: string;
	min: number;
	max: number;
};

type Tournament = {
	id: Id;
	name: string;
	level: number;
	venue?: Venue;
	start: Date;
	finish?: Date;
	series?: {
		id: Id;
		name: string;
		count?: number;
		results?: {
			players: TournamentPlayer[];
			score: number[];
		}[];
		registrations?: {
			id: Id;
			date: Date;
			club: Club;
			player: TournamentPlayer;
		}[];
	}[];
	deadline?: Date;
	description: string;
};

type TournamentPlayer = {
	id: Id;
	ranking: string;
	lastname: string;
	firstname: string;
};

type Upload = {
	result: boolean;
	errors?: string[];
};
