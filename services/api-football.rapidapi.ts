import axios from 'axios'

import defaultValues from '../constants/api.constants'

export const apiFootball = async ({
	urlPath,
	reqParams,
	currentSeason = true,
	timezone = false
}: {
	urlPath: string
	reqParams?: IApiOptionsCreatorParams
	currentSeason?: boolean
	timezone?: boolean
}): Promise<IApiResponse> => {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': process.env.NEXT_PUBLIC_PI_KEY,
			'X-RapidAPI-Host': process.env.NEXT_PUBLIC_API_HOST
		},
		url: process.env.NEXT_PUBLIC_BASE_API_FOOTBALL_URL + '/' + urlPath,
		params: {
			...reqParams
		}
	}

	if (currentSeason) {
		options.params.season = defaultValues.currentSeason
	}

	if (timezone) {
		options.params.timezone = defaultValues.timezone
	}

	try {
		const response = await axios.request(options)
		// throw new Error('custom error')
		return response.data
	} catch (error: any) {
		return error.message
	}
}
