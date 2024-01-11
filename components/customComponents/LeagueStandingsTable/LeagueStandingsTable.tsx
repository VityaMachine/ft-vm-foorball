'use client'

import { useState, useContext } from 'react'
import { useParams } from 'next/navigation'

import { Box, Chip, Container } from '@mui/material'

import { LanguageContext } from '@/context/LanguageContext'

import { styles } from './styles'
import DesktopAndTabletTable from './DesktopAndTabletTable'

import { teamsResultsFromFixtures } from '@/helpers/leagueStandingsHelpers'

import leaagueCorrections from '@/constants/leagues.corrections'

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
	const leagueParams: ILeagueConfig = tournamentsConfigs.leagues.find(
		league => league.shortName === params.leagueName
	) as ILeagueConfig

	const { language } = useContext(LanguageContext)

	const leagueData = teamsResultsFromFixtures(fixturesData, leaagueCorrections, matchesToShow)

	console.log(leagueData)

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
				<DesktopAndTabletTable leagueData={leagueData} language={language} leagueParams={leagueParams} />
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
