'use client'
import { useContext } from 'react'

import { FixturesApiContext } from '@/context/Fixtures.api.context'

import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'
import LeagueMatches from '@/components/customComponents/LeagueMatches/LeagueMatches'

export default function PlayedMatches() {
	const { state } = useContext(FixturesApiContext)
	const { data, status } = state

//   console.log(data);
  


	if (status === 'idle' || status === 'pending') {
		return <LoadingSpinner />
	}

	if (status === 'rejected') {
		return <LoadingError messageEn="Matches data missed" messageUa="Відсутня інформація про матчі" />
	}

	if (status === 'resolved') {
		// return <LeagueMatches fixturesData={data}>matches</LeagueMatches>
    return <LeagueMatches fixturesData={data} />
	}
}
