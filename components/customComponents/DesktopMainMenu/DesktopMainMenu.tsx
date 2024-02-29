'use client'

import { useTheme } from '@mui/material/styles'

import { Box } from '@mui/material'

import LeaguesList from '../LeaguesList/LeaguesList'

export default function DesktopMainMenu() {
	const theme = useTheme()

	return (
		<Box
			sx={{
				borderRight: `1px solid ${theme.palette.divider}`,
				height: {
					xs: 'calc(100vh - 56px)',
					sm: 'calc(100vh - 90px)'
				},
				position: 'relative'
			}}
		>
			<LeaguesList />
		</Box>
	)
}
