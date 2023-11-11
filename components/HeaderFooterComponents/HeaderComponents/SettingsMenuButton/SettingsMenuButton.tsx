'use client'

import { useContext } from 'react'

import { SettingsMenuContext } from '@/context/SettingsMenuContext'
import { LanguageContext } from '@/context/LanguageContext'

import { Box, IconButton, Button } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

import textContentData from './textContentData.json'

export default function SettingsMenuButton() {
	const { toggleSettingsOpen } = useContext(SettingsMenuContext)
	const { language } = useContext(LanguageContext)

	return (
		<Box>
			<IconButton
				sx={{
					display: {
						xs: 'inline-flex',
						md: 'none'
					},
					ml: '12px',
					color: '#fff'
				}}
				onClick={toggleSettingsOpen}
			>
				<SettingsIcon
					sx={{
						fill: '#fff'
					}}
				/>
			</IconButton>

			<Button
				sx={{
					display: {
						xs: 'none',
						md: 'block'
					},
					color: '#fff'
				}}
				onClick={toggleSettingsOpen}
			>
				<SettingsIcon
					sx={{
						fill: '#fff'
					}}
				/>
				{language === 'ua' ? textContentData.ua.btnText : textContentData.en.btnText}
			</Button>
		</Box>
	)
}
