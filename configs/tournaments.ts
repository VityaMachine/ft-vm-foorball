export const tournamentsConfigs = {
	leagues: [
		{
			id: 39,
			shortName: 'epl' as const,
			leagueLogo: '/leagues_logos/epl.png',
			countryLogo: '/rounded_countries_flags/england.png',
			countryMapFlag: '/map_flag/england.png',
			placesData: {
				uefaChampLeagueGS: [1,2,3,4],
				uefaChampLeagueQ: [],
				uefaEuropaLeagueGS: [5],
				uefaEuropaLeagueQ: [],
				uefaConfLeagueGS: [],
				uefaConfLeagueQ: [],
				relegationPlayOff: [],
				relegationLeague: [18, 19, 20]
			},
			textContent: {
				ua: {
					name: "Прем'єр ліга",
					country: 'Англія'
				},
				en: {
					name: 'Premier League',
					country: 'England'
				}
			}
		},
		{
			id: 140,
			shortName: 'laliga' as const,
			leagueLogo: '/leagues_logos/laliga.png',
			countryLogo: '/rounded_countries_flags/spain.png',
			countryMapFlag: '/map_flag/spain.png',
			placesData: {
				uefaChampLeagueGS: [1,2,3,4],
				uefaChampLeagueQ: [],
				uefaEuropaLeagueGS: [5],
				uefaEuropaLeagueQ: [],
				uefaConfLeagueGS: [],
				uefaConfLeagueQ: [6],
				relegationPlayOff: [],
				relegationLeague: [18, 19, 20]
			},
			textContent: {
				ua: {
					name: 'Ла Ліга',
					country: 'Іспанія'
				},
				en: {
					name: 'La Liga',
					country: 'Spain'
				}
			}
		},
		{
			id: 135,
			shortName: 'seriea' as const,
			leagueLogo: '/leagues_logos/serie_a.png',
			countryLogo: '/rounded_countries_flags/italy.png',
			countryMapFlag: '/map_flag/italy.png',
			placesData: {
				uefaChampLeagueGS: [1,2,3,4],
				uefaChampLeagueQ: [],
				uefaEuropaLeagueGS: [5],
				uefaEuropaLeagueQ: [],
				uefaConfLeagueGS: [],
				uefaConfLeagueQ: [6],
				relegationPlayOff: [],
				relegationLeague: [18, 19, 20]
			},
			textContent: {
				ua: {
					name: 'Серія А',
					country: 'Італія'
				},
				en: {
					name: 'Serie A',
					country: 'Italy'
				}
			}
		},
		{
			id: 78,
			shortName: 'bundesliga' as const,
			leagueLogo: '/leagues_logos/bundes.png',
			countryLogo: '/rounded_countries_flags/germany.png',
			countryMapFlag: '/map_flag/germany.png',
			placesData: {
				uefaChampLeagueGS: [1,2,3,4],
				uefaChampLeagueQ: [],
				uefaEuropaLeagueGS: [5],
				uefaEuropaLeagueQ: [],
				uefaConfLeagueGS: [],
				uefaConfLeagueQ: [6],
				relegationPlayOff: [16],
				relegationLeague: [17, 18]
			},
			textContent: {
				ua: {
					name: 'Бундесліга',
					country: 'Німеччина'
				},
				en: {
					name: 'Bundesliga',
					country: 'Germany'
				}
			}
		},
		{
			id: 61,
			shortName: 'ligue1' as const,
			leagueLogo: '/leagues_logos/Ligue1.png',
			countryLogo: '/rounded_countries_flags/france.png',
			countryMapFlag: '/map_flag/france.png',
			placesData: {
				uefaChampLeagueGS: [1,2,3],
				uefaChampLeagueQ: [4],
				uefaEuropaLeagueGS: [5],
				uefaEuropaLeagueQ: [],
				uefaConfLeagueGS: [],
				uefaConfLeagueQ: [6],
				relegationPlayOff: [16],
				relegationLeague: [17, 18]
			},
			textContent: {
				ua: {
					name: 'Ліга 1',
					country: 'Франція'
				},
				en: {
					name: 'Ligue 1',
					country: 'France'
				}
			}
		},
		{
			id: 333,
			shortName: 'upl',
			leagueLogo: '/leagues_logos/upl.png',
			countryLogo: '/rounded_countries_flags/ukraine.png',
			countryMapFlag: '/map_flag/ukraine.png',
			placesData: {
				uefaChampLeagueGS: [],
				uefaChampLeagueQ: [1, 2],
				uefaEuropaLeagueGS: [],
				uefaEuropaLeagueQ: [],
				uefaConfLeagueGS: [],
				uefaConfLeagueQ: [3,4],
				relegationPlayOff: [13,14],
				relegationLeague: [15, 16]
			},
			textContent: {
				ua: {
					name: "Прем'єр ліга",
					country: 'Україна'
				},
				en: {
					name: 'Premier League',
					country: 'Ukraine'
				}
			}
		}
	]
}
