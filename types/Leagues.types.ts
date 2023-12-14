interface ILeagueConfig {
    
        id: number
        shortName: string,
        leagueLogo: string
        countryLogo: string
        countryMapFlag: string
        placesData: {
            uefaChampLeagueGS: number[],
            uefaChampLeagueQ: number[],
            uefaEuropaLeagueGS: number[],
            uefaEuropaLeagueQ: number[],
            uefaConfLeagueGS: number[],
            uefaConfLeagueQ: number[],
            relegationPlayOff: number[],
            relegationLeague: number[]
        },
        textContent: {
            ua: {
                name: string
                country: string
            },
            en: {
                name: string
                country: string
            }
        }
    
}