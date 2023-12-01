'use client'
import { useContext } from 'react'
import { useParams } from 'next/navigation'

import { tournamentsConfigs } from '@/configs/tournaments'
import { LanguageContext } from '@/context/LanguageContext'

import { Box, Typography } from '@mui/material'
import Image from 'next/image'

export default function LeagueTitle() {
	const params = useParams()
	const { language } = useContext(LanguageContext)

	const leagueName = params.leagueName
	const selectedLeague = tournamentsConfigs.leagues.find(league => league.shortName === leagueName)

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				width: '100%',
				justifyContent: 'space-between'
			}}
		>
			<Box
				sx={{
					m: '10px',
					minWidth: '150px',
					height: '150px'
				}}
			>
				{selectedLeague ? (
					<Image
						src={selectedLeague.leagueLogo}
						alt={selectedLeague.shortName}
						className="w-auto h-full object-cover"
						width={0}
						height={0}
						sizes="100%"
					/>
				) : (
					<Image
						src="/placeholder_image.jpg"
						alt="league_logo"
						className="w-auto h-full object-cover"
						width={0}
						height={0}
						sizes="100%"
					/>
				)}
			</Box>

			{selectedLeague ? (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						ml: '15px'
					}}
				>
					<Typography variant="h3" align="center">
						{language === 'ua' ? selectedLeague?.textContent.ua.name : selectedLeague?.textContent.en.name}
					</Typography>
					<Typography
						variant="h4"
						sx={{
							color: 'text.secondary'
						}}
						align="center"
					>
						{language === 'ua' ? selectedLeague?.textContent.ua.country : selectedLeague?.textContent.en.country}
					</Typography>
				</Box>
			) : (
				<Typography variant="h2">no league {leagueName}</Typography>
			)}

			<Box
				sx={{
					m: '10px',
					minWidth: '150px',
					height: '150px'
				}}
			>
				{selectedLeague ? (
					<Image
						src={selectedLeague.countryMapFlag}
						alt={selectedLeague.shortName}
						className="w-auto h-full object-cover"
						width={0}
						height={0}
						sizes="100%"
					/>
				) : (
					<Image
						src="/placeholder_image.jpg"
						alt="country_logo"
						className="w-auto h-full object-cover"
						width={0}
						height={0}
						sizes="100%"
					/>
				)}
			</Box>
		</Box>
	)
}
