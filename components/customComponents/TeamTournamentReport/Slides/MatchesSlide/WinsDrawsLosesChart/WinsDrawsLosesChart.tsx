import { Box, Typography, useTheme } from '@mui/material'
import { Cell, Label, Legend, Pie, PieChart } from 'recharts'
import { tableDataColors } from '@/constants/colors'
import { useContext } from 'react'
import { LanguageContext } from '@/context/LanguageContext'

export default function WinsDrawsLosesChart({
	mathcesData,
	side
}: {
	mathcesData: ITeamFixturesGeneralData
	side: 'total' | 'home' | 'away'
}) {
	const theme = useTheme()
	const { language } = useContext(LanguageContext)

	const totalMatchesArr = [
		{
			nameEn: 'Wins',
			nameUa: 'Виграші',
			value: mathcesData.wins[side],
			color: tableDataColors.colorWin
		},
		{
			nameEn: 'Draws',
			nameUa: 'Нічиї',
			value: mathcesData.draws[side],
			color: tableDataColors.colorDraw
		},
		{
			nameEn: 'Loses',
			nameUa: 'Поразки',
			value: mathcesData.loses[side],
			color: tableDataColors.colorLose
		}
	]

	const renderColorfulLegendText = (value: string) => {
		return <span style={{ color: theme.palette.text.primary }}>{value}</span>
	}

	const RADIAN = Math.PI / 180
	const renderCustomizedLabel = (props: any) => {
		const { cx, cy, midAngle, innerRadius, outerRadius, percent, value, name, index } = props

		const radius = innerRadius + (outerRadius - innerRadius) * 1.23
		const x = cx + radius * Math.cos(-midAngle * RADIAN)
		const y = cy + radius * Math.sin(-midAngle * RADIAN)

		return (
			<text x={x - 15} y={y} fill={theme.palette.text.primary} dominantBaseline="central">
				{value > 0 ? `${(percent * 100).toFixed(0)}%` : ''}
			</text>
		)
	}

	return (
		<Box>


			<Typography variant='h5'>
				{language === 'ua' ? side === 'home' ? "Дома" : side === 'away' ? "В гостях" : "Всього" : side === 'home' ? "Home" : side === 'away' ? "Away" : "Total"}
			</Typography>

			<PieChart width={270} height={250}>
				<Pie
					cx={'45%'}
					data={totalMatchesArr}
					dataKey="value"
					nameKey={language === 'ua' ? 'nameUa' : 'nameEn'}
					outerRadius="75%"
					label={renderCustomizedLabel}
					labelLine={false}
				>
					{totalMatchesArr.map(item => (
						<Cell key={item.nameEn} fill={item.color} />
					))}
				</Pie>
				<Legend iconType="circle" formatter={renderColorfulLegendText} />
			</PieChart>

			<Box
				sx={{
					pl: '28px',
					mt: '8px'
				}}
			>
				<Typography
					sx={{
						fontWeight: 700
					}}
				>
					{language === 'ua' ? 'Зіграно' : 'Played'}
					{': '}
					{mathcesData.played[side]}
				</Typography>
				<Typography>
					{language === 'ua' ? 'Виграші' : 'Wins'}
					{': '}
					{mathcesData.wins[side]}
				</Typography>
				<Typography>
					{language === 'ua' ? 'Нічиї' : 'Draws'}
					{': '}
					{mathcesData.draws[side]}
				</Typography>
				<Typography>
					{language === 'ua' ? 'Поразки' : 'Loses'}
					{': '}
					{mathcesData.loses[side]}
				</Typography>
			</Box>
		</Box>
	)
}
