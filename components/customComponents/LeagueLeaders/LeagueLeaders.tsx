import { useState, useContext } from 'react'

import Image from 'next/image'

import { Box } from '@mui/material'
import LeagueLeadersMenu from './LeagueLeadersMenu'
import LeagueLeadersTable from './LeagueLeadersTable'

import { LanguageContext } from '@/context/LanguageContext'

function TabPanel({
	children,
	index,
	value
}: {
	children?: React.ReactNode
	index: number
	value: number
}) {
	return (
		<Box sx={{ py: 2 }} hidden={value !== index}>
			{value === index && children}
		</Box>
	)
}

export default function LeagueLeaders() {
	const [tabValue, setTabValue] = useState(0)
	const { language } = useContext(LanguageContext)

	const handleChangeTab = (e: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
	}

	return (
		<Box
			sx={{
				mt: '20px'
			}}
		>
			<LeagueLeadersMenu
				tabValue={tabValue}
				language={language}
				onTabChange={handleChangeTab}
			/>

			<TabPanel value={tabValue} index={0}>
				<LeagueLeadersTable statType="goals" />
			</TabPanel>
			<TabPanel value={tabValue} index={1}>
				<LeagueLeadersTable statType="assists" />
			</TabPanel>
			<TabPanel value={tabValue} index={2}>
				<LeagueLeadersTable statType="ycards" />
			</TabPanel>
			<TabPanel value={tabValue} index={3}>
				<LeagueLeadersTable statType="rcards" />
			</TabPanel>
		</Box>
	)
}
