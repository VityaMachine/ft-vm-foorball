'use client'

import { createContext, useReducer } from 'react'

const initialState: FixturesApiStateType = {
	data: [],
	status: 'idle',
	error: null
}

export const FixturesApiContext = createContext<{ state: FixturesApiStateType; dispatch: React.Dispatch<any> }>({
	state: initialState,
	dispatch: () => null
})

const reducer = (
	state: FixturesApiStateType,
	{
		type,
		payload
	}: {
		type: 'data' | 'status' | 'error'
		payload: {
			data: IFixtureData[]
			status: ApiStatusType
			error: string | null
		}
	}
): FixturesApiStateType => {
	switch (type) {
		case 'data':
			return {
				...state,
				data: payload.data
			}
			break
		case 'status':
			return {
				...state,
				status: payload.status
			}
			break
		case 'error':
			return {
				...state,
				error: payload.error
			}
	}
}

export default function FixturesApiProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <FixturesApiContext.Provider value={{ state, dispatch }}>{children}</FixturesApiContext.Provider>
}
