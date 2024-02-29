'use client'

import LeagueTitle from '@/components/customComponents/LeagueTitle/LeagueTitle'
import { Box } from '@mui/material'
import LeaguesMenu from '@/components/customComponents/LeaguesMenu/LeaguesMenu'

export default function LeaguesLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box
			className="tournaments-layout"
			sx={{
				width: '100%'
			}}
		>
			<LeagueTitle />

			<LeaguesMenu />

			{children}
		</Box>
	)
}
