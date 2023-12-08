'use client'

import { useContext } from 'react'

import { Box, Typography } from '@mui/material'

import { LanguageContext } from '@/context/LanguageContext'

export default function LoadingError({ messageUa, messageEn }: { messageUa: string; messageEn: string }) {
	const { language } = useContext(LanguageContext)

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 1
			}}
		>
			<Typography align="center" variant="h4">
				{language === 'ua' ? 'Оуч... Сталась помилка!!!' : 'Whoops... Error!!!'}
			</Typography>
			<Typography align="center" variant="body1">
				{' '}
				{language === 'ua' ? messageUa : messageEn}
			</Typography>
		</Box>
	)
}
