import Image from 'next/image'

import { Tabs, Tab, Box, ButtonGroup, Button } from '@mui/material'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import ScorerLogo from '@/images/leagueLeadersMenuIcons/top-scorer.svg'
import AssistantLogo from '@/images/leagueLeadersMenuIcons/top-assistant.svg'
import YellowCardLogo from '@/images/leagueLeadersMenuIcons/top-yellow-card.svg'
import RedCardLogo from '@/images/leagueLeadersMenuIcons/top-red-card.svg'

export default function LeagueLeadersMenu({
	tabValue,
	language,
	onTabChange
}: {
	tabValue: number
	language: LangStateType
	onTabChange: (e: React.SyntheticEvent, newValue: number) => void
}) {
	const theme = useTheme()
	const mobileResolution = useMediaQuery(theme.breakpoints.down('sm'))

	return mobileResolution ? (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column'
			}}
		>
			<ButtonGroup size="small">
				<Button
					sx={{
						width: '140px'
					}}
					variant={tabValue === 0 ? 'contained' : 'outlined'}
					onClick={e => onTabChange(e, 0)}
				>
					{language === 'en' ? 'Top scorers' : 'Бомбардири'}
				</Button>
				<Button
					sx={{
						width: '140px'
					}}
					variant={tabValue === 1 ? 'contained' : 'outlined'}
					onClick={e => onTabChange(e, 1)}
				>
					{language === 'en' ? 'Top assistants' : 'Асистенти'}
				</Button>
			</ButtonGroup>
			<ButtonGroup size="small">
				<Button
					sx={{
						width: '140px'
					}}
					variant={tabValue === 2 ? 'contained' : 'outlined'}
					onClick={e => onTabChange(e, 2)}
				>
					{language === 'en' ? 'Yellow cards' : 'Жовті картки'}
				</Button>
				<Button
					sx={{
						width: '140px'
					}}
					variant={tabValue === 3 ? 'contained' : 'outlined'}
					onClick={e => onTabChange(e, 3)}
				>
					{language === 'en' ? 'Red cards' : 'Червоні картки'}
				</Button>
			</ButtonGroup>
		</Box>
	) : (
		<Tabs value={tabValue} onChange={onTabChange} centered>
			<Tab
				icon={<Image src={ScorerLogo} alt="top-scorers" width={50} height={50} />}
				label={language === 'en' ? 'Top scorers' : 'Бомбардири'}
			/>
			<Tab
				icon={<Image src={AssistantLogo} alt="top-assistants" width={50} height={50} />}
				label={language === 'en' ? 'Top assistants' : 'Асистенти'}
			/>
			<Tab
				icon={<Image src={YellowCardLogo} alt="top-yellow-cards" width={50} height={50} />}
				label={language === 'en' ? 'Yellow cards' : 'Жовті картки'}
			/>
			<Tab
				icon={<Image src={RedCardLogo} alt="top-red-cards" width={50} height={50} />}
				label={language === 'en' ? 'Red cards' : 'Червоні картки'}
			/>
		</Tabs>
	)
}
