type TableSortOrder = 'asc' | 'desc'

interface LeagLeadersTableHeadCell {
	id: keyof PlayerLeadersTableData
	label: {
		en: string
		ua: string
	}
	labelShort: {
		en: string
		ua: string
	}
	isSortable: boolean
	justifyItems: 'center' | 'space-between' | 'space-around' | 'flex-start',
	width: number,
	noMobile: boolean
}

interface IPlayerStatInfo {
	age: number
	birth: {
		date: string
		place: string
		country: string
	}
	firstname: string
	height: string
	id: number
	injured: boolean
	lastname: string
	name: string
	nationality: string
	photo: string
	weight: string
}

interface IplayerStatData {
	cards: {
		yellow: number
		yellowred: number
		red: number
	}
	dribbles: {
		attempts: number
		success: number
	}
	fouls: {
		drawn: number
		committed: number
	}
	games: {
		appearences: number
		captain: false
		lineups: number
		minutes: number
		number: null
		position: 'Defender' | 'Midfielder' | 'Attacker'
		rating: string
	}
	goals: {
		assists: number
		conceded: number
		saves: null | number
		total: number
	}
	league: {
		country: string
		flag: string
		id: number
		logo: string
		name: string
		season: number
	}
	passes: {
		accuracy: number
		key: number
		total: number
	}
	penalty: {
		commited: null | number
		missed: null | number
		saved: null | number
		scored: null | number
		won: null | number
	}
	shots: {
		on: number
		total: number
	}
	substitutes: {
		bench: number
		in: number
		out: number
	}
	tackles: {
		blocks: number
		interceptions: number
		total: number
	}
	team: {
		id: number
		logo: string
		name: string
	}
}

interface IApiPlayerStatData {
	player: IPlayerStatInfo
	statistics: IplayerStatData[]
}

interface PlayerLeadersTableData {
	id: number
	rank: number
	teamName: string
	teamLogo: string
	teamId: number
	playerName: string
	gamesPlayed: number
	minutesPlayed: number
	goals: number
	penaltiesGoals: number
	assists: number
	passes: number
	foulsCommitted: number
	yellowCards: number
	redCards: number
	yellowRedCards: number
	goalsPerGame: number
	minForGoal: number
	assistPerGame: number
	minForAssist: number
	yellowPerGame: number
	minForYellow: number
	redPerGame: number
	minForRed: number
}

type LeagueLeadersStatsTypes = 'goals' | 'assists' | 'ycards' | 'rcards'

interface ILeagueLeadersData {
	topScorers: PlayerLeadersTableData[] | null
	topAssistants: PlayerLeadersTableData[] | null
	topYellowCards: PlayerLeadersTableData[] | null
	topRedCards: PlayerLeadersTableData[] | null
}

