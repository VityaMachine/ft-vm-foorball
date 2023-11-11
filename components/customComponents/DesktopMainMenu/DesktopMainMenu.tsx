'use client'

import { useContext } from 'react'
import { CustomThemeContext } from '@/context/CustomThemeContext'

import { Box } from '@mui/material'

import LeaguesList from '../LeaguesList/LeaguesList'

export default function DesktopMainMenu() {
	const { isDarkMode } = useContext(CustomThemeContext)

	return (
		<Box
			sx={{
				borderRight: isDarkMode ? '1px solid #393939' : '1px solid #e0e0e0',
				height: {
					xs: 'calc(100vh - 56px)',
					sm: 'calc(100vh - 90px)'
				}
			}}
		>
			<LeaguesList />
		</Box>
	)
}
