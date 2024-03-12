import { exclTournamentsIds } from '@/constants/team.excludeTournamentsIds'

export const teamLeaguesParser = (leaguesData: ITeamLeaguesData[]): ITeamTournamentParams[] => {
	return leaguesData
		.map(item => ({
			tournamentId: item.league.id,
			tournamentName: item.league.name,
			tournamentType: item.league.type,
			tournamentLogo: item.league.logo
		}))
		.filter(item => !exclTournamentsIds.includes(item.tournamentId)) // preSeason friendly tournaments
		.sort((a, b) => a.tournamentId - b.tournamentId)
		.sort((a, b) => {
			if (a.tournamentType > b.tournamentType) {
				return -1
			}
			if (a.tournamentType < b.tournamentType) {
				return 1
			}

			return 0
		})
}
