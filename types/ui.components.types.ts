interface SortingTableHeadCell {
	disablePadding: boolean
	id: keyof PlayerLeadersTableData
	label: string
	numeric: boolean
	isSortable: boolean
}
