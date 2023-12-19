'use client'

import { useState, useContext } from 'react'

import { Box, Button, Chip, Table, TableCell, TableContainer, TableRow } from '@mui/material'

import { LanguageContext } from '@/context/LanguageContext'

import { styles } from './styles'
import DesktopAndMobileTable from './DesktopAndMobileTable'

import { teamsResultsFromFixtures } from '@/helpers/leagueStandingsHelpers'

import leaagueCorrections from '@/constants/leagues.corrections'
import { StyledTableHead } from './StyledTableHead'

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

	const { language } = useContext(LanguageContext)

	const leagueData = teamsResultsFromFixtures(fixturesData, leaagueCorrections, matchesToShow)

	console.log(leagueData);
	

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
				<DesktopAndMobileTable leagueData={leagueData} />
			</Box>

			{/* mobile */}
			<Box
				sx={{
					display: {
						xs: 'flex',
						sm: 'none'
					}
				}}
			>
				<TableContainer>
					<Table size="small">
						<StyledTableHead>
							<TableRow>
								<TableCell sx={{
							fontWeight: 700
						}}>#</TableCell>
								<TableCell sx={{
							fontWeight: 700
						}}>Team</TableCell>
								<TableCell sx={{
							fontWeight: 700
						}}>M</TableCell>
								<TableCell sx={{
							fontWeight: 700
						}}>(W/D/L)</TableCell>
								<TableCell sx={{
							fontWeight: 700
						}}>GS/GA</TableCell>
								<TableCell sx={{
							fontWeight: 700
						}}>P</TableCell>
							</TableRow>
						</StyledTableHead>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	)
}
