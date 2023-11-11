'use client'

import { useContext } from 'react'
import { LanguageContext } from '@/context/LanguageContext'

import { Avatar, Badge, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'

import Link from 'next/link'

import eplLogo from '@/images/leagues_logos/epl.png'
import laligaLogo from '@/images/leagues_logos/laliga.png'
import serie_aLogo from '@/images/leagues_logos/serie_a.png'
import bundesLogo from '@/images/leagues_logos/bundes.png'
import ligue1Logo from '@/images/leagues_logos/Ligue1.png'
import uplLogo from '@/images/leagues_logos/upl.png'

import englandRoundedFlag from '@/images/rounded_countries_flags/england.png'
import spainRoundedFlag from '@/images/rounded_countries_flags/spain.png'
import italyRoundedFlag from '@/images/rounded_countries_flags/italy.png'
import germanyRoundedFlag from '@/images/rounded_countries_flags/germany.png'
import franceRoundedFlag from '@/images/rounded_countries_flags/france.png'
import ukraineRoundedFlag from '@/images/rounded_countries_flags/ukraine.png'

import customLogo from '@/images/logo.png'

import textContentData from './textContentData.json'

const SmallAvatar = styled(Avatar)(() => ({
	width: 22,
	height: 22
}))

export default function LeaguesList() {
	const { language } = useContext(LanguageContext)

	return (
		<List
			sx={{
				pt: 0
			}}
		>
			{/* Premier League (England) */}
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="eng" src={englandRoundedFlag.src} />}
							>
								<Avatar variant="square" alt="epl" src={eplLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText
							primary={language === 'ua' ? textContentData.ua.epl.title : textContentData.en.epl.title}
							secondary={language === 'ua' ? textContentData.ua.epl.subtitle : textContentData.en.epl.subtitle}
						/>
					</ListItemButton>
				</Link>
			</li>

			{/* LaLiga (Spain) */}
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="spa" src={spainRoundedFlag.src} />}
							>
								<Avatar variant="square" alt="laliga" src={laligaLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText
							primary={language === 'ua' ? textContentData.ua.laliga.title : textContentData.en.laliga.title}
							secondary={language === 'ua' ? textContentData.ua.laliga.subtitle : textContentData.en.laliga.subtitle}
						/>
					</ListItemButton>
				</Link>
			</li>

			{/* Serie A (Italy) */}
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="ita" src={italyRoundedFlag.src} />}
							>
								<Avatar variant="square" alt="serie a" src={serie_aLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText
							primary={language === 'ua' ? textContentData.ua.seriea.title : textContentData.en.seriea.title}
							secondary={language === 'ua' ? textContentData.ua.seriea.subtitle : textContentData.en.seriea.subtitle}
						/>
					</ListItemButton>
				</Link>
			</li>

			{/* Bundesliga (Germany) */}
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="ger" src={germanyRoundedFlag.src} />}
							>
								<Avatar variant="square" alt="bundes" src={bundesLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText
							primary={language === 'ua' ? textContentData.ua.bundes.title : textContentData.en.bundes.title}
							secondary={language === 'ua' ? textContentData.ua.bundes.subtitle : textContentData.en.bundes.subtitle}
						/>
					</ListItemButton>
				</Link>
			</li>

			{/* Ligue 1 (France) */}
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="fra" src={franceRoundedFlag.src} />}
							>
								<Avatar variant="square" alt="ligue 1" src={ligue1Logo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText
							primary={language === 'ua' ? textContentData.ua.ligue1.title : textContentData.en.ligue1.title}
							secondary={language === 'ua' ? textContentData.ua.ligue1.subtitle : textContentData.en.ligue1.subtitle}
						/>
					</ListItemButton>
				</Link>
			</li>

			{/* Premier League (Ukraine) */}
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="upl" src={ukraineRoundedFlag.src} />}
							>
								<Avatar variant="square" alt="upl" src={uplLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText
							primary={language === 'ua' ? textContentData.ua.upl.title : textContentData.en.upl.title}
							secondary={language === 'ua' ? textContentData.ua.upl.subtitle : textContentData.en.upl.subtitle}
						/>
					</ListItemButton>
				</Link>
			</li>

			{/* temp items */}
{/* 				
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="alt" src={customLogo.src} />}
							>
								<Avatar variant="square" alt="epl" src={customLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText primary="Title logo" secondary="Subtitle" />
					</ListItemButton>
				</Link>
			</li>

		
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="alt" src={customLogo.src} />}
							>
								<Avatar variant="square" alt="epl" src={customLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText primary="Title logo" secondary="Subtitle" />
					</ListItemButton>
				</Link>
			</li>

	
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="alt" src={customLogo.src} />}
							>
								<Avatar variant="square" alt="epl" src={customLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText primary="Title logo" secondary="Subtitle" />
					</ListItemButton>
				</Link>
			</li>

			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="alt" src={customLogo.src} />}
							>
								<Avatar variant="square" alt="epl" src={customLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText primary="Title logo" secondary="Subtitle" />
					</ListItemButton>
				</Link>
			</li>

		
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="alt" src={customLogo.src} />}
							>
								<Avatar variant="square" alt="epl" src={customLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText primary="Title logo" secondary="Subtitle" />
					</ListItemButton>
				</Link>
			</li>

		
			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="alt" src={customLogo.src} />}
							>
								<Avatar variant="square" alt="epl" src={customLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText primary="Title logo" secondary="Subtitle" />
					</ListItemButton>
				</Link>
			</li>


			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="alt" src={customLogo.src} />}
							>
								<Avatar variant="square" alt="epl" src={customLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText primary="Title logo" secondary="Subtitle" />
					</ListItemButton>
				</Link>
			</li>

			<li>
				<Link href="/#">
					<ListItemButton divider>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={<SmallAvatar alt="alt" src={customLogo.src} />}
							>
								<Avatar variant="square" alt="epl" src={customLogo.src} />
							</Badge>
						</ListItemAvatar>
						<ListItemText primary="Title logo" secondary="Subtitle" />
					</ListItemButton>
				</Link>
			</li> */}
		</List>
	)
}
