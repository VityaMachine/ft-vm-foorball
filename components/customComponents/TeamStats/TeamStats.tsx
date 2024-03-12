import { useEffect, useState } from 'react'

import { Box, Tabs, Tab } from '@mui/material'
import TabPanel from '@/components/ui/TabPanel/TabPanel'

import Image from 'next/image'

import TeamSeasons from '../TeamSeasons/TeamSeasons'
import TeamTournamentDetails from '../TeamTournamentDetails/TeamTournamentDetails'

import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LoadingError from '@/components/ui/LoadingError/LoadingError'

import { apiFootball } from '@/services/api-football.rapidapi'
import { checkRespErrors } from '@/utils/apiCheckRespErrors'
import { teamLeaguesParser } from '@/helpers/teamHelpers'
import defaultValues from '@/constants/api.constants'

export default function TeamStats({ teamId }: { teamId: number }) {
	const [tabValue, setTabValue] = useState(0)
	const [selectedSeason, setSelectedSeason] = useState<number>(defaultValues.currentSeason)
	const [tournaments, setTournaments] = useState<null | ITeamTournamentParams[]>(null)
	const [tournamentsStatus, setTournamentsStatus] = useState<ApiStatusType>('idle')

	useEffect(() => {
		const getTournaments = async () => {
			setTournamentsStatus('pending')

			const reqParams = {
				urlPath: 'leagues',
				currentSeason: false,
				reqParams: {
					team: teamId,
					season: selectedSeason
				}
			}

			const tournamentsRespData = await apiFootball(reqParams)
			const tournamentsOk = checkRespErrors(tournamentsRespData.errors, tournamentsRespData.response)

			if (tournamentsOk) {
				const data = teamLeaguesParser(tournamentsRespData.response)

				setTournaments(data)
				setTournamentsStatus('resolved')
			} else {
				setTournamentsStatus('rejected')
			}
		}

		getTournaments()
	}, [selectedSeason, teamId])

	const handleChangeTab = (e: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
	}

	return (
		<Box>
			{' '}
			{/* seasons info */}
			<Box>
				<TeamSeasons teamId={teamId} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />
			</Box>
			{/* tournaments info  */}
			<Box
				sx={{
					mt: '24px',
					px: '16px'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					{(tournamentsStatus === 'idle' || tournamentsStatus === 'pending') && <LoadingSpinner />}

					{tournamentsStatus === 'rejected' && (
						<LoadingError messageEn="Something going wrong" messageUa="Щось пішло не так" />
					)}

					{tournamentsStatus === 'resolved' && tournaments && (
						<>
							<Tabs
								sx={{}}
								value={tabValue}
								onChange={handleChangeTab}
								scrollButtons
								allowScrollButtonsMobile
								variant="scrollable"
							>
								{tournaments.map(item => (
									<Tab
                                        sx={{
                                            maxWidth: '165px',
                                            height: '140px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}
										key={item.tournamentId}
										label={item.tournamentName}
										icon={
											<Box
												sx={{
													bgcolor: 'rgba(255,255,255,0.8)',
													width: '65px',
													height: '65px',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													borderRadius: '50%',
													overflow: 'hidden'
												}}
											>
												<Image
													className=" w-[60px] h-[60px] object-contain"
													src={item.tournamentLogo}
													width={60}
													height={60}
													alt={item.tournamentName}
												/>
											</Box>
										}
									/>
								))}
							</Tabs>
							<Box>
								{tournaments.map((item, idx) => (
									<TabPanel value={tabValue} index={idx} key={item.tournamentId}>
										<TeamTournamentDetails
											tournament={item}
											teamId={teamId}
											season={selectedSeason}
										/>
									</TabPanel>
								))}
							</Box>
						</>
					)}
				</Box>
			</Box>
		</Box>
	)
}
