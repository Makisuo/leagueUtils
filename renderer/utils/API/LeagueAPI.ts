import { MasteryOfChampion, Summoner } from '../../types/BackendTypes'

const backendUrl = 'https://league-utils-backend.herokuapp.com'

export const getCurrentVersion = async () => {
	const respond = await fetch(
		`https://ddragon.leagueoflegends.com/api/versions.json`
	)
	const result = await respond.json()
	// Gets the 2nd to latest patch bcs they dont update like instantly because they are pepegas TODO: MAKE THIS MORE RELIABLE SOMEHOW
	return result[1]
}

export const getSummoner = async (name: string): Promise<Summoner> => {
	const response = await fetch(`${backendUrl}/summoner/by-name/${name}`)
	const result = await response.json()
	return result
}

export const doesSummonerExist = async (name: string): Promise<boolean> => {
	const response = await fetch(`${backendUrl}/summoner/by-name/${name}`)
	if (response.status === 404) {
		return false
	}
	return true
}

export const getMasteryData = async (
	name: string
): Promise<Array<MasteryOfChampion>> => {
	const respond = await fetch(`${backendUrl}/mastery/by-name/${name}`)
	const result = await respond.json()
	return result
}

export const getMasteryDataOfChampion = async (
	username: string,
	champion: string
): Promise<MasteryOfChampion> => {
	const respond = await fetch(
		`${backendUrl}/mastery/by-champ/${champion}/by-name/${username}`
	)
	const result = await respond.json()
	return result
}

export const getLowestChampionMastery = async (
	name
): Promise<MasteryOfChampion> => {
	const respond = await fetch(`${backendUrl}/mastery/lowest/by-name/${name}`)
	const result = await respond.json()
	return result
}

export const getNextChampionLevelUp = async (
	name
): Promise<MasteryOfChampion> => {
	const respond = await fetch(`${backendUrl}/mastery/next/by-name/${name}`)
	const result = await respond.json()
	return result
}

//Frontendrequest
export const getChampionById = async (id) => {
	const version = await getCurrentVersion()
	const response = await fetch(
		`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
	)
	const { data } = await response.json()
	for (let i in data) {
		if (parseInt(data[i].key) === id) {
			return data[i]
		}
	}
}

export const getChampionByName = async (name) => {
	const version = await getCurrentVersion()
	const response = await fetch(
		`https://cdn.communitydragon.org/${version}/champion/${name}/data`
	)
	const result = await response.json()
	console.log(result)

	return result
}

export const getChampionIdByName = async (name) => {
	const version = await getCurrentVersion()
	const response = await fetch(
		`https://cdn.communitydragon.org/${version}/champion/${name}/data`
	)
	const data = await response.json()
	return data.id
}

export const getAllChampions = async () => {
	const version = await getCurrentVersion()
	const reponse = await fetch(
		`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
	)
	const result = await reponse.json()
	return result.data
}

export const getRandomChampion = async () => {
	const version = await getCurrentVersion()
	const reponse = await fetch(
		`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
	)
	const { data } = await reponse.json()
	return data[
		Object.keys(data)[
			Math.floor(Math.random() * Math.floor(Object.keys(data).length))
		]
	]
}
