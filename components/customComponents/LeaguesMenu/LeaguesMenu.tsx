'use client'

import { useState, useContext } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { Box, Button, Chip, Menu, MenuItem } from '@mui/material'

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import CircleIcon from '@mui/icons-material/Circle'

import Link from 'next/link'

import { LanguageContext } from '@/context/LanguageContext'
import { CustomThemeContext } from '@/context/CustomThemeContext'

import { menuItemsConfigs } from '@/configs/leaguesMenu'

const stylesChip = {
	fontSize: {
		xs: '10px',
		sm: '14px',
		md: '16px'
	},
	px: '3px',
	mx: '6px'
}

export default function LeaguesMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const { leagueName } = useParams()
	const pathname = usePathname()
	const selectedPath = pathname.split('/')
	const { language } = useContext(LanguageContext)
	const { theme } = useContext(CustomThemeContext)

	const handleMenuItemClick = () => {
		setAnchorEl(null)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const selectedMenuItem = menuItemsConfigs.find(menuItem => menuItem.path === selectedPath[3])

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				mb: '30px'
			}}
		>
			{/* mobile version */}
			<Box
				sx={{
					display: {
						xs: 'block',
						sm: 'none'
					}
				}}
			>
				{selectedMenuItem && (
					<>
						<Button
							variant="contained"
							onClick={handleClickListItem}
							sx={{
								width: '210px',
								display: 'flex',
								pr: '8px',
								justifyContent: 'space-between'
							}}
						>
							{language === 'ua' ? selectedMenuItem.itemText.ua : selectedMenuItem.itemText.en}
							{!open ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
						</Button>

						<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
							{menuItemsConfigs.map(menuItem => (
								<Link key={menuItem.path} href={`/tournaments/${leagueName}/${menuItem.path}`}>
									<MenuItem
										onClick={handleMenuItemClick}
										sx={{
											width: '210px',
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											color: selectedPath[3] === menuItem.path ? theme.palette.primary.main : theme.palette.text.primary
										}}
										selected={selectedPath[3] === menuItem.path}
									>
										{language === 'ua' ? menuItem.itemText.ua : menuItem.itemText.en}
										{selectedPath[3] === menuItem.path && (
											<CircleIcon
												sx={{
													width: '12px'
												}}
											/>
										)}
									</MenuItem>
								</Link>
							))}
						</Menu>
					</>
				)}
			</Box>

			{/* tablet and desktop version */}
			<Box
				sx={{
					display: {
						xs: 'none',
						sm: 'flex'
					},
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				{menuItemsConfigs.map(menuItem => (
					<Link key={menuItem.path} href={`/tournaments/${leagueName}/${menuItem.path}`}>
						<Chip
							label={language === 'ua' ? menuItem.itemText.ua : menuItem.itemText.en}
							clickable
							variant={selectedPath[3] === menuItem.path ? 'filled' : 'outlined'}
							sx={stylesChip}
							color="primary"
						/>
					</Link>
				))}
			</Box>
		</Box>
	)
}
