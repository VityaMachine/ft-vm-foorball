'use client'

import { useState, useContext } from 'react'
import { useParams } from 'next/navigation'

import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableRow, Container } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'

import { LanguageContext } from '@/context/LanguageContext'

import { styles } from './styles'
import DesktopAndMobileTable from './DesktopAndMobileTable'

import { teamsResultsFromFixtures } from '@/helpers/leagueStandingsHelpers'

import leaagueCorrections from '@/constants/leagues.corrections'
import { StyledTableHead } from './StyledTableHead'

import { isTooltippedPlace, shortTeamNameFromOriginalHandler } from '@/helpers/leagueStandingsHelpers'

import { tournamentsConfigs } from '@/configs/tournaments'
import LeaguesDescr from './LeaguesDescr'
import MobileTable from './MobileTable'

const stylesChip = {
	fontSize: {
		xs: '12px',
		sm: '14px',
		md: '16px'
	},
	px: '3px',
	mx: '6px'
}
export default function LeagueStandingsTable({ fixturesData }: { fixturesData: IFixtureData[] }) {
	const [matchesToShow, setMatchesToShow] = useState<'all' | 'home' | 'away'>('all')

	const params = useParams()
	const leagueParams: ILeagueConfig | undefined = tournamentsConfigs.leagues.find(
		league => league.shortName === params.leagueName
	)

	const { language } = useContext(LanguageContext)

	const leagueData = teamsResultsFromFixtures(fixturesData, leaagueCorrections, matchesToShow)

	return (
		<Box sx={styles.mainContainer}>
			{/* home away all buttons */}
			<Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						my: '25px'
						// mb: '15px'
					}}
				>
					<Chip
						label={language === 'ua' ? 'Всі' : 'All'}
						clickable
						size="small"
						variant={matchesToShow === 'all' ? 'filled' : 'outlined'}
						sx={stylesChip}
						color="warning"
						onClick={() => setMatchesToShow('all')}
					/>

					<Chip
						label={language === 'ua' ? 'Дома' : 'Home'}
						clickable
						size="small"
						variant={matchesToShow === 'home' ? 'filled' : 'outlined'}
						sx={stylesChip}
						color="warning"
						onClick={() => setMatchesToShow('home')}
					/>

					<Chip
						label={language === 'ua' ? 'Виїзд' : 'Away'}
						clickable
						size="small"
						variant={matchesToShow === 'away' ? 'filled' : 'outlined'}
						sx={stylesChip}
						color="warning"
						onClick={() => setMatchesToShow('away')}
					/>
				</Box>
			</Box>

			{/* desktop and tablet */}
			<Box sx={styles.desktopTabletContainer}>
				<DesktopAndMobileTable leagueData={leagueData} language={language} leagueParams={leagueParams} />
			</Box>

			{/* mobile */}
			<Box sx={styles.mobileContainer}>
				<MobileTable leagueData={leagueData} language={language} leagueParams={leagueParams} />
			</Box>

			{/* league places description */}
			<Container
				sx={{
					mt: '10px'
				}}
			>
				{leagueParams && <LeaguesDescr leagueParams={leagueParams} language={language} />}
			</Container>
		</Box>
	)
}
