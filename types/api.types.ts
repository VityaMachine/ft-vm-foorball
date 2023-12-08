interface IApiOptionsCreatorParams {
	id?: string | number
	league?: string | number
	season?: string | number
	team?: string | number
	timezone?: string
}

interface IApiResponse {
	errors: [] | string
	get: string
	paging: {
		current: number
		total: number
	}
	parameters: IApiOptionsCreatorParams
	response: any[]
	results: number
}

interface IMatchesStandingsData {
	played: number
	win: number
	draw: number
	lose: number
	goals: {
		for: number
		against: number
	}
}

interface ILeagueStandings {
	all: IMatchesStandingsData
	away: IMatchesStandingsData
	home: IMatchesStandingsData
	description: string
	form: string
	rank: number
	points: number
	goalsDiff: number
	status: number
	group: string
	team: {
		id: number
		logo: string
		name: string
	}
}

interface IFixtureGoals {
	home: number | null
	away: number | null
}

interface IFixtureTeam {
	id: number
	logo: string
	name: string
	winner: boolean | null
}

interface IFixtureData {
	fixture: {
		date: string
		id: number
		periods: {
			first: number
			second: number
		}
		referee: string
		status: {
			elapsed: number
			long: string
			short: 'NS' | 'FT' | 'CANC'
		}
		timestamp: number
		timezone: string
		venue: {
			city: string
			id: number
			name: string
		}
	}
	goals: IFixtureGoals
	league: {
		country: string
		flag: string
		id: number
		logo: string
		name: string
		round: string
		season: number
	}
	score: {
		extratime: IFixtureGoals
		fulltime: IFixtureGoals
		halftime: IFixtureGoals
		penalty: IFixtureGoals
	}
	teams: {
		home: IFixtureTeam
		away: IFixtureTeam
	}
}

interface IFixtureConvertedData {
	fixtureId: number
	date_text: string
	dateTime: Date | any
	referee: string
	statusLong: string
	statusShort: 'NS' | 'FT' | 'CANC'
	city: string
	stadiumName: string
	stadiumId: number
	round: string
	leagueId: number
	leagueName: string

	homeTeamName: string
	homeTeamId: number
	homeTeamLogo: string
	homeTeamGoalsHT: number | null
	homeTeamGoalsFT: number | null
	homeTeamResult: 'W' | 'D' | 'L' | null | undefined

	awayTeamName: string
	awayTeamId: number
	awayTeamLogo: string
	awayTeamGoalsHT: number | null
	awayTeamGoalsFT: number | null
	awayTeamResult: 'W' | 'D' | 'L' | null | undefined
}

type CorretionItemType = {
	// field: 'games' | 'win' | 'draw' | 'lose' | 'goalsFor' | 'goalsAgainst' | 'goalsDiff' | 'points',
	field: string
	value: number
	comment: string
}

type CorretionItemTypeUnd = {
	// field: 'games' | 'win' | 'draw' | 'lose' | 'goalsFor' | 'goalsAgainst' | 'goalsDiff' | 'points',
	field?: string | undefined
	value?: number | undefined
	comment?: string | undefined
}

interface ICorrectedLeaguesTeamData {
	teamId: number
	leagueId: number
	data: CorretionItemType[]
}


interface ITeamBasicFixtureData {
	finalScore: string | null
	goalsAgainst: number | null
	goalsDiff: number | null
	goalsFor: number | null
	points: number | null
}

interface ITeamFixturesConverted extends ITeamBasicFixtureData {
	date: Date
	// finalScore: string | null
	fixtureId: number
	// goalsAgainst: number | null
	// goalsDiff: number | null
	// goalsFor: number | null
	isHomeGame: boolean
	opponentId: number
	opponentTeamName: string
	// points: number | null
	referee: string
	result: 'W' | 'D' | 'L' | null | undefined
	round: string
	stadiumCity: string
	stadiumId: number
	stadiumName: string
	status: 'FT' | 'NS' | 'CANC'
}

interface ITeamCalculatedResults {
	draw: number
	games: number
	goalsAgainst: number
	goalsDiff: number
	goalsFor: number
	lose: number
	points: number
	win: number
}

interface ITeamResultsFromFixtures {
	teamId: number | undefined
	teamName: string | undefined
	teamLogo: string | undefined
	leaguePosition: number
	leagueId: number | undefined
	fixtures: ITeamFixturesConverted[]
	results: ITeamCalculatedResults
	corrections: null | CorretionItemTypeUnd[]
}
