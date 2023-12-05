'use client'
import { createTheme } from '@mui/material/styles'

import React, { createContext, useEffect, useState } from 'react'

import ThemeRegistry from '@/themes/ThemeRegistry'

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: true
		sm: true
		md: true
		lg: true
		xl: true
		mobile: false
		tablet: false
		laptop: false
		desktop: false
	}
}

export const CustomThemeContext = createContext<ThemeContext>({
	isDarkMode: false,
	toggleMode: () => {},
	modeHandler: (mode: 'dark' | 'light') => {},
	theme: {}
})

export default function CustomThemeProvider({ children }: { children: React.ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

	const themeValue = isDarkMode ? 'dark' : 'light'

	const theme = createTheme({
		palette: {
			mode: themeValue
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1536
			}
		}
	})

	useEffect(() => {
		const savedMode = localStorage.getItem('vm-football-darkmode')

		if (!savedMode) {
			return
		}

		setIsDarkMode(JSON.parse(savedMode))
	}, [])

	const toggleMode = () => {
		setIsDarkMode(isDarkMode => {
			localStorage.setItem('vm-football-darkmode', JSON.stringify(!isDarkMode))
			return !isDarkMode
		})
	}

	const modeHandler = (mode: 'dark' | 'light') => {
		if (mode === 'dark') {
			setIsDarkMode(true)
			localStorage.setItem('vm-football-darkmode', JSON.stringify(true))
		}

		if (mode === 'light') {
			setIsDarkMode(false)
			localStorage.setItem('vm-football-darkmode', JSON.stringify(false))
		}
	}

	const providerValue = { isDarkMode, toggleMode, modeHandler, theme }

	return (
		<CustomThemeContext.Provider value={providerValue}>
			<ThemeRegistry theme={theme} options={{ key: 'mui' }}>
				{children}
			</ThemeRegistry>
		</CustomThemeContext.Provider>
	)
}
