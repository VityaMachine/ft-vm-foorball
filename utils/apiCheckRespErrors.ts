export const checkRespErrors = (errors: any, data: any[] | Object) =>
	Array.isArray(errors) && errors.length === 0 && (Array.isArray(data) ? data.length > 0 : typeof data === 'object')
