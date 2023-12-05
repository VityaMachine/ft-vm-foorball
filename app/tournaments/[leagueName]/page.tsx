'use client'

import { useEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'

export default function LeaguePage({ params: { leagueName } }: { params: { leagueName: string } }) {
	const pathname = usePathname()

	useEffect(() => {
		redirect(`${pathname}/table`)
	})

	return <div>Redirecting...</div>
}
