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

// ***response types***
// ? teams league standings

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
