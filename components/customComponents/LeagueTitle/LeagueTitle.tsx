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
					m: '10px',
					minWidth: '150px',
					height: {
						md: '150px',
						sm: '100px',
						xs: '70px'
					},
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				{selectedLeague ? (
					<>
						<Image
							src={selectedLeague.leagueLogo}
							alt={selectedLeague.shortName}
							className="w-auto h-full object-cover"
							width={0}
							height={0}
							sizes="100%"
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								ml: '15px'
							}}
						>
							<Typography variant="h3" align="center" sx={{
								fontSize: {
									lg: '48px',
									md: '40px',
									sm: '36px',
									xs: "24px"
								}
							}}>
								{language === 'ua' ? selectedLeague?.textContent.ua.name : selectedLeague?.textContent.en.name}
							</Typography>
							<Typography
								variant="h4"
								sx={{
									color: 'text.secondary',
									fontSize: {
										xs: '20px',
										sm: '34px'
									}
								}}
								align="center"
							>
								{language === 'ua' ? selectedLeague?.textContent.ua.country : selectedLeague?.textContent.en.country}
							</Typography>
						</Box>
						<Image
							src={selectedLeague.countryMapFlag}
							alt={selectedLeague.shortName}
							className="w-auto h-full object-cover"
							width={0}
							height={0}
							sizes="100%"
						/>
					</>
				) : (
					<>
						<Image
							src="/placeholder_image.jpg"
							alt="league_logo"
							className="w-auto h-full object-cover"
							width={0}
							height={0}
							sizes="100%"
						/>

						<Typography variant="h2">no league {leagueName}</Typography>
						<Image
							src="/placeholder_image.jpg"
							alt="country_logo"
							className="w-auto h-full object-cover"
							width={0}
							height={0}
							sizes="100%"
						/>
					</>
				)}
			</Box>


		
	)
}
