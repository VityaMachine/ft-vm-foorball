'use client'

import React from 'react'

import SettingsMenuProvider from '@/context/SettingsMenuContext'
import MobileSideMenuProvider from '@/context/MobileSideMenuContext'
import CustomThemeProvider from '@/context/CustomThemeContext'
import LanguageProvider from '@/context/LanguageContext'

import FixturesApiProvider from '@/context/Fixtures.api.context'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SettingsMenuProvider>
			<MobileSideMenuProvider>
				<CustomThemeProvider>
					<LanguageProvider>
						<FixturesApiProvider>{children}</FixturesApiProvider>
					</LanguageProvider>
				</CustomThemeProvider>
			</MobileSideMenuProvider>
		</SettingsMenuProvider>
	)
}
