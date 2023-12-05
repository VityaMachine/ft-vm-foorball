'use client'

import { useContext } from 'react'
import { useParams } from 'next/navigation'

import { LanguageContext } from '@/context/LanguageContext'

import { Avatar, Badge, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'

import Link from 'next/link'

import { tournamentsConfigs } from '@/configs/tournaments'

const SmallAvatar = styled(Avatar)(() => ({
	width: 22,
	height: 22
}))

export default function LeaguesList() {
	const { language } = useContext(LanguageContext)
	const { leagueName } = useParams()

	return (
		<List
			sx={{
				pt: 0
			}}
		>
			{tournamentsConfigs.leagues.map(league => (
				<li key={league.id}>
					<Link href={`/tournaments/${league.shortName}`}>
						<ListItemButton divider selected={leagueName === league.shortName}>
							<ListItemAvatar>
								<Badge
									overlap="circular"
									anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
									badgeContent={<SmallAvatar alt="eng" src={league.countryLogo} />}
								>
									<Avatar variant="square" alt="epl" src={league.leagueLogo} />
								</Badge>
							</ListItemAvatar>
							<ListItemText
								primary={language === 'ua' ? league.textContent.ua.name : league.textContent.en.name}
								secondary={language === 'ua' ? league.textContent.ua.country : league.textContent.en.country}
							/>
						</ListItemButton>
					</Link>
				</li>
			))}
		</List>
	)
}
