import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import Search from '../HeaderFooterComponents/HeaderComponents/Search/Search'

import Image from 'next/image'
import logo from '@/images/logo.png'
import Link from 'next/link'

import MobileMenuButton from '../HeaderFooterComponents/HeaderComponents/MobileMenuButton/MobileMenuButton'
import SettingsButton from '../HeaderFooterComponents/HeaderComponents/SettingsMenuButton/SettingsMenuButton'

export default function Header() {
	return (
		<AppBar
			position="sticky"
			sx={{
				bgcolor: '#0F1924',
				height: {
					xs: '64px',
					md: '90px'
				}
			}}
		>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'row'
				}}
			>
				{/* Icon mobile menu   */}
				<Box
					sx={{
						display: {
							xs: 'flex',
							md: 'none'
						},

						// width: '33%',
						width: {
							md: '33%'
						}
					}}
				>
					<MobileMenuButton />
				</Box>

				{/* logo */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						width: {
							md: '33%'
						}
						// width: '33%',
						// minWidth: {
						//   md: "232px",
						// },
					}}
				>
					<Link href="/" className="flex items-center">
						<Box
							sx={{
								height: {
									xs: '64px',
									md: '90px'
								},
								minWidth: '64px',
								display: { xs: 'flex', sm: 'block' }
							}}
						>
							<Image src={logo} alt="logo" className="w-auto h-full object-cover" priority />
						</Box>

						<Typography variant="h6" noWrap component="div">
							VM FOOTBALL
						</Typography>
					</Link>
				</Box>

				{/* search */}
				<Box
					sx={{
						display: {
							xs: 'none',
							md: 'flex'
						},
						alignItems: 'center',
						justifyContent: 'center',
						width: {
							md: '33%'
						}
					}}
				>
					<Search />
				</Box>

				{/* settings btn */}
				<Box
					sx={{
						display: {
							md: 'flex'
						},
						width: {
							md: '33%'
						},
						justifyContent: 'flex-end',
						alignItems: 'center',
						mt: '5px'
					}}
				>
					<SettingsButton />

					{/* <LanguageChanger />
          <ModeSwitcher /> */}
				</Box>
			</Toolbar>
		</AppBar>
	)
}
