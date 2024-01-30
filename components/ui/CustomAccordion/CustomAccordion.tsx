import React, { useState, useContext } from 'react'

import {
	Box,
	Collapse,
	Divider,
	IconButton,
	SxProps,
	Theme,
	Typography
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { CustomThemeContext } from '@/context/CustomThemeContext'

export default function CustomAccordion({
	children,
	headerText,
	defaultOpen = false,
	sx
}: {
	children: React.ReactNode
	headerText: React.ReactNode
	defaultOpen?: boolean
	sx?: SxProps<Theme>
}) {
	const [open, setOpen] = useState<boolean>(defaultOpen)

	const { isDarkMode } = useContext(CustomThemeContext)

	return (
		<Box
			sx={{
				width: '100%',
				border: `1px solid ${isDarkMode ? '#525252' : '#c4c4c4'}`,
				borderRadius: '4px',
				px: '16px',
				...sx
			}}
		>
			{/* header */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				{headerText}
				<IconButton
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						border: `1px solid ${isDarkMode ? '#525252' : '#c4c4c4'}`,
						width: '24px',
						height: '24px',
						my: '4px'
					}}
					onClick={() => setOpen(oldOpen => !oldOpen)}
				>
					<KeyboardArrowUpIcon
						fontSize="small"
						sx={{
							transform: open ? 'rotate(0deg)' : 'rotate(180deg)'
						}}
					/>
				</IconButton>
			</Box>

			{/* content */}
			<div>
				<Collapse in={open}>
					<Box>{children}</Box>
				</Collapse>
			</div>
		</Box>
	)
}
