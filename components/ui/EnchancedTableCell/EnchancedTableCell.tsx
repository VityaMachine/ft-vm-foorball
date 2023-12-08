'use client'

import { useContext } from 'react'
import { Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import { LanguageContext } from '@/context/LanguageContext'

const TooltipTitleComponent = ({
	finishedMatches,
	sortType,
	toolTipvalue
}: {
	finishedMatches: ITeamFixturesConverted[]
	sortType: 'W' | 'D' | 'L' | 'all'
	toolTipvalue: keyof ITeamBasicFixtureData
}) => {
	const { language } = useContext(LanguageContext)

	const resultArray = sortType === 'all' ? finishedMatches : finishedMatches.filter(item => item.result === sortType)

	return (
		<>
			{resultArray.length > 0 ? (
				<Table>
					<TableBody>
						{resultArray.map(item => (
							<TableRow key={item.fixtureId}>
								<TableCell padding="none" sx={{ color: '#fff', py: '2px' }}>
									({item.isHomeGame ? 'H' : 'A'}) {item.opponentTeamName}
								</TableCell>
								<TableCell padding="none" sx={{ color: '#fff', pl: '10px' }}>
									{item[toolTipvalue]}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<Typography>{language === 'ua' ? 'Відсутні дані про нічиї' : 'No draw matches data'}</Typography>
			)}
		</>
	)
}

export default function EnchancedTableCell({
	team,
	field,
	toolTipvalue
}: {
	team: ITeamResultsFromFixtures
	field: keyof ITeamCalculatedResults
	toolTipvalue: keyof ITeamBasicFixtureData
}) {


	const finishedMatches = team.fixtures.filter(item => item.status === 'FT')

	return (
		<Tooltip
			placement="left-start"
			PopperProps={{
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, -10]
						}
					}
				]
			}}
			title={
				field !== 'win' && field !== 'draw' && field !== 'lose' ? (
					<TooltipTitleComponent toolTipvalue={toolTipvalue} sortType="all" finishedMatches={finishedMatches} />
				) : field === 'win' ? (
					<TooltipTitleComponent toolTipvalue={toolTipvalue} sortType="W" finishedMatches={finishedMatches} />
				) : field === 'draw' ? (
					<TooltipTitleComponent toolTipvalue={toolTipvalue} sortType="D" finishedMatches={finishedMatches} />
				) : field === 'lose' ? (
					<TooltipTitleComponent toolTipvalue={toolTipvalue} sortType="L" finishedMatches={finishedMatches} />
				) : (
					null
				)
			}
		>
			<TableCell>{team.results[field]}</TableCell>
		</Tooltip>
	)
}

