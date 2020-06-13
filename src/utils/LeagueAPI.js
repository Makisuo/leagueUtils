const backendUrl = 'https://league-utils-backend.herokuapp.com'

export const getCurrentVersion = async () => {
	const respond = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`)
	const result = await respond.json()
	return result[0]
}

export const getSummoner = async (name) => {
	const response = await fetch(`${backendUrl}/summoner/by-name/${name}`)
	const result = await response.json()
	return result
}

export const doesSummonerExist = async (name) => {
	const response = await fetch(`${backendUrl}/summoner/by-name/${name}`)
	if (response.status === 404) {
		return false
	}
	return true
}

export const getMasteryData = async (name) => {
	const respond = await fetch(`${backendUrl}/mastery/by-name/${name}`)
	const result = await respond.json()
	return result
}

export const getLowestChampionMastery = async (name) => {
	const respond = await fetch(`${backendUrl}/mastery/lowest/by-name/${name}`)
	const result = await respond.json()
	return result
}

export const getNextChampionLevelUp = async (name) => {
	const respond = await fetch(`${backendUrl}/mastery/next/by-name/${name}`)
	const result = await respond.json()
	return result
}

//Frontendrequest
export const getChampionById = async (id) => {
	const version = await getCurrentVersion()
	const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
	const { data } = await response.json()
	for (let i in data) {
		if (parseInt(data[i].key) === id) {
			return data[i]
		}
	}
}

export const getAllChampions = async () => {
	const version = await getCurrentVersion()
	const reponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
	const result = await reponse.json()
	return result.data
}

export const getRandomChampion = async () => {
	const version = await getCurrentVersion()
	const reponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
	const { data } = await reponse.json()
	return data[Object.keys(data)[Math.floor(Math.random() * Math.floor(Object.keys(data).length))]]
}
