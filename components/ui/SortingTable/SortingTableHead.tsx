import TableHead from '@mui/material/TableHead'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

export default function SortingTableHead({
	order,
	orderBy,
	onRequestSort,
	headCells
}: {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof PlayerLeadersTableData
	) => void
	order: TableSortOrder
	orderBy: string
	headCells: SortingTableHeadCell[]
}) {
	const createSortHandler =
		(property: keyof PlayerLeadersTableData) =>
		(event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property)
		}

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{
							fontWeight: 700
						}}
					>
						{headCell.isSortable ? (
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
							</TableSortLabel>
						) : (
							headCell.label
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}
