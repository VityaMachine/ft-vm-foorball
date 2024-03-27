import { useState, useContext } from 'react'

import { LanguageContext } from '@/context/LanguageContext'

import { Box, Typography, Tabs, Tab, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import TabPanel from '@/components/ui/TabPanel/TabPanel'
import { useTheme } from '@mui/material'

import Image from 'next/image'

import TeamPlayersSquad from '../TeamPlayersSquad/TeamPlayersSquad'
import TeamSeasons from '../TeamSeasons/TeamSeasons'
import TeamSeasonLeagues from '../TeamSeasonLeagues/TeamSeasonLeagues'

import defaultValues from '@/constants/api.constants'
import TeamTournamentReport from '../TeamTournamentReport/TeamTournamentReport'

export default function TeamDetails({ teamData }: { teamData: ITeamGeneralData }) {
	const [dataType, setDataType] = useState<'stats' | 'squad'>('stats')
	const [selectedSeason, setSelectedSeason] = useState<number>(defaultValues.currentSeason)
	const [selectedTournamentId, setselectedTournamentId] = useState<number | ''>('')

	const { language } = useContext(LanguageContext)

	const theme = useTheme()

	const handleChangeDataType = (e: SelectChangeEvent) => {
		setDataType(e.target.value as 'stats' | 'squad')
	}

	const handleSeasonChange = (newSeason: number) => {
		setSelectedSeason(newSeason)
		setselectedTournamentId('')
	}

	const handleTournamentChange = (newTournamentId: number) => {
		setselectedTournamentId(newTournamentId)
	}

	return (
		<Box
			sx={{
				mt: '24px'
			}}
		>
			{/* head info */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center'
				}}
			>
				{/* team logo */}
				<Box>
					<Image
						src={teamData.team.logo}
						alt={teamData.team.name}
						width={120}
						height={120}
						className="min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] object-contain"
						style={{
							filter: teamData.team.id === 496 && theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
						}}
						loading="eager"
						priority
					/>
				</Box>

				{/* team info */}
				<Box
					sx={{
						ml: '20px'
					}}
				>
					<Typography
						variant="h4"
						sx={{
							color: 'text.primary'
						}}
					>
						{teamData.team.name}
					</Typography>
					<Typography
						variant="h5"
						sx={{
							color: 'text.disabled'
						}}
					>
						{teamData.team.country}
					</Typography>
					<Typography
						variant="h6"
						sx={{
							color: 'text.disabled'
						}}
					>
						{teamData.venue.name} ({teamData.venue.city})
					</Typography>
				</Box>
			</Box>

			{/* data menu */}
			<Box
				sx={{
					mt: '16px',
					display: 'flex',
					gap: '24px',
					justifyContent: 'center'
				}}
			>
				<Box
					sx={{
						minWidth: '160px'
					}}
				>
					<FormControl fullWidth>
						<InputLabel>{language === 'ua' ? 'Дані' : 'Data'}</InputLabel>
						<Select
							value={dataType}
							onChange={handleChangeDataType}
							label={language === 'ua' ? 'Дані' : 'Data'}
						>
							<MenuItem value={'stats'}> {language === 'ua' ? 'Статистика' : 'Stats'}</MenuItem>
							<MenuItem value={'squad'}>{language === 'ua' ? 'Склад' : 'Squad'}</MenuItem>
						</Select>
					</FormControl>
				</Box>

				{dataType === 'stats' && (
					<Box
						sx={{
							display: 'flex',
							gap: '24px'
						}}
					>
						<TeamSeasons
							teamId={teamData.team.id}
							selectedSeason={selectedSeason}
							onSeasonChange={handleSeasonChange}
						/>

						<TeamSeasonLeagues
							teamId={teamData.team.id}
							selectedSeason={selectedSeason}
							selectedTournamentId={selectedTournamentId}
							onTournamentChange={handleTournamentChange}
						/>
					</Box>
				)}
			</Box>

			{/* info */}
			<Box
				sx={{
					mt: '24px'
				}}
			>
				{dataType === 'squad' && <TeamPlayersSquad teamId={teamData.team.id} lang={language} />}

				{dataType === 'stats' &&
					(selectedTournamentId === '' ? (
						<Box>Select the tournament to watch the report</Box>
					) : (
						<TeamTournamentReport
							tournamentId={selectedTournamentId}
							teamId={teamData.team.id}
							season={selectedSeason}
						/>
					))}
			</Box>
		</Box>
	)
}
