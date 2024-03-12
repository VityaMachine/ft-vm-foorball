import { useState, useContext } from 'react'

import { LanguageContext } from '@/context/LanguageContext'

import { Box, Typography, Tabs, Tab } from '@mui/material'
import TabPanel from '@/components/ui/TabPanel/TabPanel'
import { useTheme } from '@mui/material'

import Image from 'next/image'

import TeamStats from '../TeamStats/TeamStats'
import TeamPlayersSquad from '../TeamPlayersSquad/TeamPlayersSquad'

export default function TeamDetails({ teamData }: { teamData: ITeamGeneralData }) {
	const [tabValue, setTabValue] = useState(1)

	const { language } = useContext(LanguageContext)

	const theme = useTheme()
	
	const handleChangeTab = (e: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
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
						width={150}
						height={150}
						className="min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] object-contain"
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
						variant="h3"
						sx={{
							color: 'text.primary'
						}}
					>
						{teamData.team.name}
					</Typography>
					<Typography
						variant="h4"
						sx={{
							color: 'text.disabled'
						}}
					>
						{teamData.team.country}
					</Typography>
					<Typography
						variant="h5"
						sx={{
							color: 'text.disabled'
						}}
					>
						{teamData.venue.name} ({teamData.venue.city})
					</Typography>
				</Box>
			</Box>

			{/* team data */}

			<Tabs value={tabValue} onChange={handleChangeTab} centered>
				<Tab label={language === 'ua' ? "Статистика" : "Stats"} />
				<Tab label={language === 'ua' ? "Склад" : "Squad"} />
			</Tabs>

			<Box>
				<TabPanel index={0} value={tabValue}>
					<TeamStats teamId={teamData.team.id} />
				</TabPanel>
				<TabPanel index={1} value={tabValue}>
					<TeamPlayersSquad teamId={teamData.team.id} lang={language} />
				</TabPanel>
			</Box>
		</Box>
	)
}
