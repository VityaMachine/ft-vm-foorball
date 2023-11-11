'use client'

import { useContext } from 'react'

import { MobileSideMenuContext } from '@/context/MobileSideMenuContext'
import { LanguageContext } from '@/context/LanguageContext'
import { CustomThemeContext } from '@/context/CustomThemeContext'


import { Box, Container, Divider, Drawer, IconButton, Typography } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import textContentData from './textContentData.json'
import Search from '@/components/HeaderFooterComponents/HeaderComponents/Search/Search'
import LeaguesList from '../LeaguesList/LeaguesList'

export default function MobileSideMenu() {
	const { open, toggleOpen } = useContext(MobileSideMenuContext)
	const { language } = useContext(LanguageContext)
	const { isDarkMode } = useContext(CustomThemeContext)

	return (
		<Drawer
			open={open}
			onClose={toggleOpen}
			sx={{
				display: {
					xs: 'block',
					md: 'none'
				},
				scrollbarWidth: 0
			}}
		>
			<Box
				sx={{
					width: {
						xs: '255px',
						sm: '270px'
					}
				}}
			>
				{/* Title */}

				<Box
					sx={{
						position: 'sticky',
						top: 0,
						zIndex: 999,
				
					}}
				>
					{/* header */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: {
								xs: '56px',
								sm: '90px'
							},
							bgcolor: '#0F1924'
						}}
					>
						<Container
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<Typography variant="h5" color="#fff">
								{language === 'ua' ? textContentData.ua.title : textContentData.en.title}
							</Typography>

							<IconButton onClick={toggleOpen}>
								<HighlightOffIcon
									fontSize="large"
									sx={{
										fill: '#fff'
									}}
								/>
							</IconButton>
						</Container>
					</Box>

					{/* search */}
					<Box sx={{
						py: '10px',
						background: isDarkMode ? "#353535" : "#fff"
					}}>
						<Container
							disableGutters
							sx={{
								px: '10px',
								position: 'sticky',
								top: {
									xs: '56px',
									sm: '90px'
								}
							}}
						>
							<Search />
						</Container>
					</Box>


				<Divider />		
				</Box>
	

				{/* menu */}
				<Box
					sx={{
						mt: '15px',
						position: 'relative'
					}}
				>
					<LeaguesList />
				</Box>
			</Box>
		</Drawer>
	)
}
