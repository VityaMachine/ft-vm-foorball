import React from 'react'

export default function LeaguePage({ params: { leagueName } }: { params: { leagueName: string } }) {
	return <div>LeaguePage - {leagueName}</div>
}
