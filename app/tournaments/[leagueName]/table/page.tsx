'use client'
import { useEffect, useContext } from 'react'

import { FixturesApiContext } from '@/context/Fixtures.api.context'

import { teamsResultsFromFixtures } from '@/helpers/leagueStandingsHelpers'

import leaagueCorrections from '@/constants/leagues.corrections'

export default function TournamentTable() {
	const { state } = useContext(FixturesApiContext)
	const { data, status, error } = state

	useEffect(() => {
		const teamsResultsData = teamsResultsFromFixtures(data, leaagueCorrections)

		console.log(teamsResultsData)
	}, [data])

	return <div>TournamentTable</div>
}
