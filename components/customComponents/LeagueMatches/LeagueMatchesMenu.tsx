import { useTheme } from '@mui/material/styles'

import { Box, FormControl, InputLabel, Select, MenuItem, Divider, SelectChangeEvent } from '@mui/material'

import { getTeamNamesFromFixtures } from '@/helpers/fixturesHelpers'

import textContent from './LeagueMatches.textContentData.json'

export default function LeagueMatchesMenu({
	fixturesData,
	language,
	typeMatches,
	teamName,
	matchSide,
	onChangeType,
	onChangeTeam,
	onChangeSide
}: {
	fixturesData: IFixtureData[]
	language: LangStateType
	typeMatches: selectedMatchesType
	teamName: string | 'all'
	matchSide: selectedSideType
	onChangeType: (e: SelectChangeEvent) => void
	onChangeTeam: (e: SelectChangeEvent) => void
	onChangeSide: (e: SelectChangeEvent) => void
}) {
	const theme = useTheme()

	const teamNamesData = getTeamNamesFromFixtures(fixturesData, language)

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: {
					xs: 'column',
					sm: 'row'
				},
				mt: '30px',
				justifyContent: 'center',
				gap: {
					xs: '10px',
					sm: '50px'
				}
			}}
		>
			{/* match type */}
			<Box
				sx={{
					width: {
						xs: '100%',
						sm: '150px'
					}
				}}
			>
				<FormControl fullWidth size="small">
					<InputLabel id="matches-select-label">
						{language === 'ua' ? textContent.ua.matchTypeSelectLabel : textContent.en.matchTypeSelectLabel}
					</InputLabel>

					<Select
						labelId="matches-select-label"
						id="matches-select"
						value={typeMatches}
						label={language === 'ua' ? textContent.ua.matchTypeSelectLabel : textContent.en.matchTypeSelectLabel}
						onChange={onChangeType}
					>
						<MenuItem
							value={'all'}
							sx={{
								borderBottom: `1px solid ${theme.palette.divider}`
							}}
						>
							{language === 'ua' ? textContent.ua.selectValueAll : textContent.en.selectValueAll}
						</MenuItem>

						<MenuItem value={'NS'}>
							{language === 'ua' ? textContent.ua.matchTypeNS : textContent.en.matchTypeNS}
						</MenuItem>
						<MenuItem value={'online'}>
							{language === 'ua' ? textContent.ua.matchTypeOnline : textContent.en.matchTypeOnline}
						</MenuItem>
						<MenuItem
							value={'FT'}
							sx={{
								borderBottom: `1px solid ${theme.palette.divider}`
							}}
						>
							{language === 'ua' ? textContent.ua.matchTypeFT : textContent.en.matchTypeFT}
						</MenuItem>

						<MenuItem value={'today'}>
							{language === 'ua' ? textContent.ua.matchTypeToday : textContent.en.matchTypeToday}
						</MenuItem>

						<MenuItem value={'tomorrow'}>
							{language === 'ua' ? textContent.ua.matchTypeTomorrow : textContent.en.matchTypeTomorrow}
						</MenuItem>
						<MenuItem value={'week'}>
							{language === 'ua' ? textContent.ua.matchTypeWeek : textContent.en.matchTypeWeek}
						</MenuItem>
					</Select>
				</FormControl>
			</Box>

			{/* TeamName */}
			<Box
				sx={{
					width: {
						xs: '100%',
						sm: '200px'
					}
				}}
			>
				<FormControl fullWidth size="small">
					<InputLabel id="team-select-label">
						{language === 'ua' ? textContent.ua.teamLSelectabel : textContent.en.teamLSelectabel}
					</InputLabel>

					<Select
						labelId="team-select-label"
						id="team-select"
						value={teamName}
						label={language === 'ua' ? textContent.ua.teamLSelectabel : textContent.en.teamLSelectabel}
						onChange={onChangeTeam}
					>
						<MenuItem value={'all'}>
							{language === 'ua' ? textContent.ua.selectValueAll : textContent.en.selectValueAll}
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
					width: {
						xs: '100%',
						sm: '120px'
					}
				}}
			>
				<FormControl
					fullWidth
					size="small"
					disabled={
						teamName === 'all' || typeMatches === 'today' || typeMatches === 'tomorrow' || typeMatches === 'week'
					}
				>
					<InputLabel id="stadium-select-label">
						{language === 'ua' ? textContent.ua.side : textContent.en.side}
					</InputLabel>

					<Select
						labelId="stadium-select-label"
						id="stadium-select"
						value={matchSide}
						label={language === 'ua' ? textContent.ua.side : textContent.en.side}
						onChange={onChangeSide}
					>
						<MenuItem value={'all'}>
							{language === 'ua' ? textContent.ua.selectValueAll : textContent.en.selectValueAll}
						</MenuItem>

						<MenuItem value={'home'}>{language === 'ua' ? textContent.ua.sideHome : textContent.en.sideHome}</MenuItem>

						<MenuItem value={'away'}>{language === 'ua' ? textContent.ua.sideAway : textContent.en.sideAway}</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</Box>
	)
}
