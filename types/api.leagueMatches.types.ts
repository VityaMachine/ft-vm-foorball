type selectedMatchesType =
	| 'all'
	| 'NS'
	| 'online'
	| 'FT'
	| 'today'
	| 'tomorrow'
	| 'week'
	| ''
type selectedSideType = 'all' | 'home' | 'away'

interface IFixturesByRounds {
	roundName: string
	roundMatches: IFixtureConvertedData[]
}
