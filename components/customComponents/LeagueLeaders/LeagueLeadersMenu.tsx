import Image from 'next/image'

import { Tabs, Tab } from '@mui/material'

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
  onTabChange: (e: React.SyntheticEvent, newValue: number)=>void
}) {
	return (
		<Tabs value={tabValue} onChange={onTabChange} centered>
			<Tab
				icon={<Image src={ScorerLogo} alt="top-scorers" width={50} height={50} />}
				label={language === 'en' ? 'Top scorers' : 'Бомбардири'}
			/>
			<Tab
				icon={
					<Image src={AssistantLogo} alt="top-assistants" width={50} height={50} />
				}
				label={language === 'en' ? 'Top assistants' : 'Асистенти'}
			/>
			<Tab
				icon={
					<Image
						src={YellowCardLogo}
						alt="top-yellow-cards"
						width={50}
						height={50}
					/>
				}
				label={language === 'en' ? 'Yellow cards' : 'Жовті картки'}
			/>
			<Tab
				icon={<Image src={RedCardLogo} alt="top-red-cards" width={50} height={50} />}
				label={language === 'en' ? 'Red cards' : 'Червоні картки'}
			/>
		</Tabs>
	)
}
