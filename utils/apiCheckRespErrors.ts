export const checkRespErrors = (errors: any, data: any[]) =>
	Array.isArray(errors) && errors.length === 0 && data.length > 0
