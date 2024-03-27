interface ITeamGeneralData {
	team: {
		code: string
		country: string
		founded: number
		id: number
		logo: string
		name: string
		national: boolean
	}
	venue: {
		address: string
		capacity: number
		city: string
		id: number
		image: string
		name: string
		surface: string
	}
}

interface ITeamLeaguesData {
	country: {
		code: null | string
		flag: null | string
		name: string
	}
	league: {
		id: number
		logo: string
		name: string
		type: string
	}
	seasons: {
		year: number
		start: string
		end: string
		current: boolean
		coverage: {
			fixtures: {
				events: boolean
				lineups: boolean
				statistics_fixtures: boolean
				statistics_players: boolean
			}
			injuries: boolean
			odds: boolean
			players: boolean
			predictions: boolean
			standings: boolean
			top_assists: boolean
			top_cards: boolean
			top_scorers: boolean
		}
	}[]
}

interface ITeamTournamentParams {
	tournamentId: number
	tournamentName: string
	tournamentType: string
	tournamentLogo: string
}

interface IConvertedTeamData {
	teamId: number
	teamNameOriginal: string
	teamNameData: {
		nameSort: {
			ua: string
			en: string
		}
		nameLong: {
			ua: string
			en: string
		}
	} | null
	teamLogo: string
	founded: number
	teamCountry: string
	stadiumId: number
	stadiumName: string
	stadiumCity: string
	stadiumAddress: string
	stadiumCapacity: number
	stadiumImg: string

	teamSeasons: number[]
	tournaments: ITeamTournamentParams[]
}

interface ITeamSquadPlayer {
	age: number
	id: number
	name: string
	number: number
	photo: string
	position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
}

interface ITeamHATStat {
	away: number
	home: number
	total: number
}

interface ITeamPercentageStat {
	total: number | null
	percentage: string | null
}

interface ITeamByMinsStats {
	'0-15': ITeamPercentageStat
	'16-30': ITeamPercentageStat
	'31-45': ITeamPercentageStat
	'46-60': ITeamPercentageStat
	'61-75': ITeamPercentageStat
	'76-90': ITeamPercentageStat
	'91-105': ITeamPercentageStat
	'106-120': ITeamPercentageStat
}

interface ITeamGoalsStat {
	average: {
		home: string
		away: string
		total: string
	}
	minute: ITeamByMinsStats
	total: ITeamHATStat
}

interface ITeamFixturesGeneralData {
	played: ITeamHATStat
	wins: ITeamHATStat
	draws: ITeamHATStat
	loses: ITeamHATStat
}

interface ITeamGeneralStat {
	biggest: {
		goals: {
			against: {
				away: number
				home: number
			}
			for: {
				away: number
				home: number
			}
		}
		loses: {
			away: string
			home: string
		}
		wins: {
			away: string
			home: string
		}
		streak: {
			wins: number
			draws: number
			loses: number
		}
	}
	cards: {
		red: ITeamByMinsStats
		yellow: ITeamByMinsStats
	}
	clean_sheet: ITeamHATStat
	failed_to_score: ITeamHATStat
	fixtures: ITeamFixturesGeneralData
	form: string
	goals: {
		for: ITeamGoalsStat
		against: ITeamGoalsStat
	}
	league: {
		country: string
		flag: string
		id: number
		logo: string
		name: string
		season: number
	}
	lineups: {
		formation: string
		played: number
	}[]
	penalty: {
		total: number
		missed: ITeamPercentageStat
		scored: ITeamPercentageStat
	}
	team: {
		id: number
		logo: string
		name: string
	}
}
