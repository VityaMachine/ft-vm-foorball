'use client'
import { useState, useEffect, useContext } from 'react'

import { FixturesApiContext } from '@/context/Fixtures.api.context'

import { teamsResultsFromFixtures } from '@/helpers/leagueStandingsHelpers'

import leaagueCorrections from '@/constants/leagues.corrections'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'
import LeagueStandingsTable from '@/components/customComponents/LeagueStandingsTable/LeagueStandingsTable'

export default function TournamentTable() {
	const { state } = useContext(FixturesApiContext)
	const { data, status } = state

	const [leagueData, setLeagueData] = useState<null | ITeamResultsFromFixtures[]>(null)

	useEffect(() => {
		const tableData = teamsResultsFromFixtures(data, leaagueCorrections, 'all')

		setLeagueData(tableData)

		console.log(tableData);
		
	}, [data, status])

	if (status === 'idle' || status === 'pending') {
		return <LoadingSpinner />
	}

	if (status === 'rejected') {
		return <LoadingError messageEn="Standings data missed" messageUa="Відсутня інформація про результати" />
	}

	if (status === 'resolved') {
		return <LeagueStandingsTable leagueData={leagueData}/>
	}

	// return <LoadingSpinner />
	// return <LoadingError messageEn="Standings data missed" messageUa="Відсутня інформація про результати" />
}
