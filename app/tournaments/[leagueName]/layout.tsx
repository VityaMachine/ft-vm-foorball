'use client'

import { useEffect, useContext, useRef } from 'react'
import { useParams } from 'next/navigation'

import { tournamentsConfigs } from '@/configs/tournaments'

import { FixturesApiContext } from '@/context/Fixtures.api.context'

import { apiFootball } from '@/services/api-football.rapidapi'
import { checkRespErrors } from '@/utils/apiCheckRespErrors'

export default function LeagueLayout({ children }: { children: React.ReactNode }) {
	const { dispatch } = useContext(FixturesApiContext)

	const intervalId = useRef<ReturnType<typeof setTimeout> | string | number | undefined>(undefined)

	const params = useParams()
	const leagueData = tournamentsConfigs.leagues.find(league => league.shortName === params.leagueName)

	useEffect(() => {
		dispatch({
			type: 'status',
			payload: {
				status: 'pending'
			}
		})

		const getFixturesData = async () => {
			if (leagueData) {
				const fixturesParams = {
					urlPath: 'fixtures',
					reqParams: { league: leagueData.id },
					timezone: true
				}
				const respFixtures = await apiFootball(fixturesParams)

				if (checkRespErrors(respFixtures.errors, respFixtures.response)) {
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

		// initial load data
		getFixturesData()

		// refresh data every minute
		intervalId.current = setInterval(getFixturesData, 60000)

		return () => {
			stopInterval()
		}
	}, [dispatch, leagueData])

	const stopInterval = (): void => {
		clearInterval(intervalId.current)
	}

	return <>{children}</>
}
