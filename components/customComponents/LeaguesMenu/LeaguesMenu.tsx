'use client'

import { useContext } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { Box, Chip, Stack } from '@mui/material'

import Link from 'next/link'

import { LanguageContext } from '@/context/LanguageContext'

import textContentData from './textContentData.json'

const stylesChip = {
	fontSize: '18px'
}

export default function LeaguesMenu() {
	const { leagueName } = useParams()
	const pathname = usePathname()
	const selectedPath = pathname.split('/')
	const { language } = useContext(LanguageContext)

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			<Stack direction="row" spacing={1}>
				<Link href={`/tournaments/${leagueName}/table`}>
					<Chip
						label={language === 'ua' ? textContentData.ua.table : textContentData.en.table}
						clickable
						variant={selectedPath[3] === 'table' ? 'filled' : 'outlined'}
						sx={stylesChip}
					/>
				</Link>
				<Link href={`/tournaments/${leagueName}/mathes`}>
					<Chip
						label={language === 'ua' ? textContentData.ua.matches : textContentData.en.matches}
						clickable
						size="medium"
						variant={selectedPath[3] === 'mathes' ? 'filled' : 'outlined'}
						sx={stylesChip}
					/>
				</Link>

				<Link href={`/tournaments/${leagueName}/calendar`}>
					<Chip
						label={language === 'ua' ? textContentData.ua.calendar : textContentData.en.calendar}
						clickable
						size="medium"
						variant={selectedPath[3] === 'calendar' ? 'filled' : 'outlined'}
						sx={stylesChip}
					/>
				</Link>

				<Link href={`/tournaments/${leagueName}/stats`}>
					<Chip
						label={language === 'ua' ? textContentData.ua.stats : textContentData.en.stats}
						clickable
						size="medium"
						variant={selectedPath[3] === 'stats' ? 'filled' : 'outlined'}
						sx={stylesChip}
					/>
				</Link>
			</Stack>
		</Box>
	)
}
