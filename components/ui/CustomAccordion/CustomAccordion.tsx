import React, { useState, useContext } from 'react'

import { Box, Collapse, IconButton, SxProps, Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

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

	const theme = useTheme()

	return (
		<Box
			sx={{
				width: '100%',
				border: `1px solid ${theme.palette.divider}`,
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
						border: `1px solid ${theme.palette.divider}`,
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
