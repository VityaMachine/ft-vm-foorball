'use client'

import LeagueTitle from '@/components/customComponents/LeagueTitle/LeagueTitle'
import { Box } from '@mui/material'
import LeaguesMenu from '@/components/customComponents/LeaguesMenu/LeaguesMenu'


export default function LeaguesLayout({ children  }: { children: React.ReactNode} ) {
	


	
	return (
		<Box sx={{
      width: '100%',
	//   minWidth: '1265px',
	//   overflow: 'hidden'
    }}>
			<LeagueTitle />

			<LeaguesMenu />
			{children}
		</Box>
	)
}
