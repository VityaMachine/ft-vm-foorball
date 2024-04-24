import { useState, useEffect, useContext, SyntheticEvent } from 'react'

import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'

import { LanguageContext } from '@/context/LanguageContext'

import { apiFootball } from '@/services/api-football.rapidapi'
import { checkRespErrors } from '@/utils/apiCheckRespErrors'

import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'

import TabPanel from '@/components/ui/TabPanel/TabPanel'
import MatchesSlide from './Slides/MatchesSlide/MatchesSlide'

export default function TeamTournamentReport({
	tournamentId,
	tournamentType,
	teamId,
	season
}: {
	tournamentId: number
	tournamentType: TournamentType
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


	// console.log(1);
	
	return (
		<Box>
			{(generalDataStatus === 'idle' || generalDataStatus === 'pending') && <LoadingSpinner my={30} />}

			{generalDataStatus === 'rejected' && (
				<LoadingError messageEn="General data loading issue" messageUa="Помилка завантаження загальних даних" />
			)}

			{generalDataStatus === 'resolved' && generalData && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
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

					<Box
						sx={{
							width: '100%'
						}}
					>
						<TabPanel index={0} value={reportPage}>
							<MatchesSlide mathcesData={generalData.fixtures} tournamentType={tournamentType}/>
						</TabPanel>
						<TabPanel index={1} value={reportPage}>
							2
						</TabPanel>
						<TabPanel index={2} value={reportPage}>
							3
						</TabPanel>
						<TabPanel index={3} value={reportPage}>
							4
						</TabPanel>
						<TabPanel index={4} value={reportPage}>
							5
						</TabPanel>
					</Box>
				</Box>
			)}
		</Box>
	)
}
