import { useState, useContext } from 'react'

import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import { styled } from '@mui/material/styles'

import { LanguageContext } from '@/context/LanguageContext'

import { sortLeadersTableHandler, tableRowsConfigCreator } from '@/helpers/leagueLeadersHelpers'
import { basicLeadersTablesConfig } from '@/configs/leagueLeadersTables'
import Image from 'next/image'
import Link from 'next/link'

const StyledHeadBox = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#374551' : '#1565C0'
}))

export default function LeagueLeadersData({
	statInfo,
	data
}: {
	statInfo: LeagueLeadersStatsTypes
	data: PlayerLeadersTableData[]
}) {
	const [orderBy, setOrderBy] = useState<keyof PlayerLeadersTableData>('rank')
	const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')

	const { language } = useContext(LanguageContext)

	const theme = useTheme()
	const mobileResolution = useMediaQuery(theme.breakpoints.down('sm'))
	const desctopResolution = useMediaQuery(theme.breakpoints.up('md'))

	const headRowConfigs = tableRowsConfigCreator(basicLeadersTablesConfig, statInfo)

	const sortDataHandler = (valueId: keyof PlayerLeadersTableData) => {
		if (valueId === orderBy) {
			setOrderDirection(direction => (direction === 'asc' ? 'desc' : 'asc'))
		}

		if (valueId !== orderBy) {
			setOrderBy(valueId)
			setOrderDirection(() => {
				return ['rank', 'minForGoal', 'minForAssist', 'minForYellow', 'minForRed'].includes(valueId) ? 'asc' : 'desc'
			})
		}
	}

	const sortedData = sortLeadersTableHandler(data, orderBy, orderDirection)

	console.log();
	

	return (
		<Box
			sx={{
				maxWidth: '830px',
				// minWidth: '570px',
				margin: '0 auto'
			}}
		>
			{/* data head */}
			<Box>
				{/* row */}
				<StyledHeadBox
					sx={{
						display: 'flex',
						justifyContent: 'space-around',
						fontWeight: 700,
						fontSize: '14px',
						color: '#fff'
					}}
				>
					{headRowConfigs.map(item => (
						<Box
							key={item.id}
							sx={{
								py: '8px',
								// px: '4px',
								display: mobileResolution ? (item.noMobile ? 'none' : 'flex') : 'flex',
								alignItems: 'center',
								justifyContent: item.justifyItems,
								width: `${item.width}px`,
								cursor: 'default'
								// overflow: 'hidden'
							}}
						>
							{desctopResolution ? (
								<Tooltip
									title={<Typography>{language === 'ua' ? item.label.ua : item.label.en}</Typography>}
									placement="top"
									followCursor
								>
									<Typography
										sx={{
											fontWeight: 700,
											fontSize: '14px',
											textUnderlineOffset: '4px',
											textDecoration: {
												xs: 'none',
												md: 'underline'
											},
											':hover': {
												textDecoration: 'none'
											}
										}}
									>
										{language === 'ua' ? item.labelShort.ua : item.labelShort.en}
									</Typography>
								</Tooltip>
							) : language === 'ua' ? (
								item.labelShort.ua
							) : (
								item.labelShort.en
							)}

							{item.isSortable && (
								<IconButton
									size="small"
									sx={{
										mx: '6px',
										bgcolor: orderBy === item.id ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'
									}}
									onClick={() => {
										sortDataHandler(item.id)
									}}
								>
									{orderBy === item.id ? (
										orderDirection === 'asc' ? (
											<KeyboardArrowDownIcon
												sx={{
													width: '12px',
													height: '12px',
													color: '#fff'
												}}
											/>
										) : (
											<KeyboardArrowUp
												sx={{
													width: '12px',
													height: '12px',
													color: '#fff'
												}}
											/>
										)
									) : (
										<KeyboardArrowDownIcon
											sx={{
												width: '12px',
												height: '12px',
												color: '#fff'
											}}
										/>
									)}
								</IconButton>
							)}
						</Box>
					))}
				</StyledHeadBox>
				<Divider />
			</Box>

			{/* data details */}
			<Box
				sx={{
					fontSize: '14px'
				}}
			>
				{sortedData.map(item => (
					<Box key={item.id}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-around',
								height: '30px',
								cursor: 'default',
								':hover': {
									bgcolor: 'rgba(0,0,0,0.2)'
								}
							}}
						>
							{/* rank box */}
							<Box
								sx={{
									width: `${headRowConfigs[0].width}px`,
									textAlign: 'right',
									pr: '24px'
								}}
							>
								{item.rank}
							</Box>

							{/* team */}
							<Box
								sx={{
									width: `${headRowConfigs[1].width}px`,
									textAlign: 'center'
								}}
							>
								<Link href={`/team/${item.teamId}`}>
									<Image
										src={item.teamLogo}
										alt={item.teamName}
										width={24}
										height={24}
										className="w-[24px] h-[24px] object-contain"
									/>
								</Link>
							</Box>

							{/* player */}
							<Box
								sx={{
									width: `${headRowConfigs[2].width}px`
									// ":hover": {
									// 	textDecoration: 'underline'
									// }
								}}
							>
								<Link href={`/player/${item.id}`} className="hover:underline">
									{item.playerName}
								</Link>
							</Box>

							{/* matches */}
							<Box
								sx={{
									width: `${headRowConfigs[3].width}px`,
									textAlign: 'right',
									pr: '24px'
								}}
							>
								{item.gamesPlayed}
							</Box>

							{/* minutes */}
							<Box
								sx={{
									width: `${headRowConfigs[4].width}px`,
									textAlign: 'right',
									pr: '12px'
								}}
							>
								{item.minutesPlayed}
							</Box>

							{/* values */}
							<Box
								sx={{
									width: `${headRowConfigs[5].width}px`,
									textAlign: 'right',
									pr: '24px'
								}}
							>
								{statInfo === 'goals'
									? `${item.goals}${item.penaltiesGoals > 0 ? `(${item.penaltiesGoals})` : ''}`
									: statInfo === 'assists'
									? item.assists
									: statInfo === 'ycards'
									? item.yellowCards
									: statInfo === 'rcards'
									? item.redCards
									: 'Err'}
							</Box>

							{/* values/game */}
							<Box
								sx={{
									width: `${headRowConfigs[6].width}px`,
									textAlign: 'right',
									pr: '34px',
									display: {
										xs: 'none',
										sm: 'block'
									}
								}}
							>
								{statInfo === 'goals'
									? item.goalsPerGame.toFixed(2)
									: statInfo === 'assists'
									? item.assistPerGame.toFixed(2)
									: statInfo === 'ycards'
									? item.yellowPerGame.toFixed(2)
									: statInfo === 'rcards'
									? item.redPerGame.toFixed(2)
									: 'Err'}
							</Box>

							{/* min/value */}
							<Box
								sx={{
									width: `${headRowConfigs[7].width}px`,
									textAlign: 'right',
									pr: '30px',
									display: {
										xs: 'none',
										sm: 'block'
									}
								}}
							>
								{statInfo === 'goals'
									? item.minForGoal.toFixed(0)
									: statInfo === 'assists'
									? item.minForAssist.toFixed(0)
									: statInfo === 'ycards'
									? item.minForYellow.toFixed(0)
									: statInfo === 'rcards'
									? item.minForRed.toFixed(0)
									: 'Err'}
							</Box>
						</Box>
						<Divider />
					</Box>
				))}
			</Box>

			{/* legend */}
			<Box sx={{
				mt: '24px'
			}}>
				{headRowConfigs.filter(item => mobileResolution ? !item.noMobile : true).map(item => (
					<Box key={item.id} sx={{
						display: 'flex'
					}}>
						<Typography sx={{
							fontWeight: 700,
							width: '70px'
						}}>{language === 'ua' ? item.labelShort.ua : item.labelShort.en}</Typography>

						<Typography>
							{" - "}
							{language === 'ua' ? item.label.ua : item.label.en}
						</Typography>
					</Box>
				))}

			</Box>
		</Box>
	)
}
