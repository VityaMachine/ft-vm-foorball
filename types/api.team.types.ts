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
