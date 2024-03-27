import { useState, useContext, useEffect } from 'react'
import { Box, SelectChangeEvent, Typography } from '@mui/material'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { byRoundsFixturesParser } from '@/helpers/fixturesHelpers'

import { LanguageContext } from '@/context/LanguageContext'

import textContent from './LeagueMatches.textContentData.json'
import RoundFixturesList from './RoundFixturesList'
import CustomAccordion from '@/components/ui/CustomAccordion/CustomAccordion'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import LeagueMatchesMenu from './LeagueMatchesMenu'

export default function LeagueMatches({ fixturesData }: { fixturesData: IFixtureData[] }) {
	const [typeMatches, setTypeMatches] = useState<selectedMatchesType>('')
	const [teamName, setTeamName] = useState<string | 'all'>('all')
	const [matchSide, setMatchSide] = useState<selectedSideType>('all')
	const [roundsData, setRoundsData] = useState<IFixturesByRounds[] | null>(null)
	const [stateStatus, setStateStatus] = useState<ApiStatusType>('idle')

	const { language } = useContext(LanguageContext)

	const theme = useTheme()
	const smBreakPoint = useMediaQuery(theme.breakpoints.down('sm'))

	useEffect(() => {
		setStateStatus('pending')
		const today = byRoundsFixturesParser(fixturesData, 'today', teamName, matchSide)
		const tomorrow = byRoundsFixturesParser(fixturesData, 'tomorrow', teamName, matchSide)
		const nsMatches = byRoundsFixturesParser(fixturesData, 'NS', teamName, matchSide)

		if (stateStatus === 'pending') {
			if (today.length > 0) {
				setTypeMatches('today')
			} else if (tomorrow.length > 0) {
				setTypeMatches('tomorrow')
			} else if (nsMatches.length > 0) {
				setTypeMatches('NS')
			} else {
				setTypeMatches('FT')
			}
		}

		if (typeMatches === '') {
			return
		}

		const data = byRoundsFixturesParser(fixturesData, typeMatches, teamName, matchSide)

		setRoundsData(data)
		setStateStatus('resolved')
	}, [fixturesData, matchSide, stateStatus, teamName, typeMatches])

	const handleChangeType = (e: SelectChangeEvent) => {
		setTypeMatches(e.target.value as selectedMatchesType)
	}

	const handleChangeTeam = (e: SelectChangeEvent) => {
		setTeamName(e.target.value as string)

		if (e.target.value === 'all') {
			setMatchSide('all')
		}
	}

	const handleChangeSide = (e: SelectChangeEvent) => {
		setMatchSide(e.target.value as selectedSideType)
	}

	return (
		<Box>
			{(stateStatus === 'idle' || stateStatus === 'pending') && <LoadingSpinner my={30}/>}

			{stateStatus === 'resolved' && (
				<>
					{/* menu */}

					{smBreakPoint ? (
						<CustomAccordion
							sx={{
								mt: '10px',
								minWidth: 330
							}}
							headerText={
								<Typography variant="h6" sx={{ fontWeight: 700 }}>
									{language === 'ua' ? 'Меню вибору матчів' : 'Matches select menu'}
								</Typography>
							}
						>
							<Box
								sx={{
									mb: '10px'
								}}
							>
								<LeagueMatchesMenu
									fixturesData={fixturesData}
									language={language}
									typeMatches={typeMatches}
									teamName={teamName}
									matchSide={matchSide}
									onChangeType={handleChangeType}
									onChangeTeam={handleChangeTeam}
									onChangeSide={handleChangeSide}
								/>
							</Box>
						</CustomAccordion>
					) : (
						<LeagueMatchesMenu
							fixturesData={fixturesData}
							language={language}
							typeMatches={typeMatches}
							teamName={teamName}
							matchSide={matchSide}
							onChangeType={handleChangeType}
							onChangeTeam={handleChangeTeam}
							onChangeSide={handleChangeSide}
						/>
					)}

					{/* data */}
					<Box>
						{roundsData ? (
							roundsData.length > 0 ? (
								roundsData.map(round => (
									<Box key={round.roundName}>
										<CustomAccordion
											defaultOpen
											headerText={
												<Typography>
													{round.roundName.includes('Regular Season')
														? language === 'ua'
															? `Тур ${round.roundName.split('Regular Season - ')[1]}`
															: `Round ${round.roundName.split('Regular Season - ')[1]}`
														: round.roundName}
												</Typography>
											}
											sx={{
												my: '6px',
												minWidth: 330
											}}
										>
											<RoundFixturesList round={round} language={language} />
										</CustomAccordion>
									</Box>
								))
							) : (
								<Box>{language === 'ua' ? textContent.ua.noMatches : textContent.en.noMatches}</Box>
							)
						) : (
							<Box></Box>
						)}
					</Box>
				</>
			)}
		</Box>
	)
}
