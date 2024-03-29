import _ from 'lodash'

export const formatDate = (date: string) => {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear(),
		hours = '' + d.getHours(),
		minutes = '' + d.getMinutes()

	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day
	if (hours.length < 2) hours = '0' + hours
	if (minutes.length < 2) minutes = '0' + minutes

	return [day, month, year].join('/') + `, ${hours}:${minutes}`
}

export const getChampionNameById = (id: number, data: any): string => {
	for (let i = 0; i < data.length; i++) {
		if (parseInt(data[i].key) === id) {
			return data[i].name
		}
	}
}

export const createBasicAuthToken = (username: string, password: string) => {
	return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
}

export const filterArray = (array: [any], column: string, filter) => {
	return _.filter(array, (data) => {
		if (data[column].toLowerCase().includes(filter.toLowerCase())) {
			return data
		}
	})
}
