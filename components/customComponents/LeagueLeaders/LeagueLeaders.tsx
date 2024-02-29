import { useState, useEffect, useContext } from 'react'

import { useParams } from 'next/navigation'

import { tournamentsConfigs } from '@/configs/tournaments'
import { apiFootball } from '@/services/api-football.rapidapi'
import { checkRespErrors } from '@/utils/apiCheckRespErrors'
import { leagueLeadersDataParser } from '@/helpers/leagueLeadersHelpers'

import { Box } from '@mui/material'
import LeagueLeadersMenu from './LeagueLeadersMenu'

import { LanguageContext } from '@/context/LanguageContext'
import LeagueLeadersData from './LeagueLeadersData'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'

function TabPanel({ children, index, value }: { children?: React.ReactNode; index: number; value: number }) {
	return (
		<Box sx={{ py: 2 }} hidden={value !== index}>
			{value === index && children}
		</Box>
	)
}

export default function LeagueLeaders() {
	const [data, setData] = useState<ILeagueLeadersData>({
		topScorers: null,
		topAssistants: null,
		topYellowCards: null,
		topRedCards: null
	})
	const [status, setStatus] = useState<ApiStatusType>('idle')
	const [error, setError] = useState<null | string>(null)

	const [tabValue, setTabValue] = useState(0)
	const { language } = useContext(LanguageContext)

	const params = useParams()

	const leagueData = tournamentsConfigs.leagues.find(league => league.shortName === params.leagueName)

	const handleChangeTab = (e: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
	}

	useEffect(() => {
		const getStatsData = async () => {
			setStatus('pending')

			const topScorerPath = 'players/topscorers'
			const topSAssistantPath = 'players/topassists'
			const topYellowCardsPath = 'players/topyellowcards'
			const topRedCardsPath = 'players/topredcards'

			if (!leagueData) {
				setError('League not found')
				setStatus('rejected')
			}

			if (leagueData) {
				const basicConfig = {
					reqParams: {
						league: leagueData.id
					},
					currentSeason: true,
					timezone: false
				}

				const topScorerData = await apiFootball({
					...basicConfig,
					urlPath: topScorerPath
				})
				const topSAssistantData = await apiFootball({
					...basicConfig,
					urlPath: topSAssistantPath
				})
				const topYellowCardsData = await apiFootball({
					...basicConfig,
					urlPath: topYellowCardsPath
				})
				const topRedCardsData = await apiFootball({
					...basicConfig,
					urlPath: topRedCardsPath
				})

				const topScorerOk = checkRespErrors(topScorerData.errors, topScorerData.response)
				const topAssistantOk = checkRespErrors(topSAssistantData.errors, topSAssistantData.response)
				const topYellowCardOk = checkRespErrors(topYellowCardsData.errors, topYellowCardsData.response)
				const topRedCardOk = checkRespErrors(topRedCardsData.errors, topRedCardsData.response)

				if (topScorerOk) {
					setData(data => ({ ...data, topScorers: leagueLeadersDataParser(topScorerData.response) }))
				}

				if (topAssistantOk) {
					setData(data => ({ ...data, topAssistants: leagueLeadersDataParser(topSAssistantData.response) }))
				}

				if (topYellowCardOk) {
					setData(data => ({ ...data, topYellowCards: leagueLeadersDataParser(topYellowCardsData.response) }))
				}

				if (topRedCardOk) {
					setData(data => ({ ...data, topRedCards: leagueLeadersDataParser(topRedCardsData.response) }))
				}

				setStatus('resolved')
			}
		}

		getStatsData()
	}, [leagueData])

	return (
		<Box
			sx={{
				mt: '20px'
			}}
		>
			{status === 'idle' || status === 'pending' ? (
				<LoadingSpinner />
			) : (
				<>
					<LeagueLeadersMenu tabValue={tabValue} language={language} onTabChange={handleChangeTab} />


				<Box sx={{
					width: '100%',
					
				}}>

				<Box
						sx={{
							overflowY: 'auto',
							
						
						}}
					>
						<TabPanel value={tabValue} index={0}>
							{data.topScorers ? (
								<LeagueLeadersData statInfo="goals" data={data.topScorers} />
							) : (
								<LoadingError messageUa="Помилка завантаження даних" messageEn="Data loading error" />
							)}
						</TabPanel>

						<TabPanel value={tabValue} index={1}>
							{data.topAssistants ? (
								<LeagueLeadersData statInfo="assists" data={data.topAssistants} />
							) : (
								<LoadingError messageUa="Помилка завантаження даних" messageEn="Data loading error" />
							)}
						</TabPanel>
						<TabPanel value={tabValue} index={2}>
							{data.topYellowCards ? (
								<LeagueLeadersData statInfo="ycards" data={data.topYellowCards} />
							) : (
								<LoadingError messageUa="Помилка завантаження даних" messageEn="Data loading error" />
							)}
						</TabPanel>
						<TabPanel value={tabValue} index={3}>
							{data.topRedCards ? (
								<LeagueLeadersData statInfo="rcards" data={data.topRedCards} />
							) : (
								<LoadingError messageUa="Помилка завантаження даних" messageEn="Data loading error" />
							)}
						</TabPanel>
					</Box>
				</Box>
				</>
			)}
		</Box>
	)
}
