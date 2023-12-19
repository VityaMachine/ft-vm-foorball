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

interface ITeamNamesData {
	longName: {
		ua: string
		en: string
	}
	shortName: {
		ua: string
		en: string
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

	homeTeamNameOriginal: string
	homeTeamNameData: ITeamNamesData | null
	homeTeamId: number
	homeTeamLogo: string
	homeTeamGoalsHT: number | null
	homeTeamGoalsFT: number | null
	homeTeamResult: 'W' | 'D' | 'L' | null | undefined

	awayTeamNameOriginal: string
	awayTeamNameData: ITeamNamesData | null
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
	comment: {
		ua: string
		en: string
	}
}

type CorretionItemTypeUnd = {
	// field: 'games' | 'win' | 'draw' | 'lose' | 'goalsFor' | 'goalsAgainst' | 'goalsDiff' | 'points',
	field?: string | undefined
	value?: number | undefined
	comment?: {
		ua: string
		en: string
	}
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
	fixtureId: number
	isHomeGame: boolean
	opponentId: number
	opponentTeamNameOriginal: string
  opponentTeamNameData: ITeamNamesData | undefined | null
	opponentTeamLogo: string
	referee: string
	result: 'W' | 'D' | 'L' | null | undefined
	round: string
	stadiumCity: string
	stadiumId: number
	stadiumName: string
	status: 'FT' | 'NS' | 'CANC'
}

interface ITeamCalculatedResults {
	games: number
	draw: number
	goalsAgainst: number
	goalsDiff: number
	goalsFor: number
	lose: number
	points: number
	win: number
}

interface ITeamResultsFromFixtures {
	teamId: number | undefined
	teamNameOriginal: string | undefined
  teamNameData: ITeamNamesData | undefined | null
	teamLogo: string | undefined
	leaguePosition: number
	leagueId: number | undefined
	prev5: ITeamFixturesConverted[]
	next5: ITeamFixturesConverted[]
	fixtures: ITeamFixturesConverted[]
	results: ITeamCalculatedResults
	corrections: null | CorretionItemTypeUnd[]
}

interface ISortingResultsData {
	teamId: number
	position: number
	teamName: string
	games: number
	win: number
	draw: number
	lose: number
	goalsFor: number
	goalsAgainst: number
	goalsDiff: number
	points: number
	next5: any[]
	prev5: any[]
}
