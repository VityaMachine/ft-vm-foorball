'use client'

import { useEffect, useContext } from 'react'
import { useParams } from 'next/navigation'

import { tournamentsConfigs } from '@/configs/tournaments'

import { FixturesApiContext } from '@/context/Fixtures.api.context'

import { apiFootball } from '@/services/api-football.rapidapi'

export default function LeagueLayout({ children }: { children: React.ReactNode }) {
	const { state, dispatch } = useContext(FixturesApiContext)

	const params = useParams()
	const leagueData = tournamentsConfigs.leagues.find(league => league.shortName === params.leagueName)

	useEffect(() => {
		const getFixturesData = async () => {
			dispatch({
				type: 'status',
				payload: {
					status: 'pending'
				}
			})

			if (leagueData) {
				const fixturesParams = {
					urlPath: 'fixtures',
					reqParams: { league: leagueData.id },
					timezone: true
				}
				const respFixtures = await apiFootball(fixturesParams)

				if (
					Array.isArray(respFixtures.errors) &&
					respFixtures.errors.length === 0 &&
					respFixtures.response.length > 0
				) {
					dispatch({
						type: 'data',
						payload: {
							data: respFixtures.response
						}
					})

					dispatch({
						type: 'status',
						payload: {
							status: 'resolved'
						}
					})
				}
			}
		}

		getFixturesData()
	}, [dispatch, leagueData])



	return <>{children}</>
}
