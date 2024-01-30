import { useState, useContext, useEffect } from 'react'
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
	Divider,
	Typography
} from '@mui/material'

import {
	getTeamNamesFromFixtures,
	byRoundsFixturesParser
} from '@/helpers/fixturesHelpers'

import { LanguageContext } from '@/context/LanguageContext'
import { CustomThemeContext } from '@/context/CustomThemeContext'

import textContent from './LeagueMatches.textContentData.json'
import RoundFixturesList from './RoundFixturesList'
import CustomAccordion from '@/components/ui/CustomAccordion/CustomAccordion'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'

export default function LeagueMatches({
	fixturesData
}: {
	fixturesData: IFixtureData[]
}) {
	const [typeMatches, setTypeMatches] = useState<selectedMatchesType>('')
	const [teamName, setTeamName] = useState<string | 'all'>('all')
	const [matchSide, setMatchSide] = useState<selectedSideType>('all')
	const [roundsData, setRoundsData] = useState<IFixturesByRounds[] | null>(null)
	const [stateStatus, setStateStatus] = useState<ApiStatusType>('idle')

	const { language } = useContext(LanguageContext)
	const { isDarkMode } = useContext(CustomThemeContext)

	useEffect(() => {
		setStateStatus('pending')
		const today = byRoundsFixturesParser(fixturesData, 'today', teamName, matchSide)
		const tomorrow = byRoundsFixturesParser(
			fixturesData,
			'tomorrow',
			teamName,
			matchSide
		)
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

		const data = byRoundsFixturesParser(
			fixturesData,
			typeMatches,
			teamName,
			matchSide
		)

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

	// const selectedFixturesArr = roundsData?.map(item => item.roundMatches).flat()
	// const selectedTeamIds = selectedFixturesArr
	// 	?.map(item => [item.homeTeamId, item.awayTeamId])
	// 	.flat()
	// 	.filter((v, i, a) => a.indexOf(v) === i)

	const teamNamesData = getTeamNamesFromFixtures(fixturesData, language)

	// const teamNamesFiltered = teamNamesData.filter(team => selectedTeamIds?.includes(team.teamId))

	// const roundsData = byRoundsFixturesParser(
	// 	fixturesData,
	// 	typeMatches,
	// 	teamName,
	// 	matchSide
	// )

	return (
		<Box>
			{(stateStatus === 'idle' || stateStatus === 'pending') && <LoadingSpinner />}

			{stateStatus === 'resolved' && (
				<>
					{/* menu */}
					<Box
						sx={{
							display: 'flex',
							mt: '30px',
							justifyContent: 'center',
							gap: '50px'
						}}
					>
						{/* match type */}
						<Box
							sx={{
								width: '150px'
							}}
						>
							<FormControl fullWidth size="small">
								<InputLabel id="matches-select-label">
									{language === 'ua'
										? textContent.ua.matchTypeSelectLabel
										: textContent.en.matchTypeSelectLabel}
								</InputLabel>

								<Select
									labelId="matches-select-label"
									id="matches-select"
									value={typeMatches}
									label={
										language === 'ua'
											? textContent.ua.matchTypeSelectLabel
											: textContent.en.matchTypeSelectLabel
									}
									onChange={handleChangeType}
								>
									<MenuItem
										value={'all'}
										sx={{
											borderBottom: `1px solid ${isDarkMode ? '#525252' : '#c4c4c4'}`
										}}
									>
										{language === 'ua'
											? textContent.ua.selectValueAll
											: textContent.en.selectValueAll}
									</MenuItem>

									<MenuItem value={'NS'}>
										{language === 'ua'
											? textContent.ua.matchTypeNS
											: textContent.en.matchTypeNS}
									</MenuItem>
									<MenuItem value={'online'}>
										{language === 'ua'
											? textContent.ua.matchTypeOnline
											: textContent.en.matchTypeOnline}
									</MenuItem>
									<MenuItem
										value={'FT'}
										sx={{
											borderBottom: `1px solid ${isDarkMode ? '#525252' : '#c4c4c4'}`
										}}
									>
										{language === 'ua'
											? textContent.ua.matchTypeFT
											: textContent.en.matchTypeFT}
									</MenuItem>

									<MenuItem value={'today'}>
										{language === 'ua'
											? textContent.ua.matchTypeToday
											: textContent.en.matchTypeToday}
									</MenuItem>

									<MenuItem value={'tomorrow'}>
										{language === 'ua'
											? textContent.ua.matchTypeTomorrow
											: textContent.en.matchTypeTomorrow}
									</MenuItem>
									<MenuItem value={'week'}>
										{language === 'ua'
											? textContent.ua.matchTypeWeek
											: textContent.en.matchTypeWeek}
									</MenuItem>
								</Select>
							</FormControl>
						</Box>

						{/* TeamName */}
						<Box
							sx={{
								width: '200px'
							}}
						>
							<FormControl fullWidth size="small">
								<InputLabel id="team-select-label">
									{language === 'ua'
										? textContent.ua.teamLSelectabel
										: textContent.en.teamLSelectabel}
								</InputLabel>

								<Select
									labelId="team-select-label"
									id="team-select"
									value={teamName}
									label={
										language === 'ua'
											? textContent.ua.teamLSelectabel
											: textContent.en.teamLSelectabel
									}
									onChange={handleChangeTeam}
								>
									<MenuItem value={'all'}>
										{language === 'ua'
											? textContent.ua.selectValueAll
											: textContent.en.selectValueAll}
									</MenuItem>
									<Divider />

									{teamNamesData.map(item => (
										<MenuItem value={item.teamNameOriginal} key={item.teamId}>
											{item.teamNameData
												? language === 'ua'
													? item.teamNameData.longName.ua
													: item.teamNameData.longName.en
												: item.teamNameOriginal}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>

						{/* HomeAway */}
						<Box
							sx={{
								width: '120px'
							}}
						>
							<FormControl
								fullWidth
								size="small"
								disabled={
									teamName === 'all' ||
									typeMatches === 'today' ||
									typeMatches === 'tomorrow' ||
									typeMatches === 'week'
								}
							>
								<InputLabel id="stadium-select-label">
									{language === 'ua' ? textContent.ua.side : textContent.en.side}
								</InputLabel>

								<Select
									labelId="stadium-select-label"
									id="stadium-select"
									value={matchSide}
									label={
										language === 'ua' ? textContent.ua.side : textContent.en.side
									}
									onChange={handleChangeSide}
								>
									<MenuItem value={'all'}>
										{language === 'ua'
											? textContent.ua.selectValueAll
											: textContent.en.selectValueAll}
									</MenuItem>

									<MenuItem value={'home'}>
										{language === 'ua'
											? textContent.ua.sideHome
											: textContent.en.sideHome}
									</MenuItem>

									<MenuItem value={'away'}>
										{language === 'ua'
											? textContent.ua.sideAway
											: textContent.en.sideAway}
									</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Box>

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
															? `Тур ${
																	round.roundName.split('Regular Season - ')[1]
															  }`
															: `Round ${
																	round.roundName.split('Regular Season - ')[1]
															  }`
														: round.roundName}
												</Typography>
											}
											sx={{
												my: '6px'
											}}
										>
											<RoundFixturesList round={round} language={language} />
										</CustomAccordion>
									</Box>
								))
							) : (
								<Box>
									{language === 'ua'
										? textContent.ua.noMatches
										: textContent.en.noMatches}
								</Box>
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
