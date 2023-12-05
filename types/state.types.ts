type ApiStatusType = 'idle' | 'pending' | 'resolved' | 'rejected'

type FixturesApiStateType = {
	data: IFixtureData[]
	status: ApiStatusType
	error: string | IFixtureData[] | null
}
