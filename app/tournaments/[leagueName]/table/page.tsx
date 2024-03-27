'use client'
import { useContext } from 'react'

import { FixturesApiContext } from '@/context/Fixtures.api.context'

import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'
import LeagueStandingsTable from '@/components/customComponents/LeagueStandingsTable/LeagueStandingsTable'

export default function TournamentTable() {
	const { state } = useContext(FixturesApiContext)
	const { data, status } = state

	if (status === 'idle' || status === 'pending') {
		return <LoadingSpinner my={30}/>
	}

	if (status === 'rejected') {
		return <LoadingError messageEn="Standings data missed" messageUa="Відсутня інформація про результати" />
	}

	if (status === 'resolved') {
		return <LeagueStandingsTable fixturesData={data}/>
	}

}
