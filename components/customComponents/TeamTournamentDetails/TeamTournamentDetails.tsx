import React from 'react'

export default function TeamTournamentDetails({
	tournament,
	teamId,
	season
}: {
	tournament: ITeamTournamentParams
	teamId: number
	season: number
}) {
	console.log(tournament)
    console.log(teamId);
    console.log(season);
    
    

	return <div>TeamTournamentDetails</div>
}
