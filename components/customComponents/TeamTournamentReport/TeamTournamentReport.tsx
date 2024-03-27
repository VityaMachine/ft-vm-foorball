import { useState, useEffect, useContext, SyntheticEvent } from 'react'

import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'

import { LanguageContext } from '@/context/LanguageContext'

import { apiFootball } from '@/services/api-football.rapidapi'
import { checkRespErrors } from '@/utils/apiCheckRespErrors'

import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'

import MatchesPivotData from './MatchesPivotData/MatchesPivotData'
import GoalsData from './GoalsData/GoalsData'
import PenaltiesData from './PenaltiesData/PenaltiesData'
import TabPanel from '@/components/ui/TabPanel/TabPanel'

export default function TeamTournamentReport({
	tournamentId,
	teamId,
	season
}: {
	tournamentId: number
	teamId: number
	season: number
}) {
	const [reportPage, setReportPage] = useState(0)

	const [generalData, setGeneralData] = useState<null | ITeamGeneralStat>(null)
	const [generalDataStatus, setGeneralDataStatus] = useState<ApiStatusType>('idle')

	const { language } = useContext(LanguageContext)

	useEffect(() => {
		const getGeneralData = async () => {
			setGeneralDataStatus('pending')

			const reqParams = {
				urlPath: 'teams/statistics',
				reqParams: {
					league: tournamentId,
					season,
					team: teamId
				},
				currentSeason: false
			}

			const generalData = await apiFootball(reqParams)
			const generalDataOk = checkRespErrors(generalData.errors, generalData.response)

			if (generalDataOk) {
				const data = generalData.response as ITeamGeneralStat

				setGeneralData(data)
				setGeneralDataStatus('resolved')
			} else {
				setGeneralDataStatus('rejected')
			}
		}

		getGeneralData()
	}, [season, teamId, tournamentId])

	const handleChangeReportPage = (e: SyntheticEvent, newValue: number) => {
		setReportPage(newValue)
	}

	console.log(generalData)

	return (
		<Box>
			{(generalDataStatus === 'idle' || generalDataStatus === 'pending') && <LoadingSpinner my={30} />}

			{generalDataStatus === 'rejected' && (
				<LoadingError messageEn="General data loading issue" messageUa="Помилка завантаження загальних даних" />
			)}

			{generalDataStatus === 'resolved' && generalData && (
				// <Box
				// 	sx={{
				// 		display: 'flex',
				// 		gap: '24px',
				// 		flexWrap: 'wrap',
				// 		justifyContent: 'center'
				// 	}}
				// >
				// 	{/* matches */}
				// 	<Box>
				// 		<Typography
				// 			align="center"
				// 			sx={{
				// 				fontSize: '18px',
				// 				fontWeight: 700
				// 			}}
				// 		>
				// 			{language === 'ua' ? 'Матчі' : 'Matches'}:
				// 		</Typography>
				// 		<MatchesPivotData lang={language} fixtures={generalData.fixtures} />
				// 	</Box>

				// 	{/* goals total data */}
				// 	<Box
				// 		sx={{
				// 			minWidth: '360px'
				// 		}}
				// 	>
				// 		<Typography
				// 			align="center"
				// 			sx={{
				// 				fontSize: '18px',
				// 				fontWeight: 700
				// 			}}
				// 		>
				// 			{language === 'ua' ? 'Голи' : 'Goals'}:
				// 		</Typography>
				// 		<Box
				// 			sx={{
				// 				display: 'flex',
				// 				// flexDirection: 'column',
				// 				gap: '24px',
				// 				flexWrap: 'wrap',
				// 				justifyContent: 'center',
				// 				mt: '8px'
				// 			}}
				// 		>
				// 			<Box>
				// 				<Typography>{language === 'ua' ? 'Забиті' : 'For'}</Typography>
				// 				<GoalsData lang={language} goalsData={generalData.goals.for} />
				// 			</Box>
				// 			<Box>
				// 				<Typography>{language === 'ua' ? 'Пропущені' : 'Against'}</Typography>
				// 				<GoalsData lang={language} goalsData={generalData.goals.against} />
				// 			</Box>
				// 		</Box>
				// 	</Box>

				// 	{/* GoalsByMinutes */}

				// 	{/* penalties */}
				// 	<Box>
				// 	<Typography
				// 			align="center"
				// 			sx={{
				// 				fontSize: '18px',
				// 				fontWeight: 700
				// 			}}
				// 		>
				// 			{language === 'ua' ? 'Пенальті' : 'Penalty'}:
				// 		</Typography>
				// 		<PenaltiesData />
				// 	</Box>
				// </Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<Tabs
						value={reportPage}
						onChange={handleChangeReportPage}
						variant="scrollable"
						scrollButtons
						allowScrollButtonsMobile
					>
						<Tab label={language === 'ua' ? 'Матчі' : 'Matches'} />
						<Tab label={language === 'ua' ? 'Голи' : 'Goals'} />
						<Tab label={language === 'ua' ? 'Пенальті' : 'Penalties'} />
						<Tab label={language === 'ua' ? 'Картки' : 'Cards'} />
						<Tab label={language === 'ua' ? 'Рекорди' : 'Records'} />
					</Tabs>

					<Box>
						<TabPanel index={0} value={reportPage}></TabPanel>
					</Box>
				</Box>
			)}
		</Box>
	)
}
