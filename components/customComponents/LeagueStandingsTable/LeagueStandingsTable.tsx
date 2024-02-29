'use client'

import { useState, useContext } from 'react'
import { useParams } from 'next/navigation'

import { Box, Chip, Container, Typography } from '@mui/material'

import { LanguageContext } from '@/context/LanguageContext'

import { styles } from './styles'
import DesktoptTable from './DesktopTable'

import { teamsResultsFromFixtures } from '@/helpers/leagueStandingsHelpers'

import leaagueCorrections from '@/constants/leagues.corrections'

import { tournamentsConfigs } from '@/configs/tournaments'
import { standingsTableRows } from '@/configs/standingTableConfigs'

import LeaguesDescr from './LeaguesDescr'
import MobileAndTabletTable from './MobileAndTabletTable'

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
				<Box
					sx={{
						display: 'flex'
					}}
				>
					<DesktoptTable leagueData={leagueData} language={language} leagueParams={leagueParams} />
				</Box>

				<Box sx={{
					mt: '24px',
					px: '24px'
				}}>

					<Typography sx={{
						fontWeight: 700
					}}>{language === 'ua' ? 'Деталі таблиці:' : "Table description:"}</Typography>
					{standingsTableRows.map(item => (
						<Box key={item.id} sx={{
							display: 'flex'
						}}>
							<Typography sx={{
								fontWeight: 700,
								width: '90px'
							}}>
								{language === 'ua' ? item.content.ua.textShort : item.content.en.textShort}
							</Typography>
							<Typography>
								{" - "}{language === 'ua' ? item.content.ua.textLong : item.content.en.textLong}
							</Typography>
						</Box>
					))}
				</Box>
			</Box>

			{/* mobile */}
			<Box sx={styles.mobileContainer}>
				<MobileAndTabletTable leagueData={leagueData} language={language} leagueParams={leagueParams} />
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
