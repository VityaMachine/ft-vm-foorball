'use client'

import { descendingComparator } from '@/utils/sortingTableUtils'

import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import SortingTableHead from '@/components/ui/SortingTable/SortingTableHead'

function createData(
	id: number,
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
): {
	id: number
	calories: number
	carbs: number
	fat: number
	name: string
	protein: number
} {
	return {
		id,
		name,
		calories,
		fat,
		carbs,
		protein
	}
}

const rows = [
	createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
	createData(2, 'Donut', 452, 25.0, 51, 4.9),
	createData(3, 'Eclair', 262, 16.0, 24, 6.0),
	createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
	createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
	createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
	createData(9, 'KitKat', 518, 26.0, 65, 7.0),
	createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
	createData(11, 'Marshmallow', 318, 0, 81, 2.0),
	createData(12, 'Nougat', 360, 19.0, 9, 37.0),
	createData(13, 'Oreo', 437, 18.0, 63, 4.0)
]


const headCells = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Dessert (100g serving)',
		isSortable: false
	},
	{
		id: 'calories',
		numeric: true,
		disablePadding: false,
		label: 'Calories',
		isSortable: true
	},
	{
		id: 'fat',
		numeric: true,
		disablePadding: false,
		label: 'Fat (g)',
		isSortable: true
	},
	{
		id: 'carbs',
		numeric: true,
		disablePadding: false,
		label: 'Carbs (g)',
		isSortable: true
	},
	{
		id: 'protein',
		numeric: true,
		disablePadding: false,
		label: 'Protein (g)',
		isSortable: true
	}
] as SortingTableHeadCell[]
 


function getComparator<Key extends keyof any>(
	order: TableSortOrder,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

// export default function EnhancedTable() {
// 	const [order, setOrder] = React.useState<TableSortOrder>('asc')
// 	const [orderBy, setOrderBy] = React.useState<keyof Data>('name')

// 	const handleRequestSort = (
// 		event: React.MouseEvent<unknown>,
// 		property: keyof Data
// 	) => {
// 		const isAsc = orderBy === property && order === 'asc'
// 		setOrder(isAsc ? 'desc' : 'asc')
// 		setOrderBy(property)
// 	}

// 	const sortedRows = React.useMemo(
// 		() => stableSort(rows, getComparator(order, orderBy)),
// 		[order, orderBy]
// 	)

// 	return (
// 		<Box sx={{ width: '100%' }}>
// 			<Paper sx={{ width: '100%', mb: 2 }}>
// 				<TableContainer>
// 					<Table sx={{ minWidth: 625 }} size="small">
// 						{/* <SortingTableHead
// 							order={order}
// 							orderBy={orderBy}
// 							onRequestSort={handleRequestSort}
// 							headCells={headCells}
// 						/> */}
// 						<TableBody>
// 							{sortedRows.map((row, index) => {
// 								return (
// 									<TableRow hover key={row.id}>
// 										<TableCell padding="none">{row.name}</TableCell>
// 										<TableCell align="right">{row.calories}</TableCell>
// 										<TableCell align="right">{row.fat}</TableCell>
// 										<TableCell align="right">{row.carbs}</TableCell>
// 										<TableCell align="right">{row.protein}</TableCell>
// 									</TableRow>
// 								)
// 							})}
// 						</TableBody>
// 					</Table>
// 				</TableContainer>
// 			</Paper>
// 		</Box>
// 	)
// }
