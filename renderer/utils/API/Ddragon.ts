let championByIdCache = {}
let championJson = {}

export const getChampionByKey = async (key: number, language: string) => {
	// Setup cache
	if (!championByIdCache[language]) {
		let json = await getLatestChampionDDragon(language)

		championByIdCache[language] = {}
		for (let championName in json.data) {
			if (!json.data.hasOwnProperty(championName)) {
				continue
			}

			const champInfo = json.data[championName]
			championByIdCache[language][champInfo.key] = champInfo
		}
	}

	return championByIdCache[language][key]
}

export const getLatestChampionDDragon = async (language: string) => {
	if (championJson[language]) {
		return championJson[language]
	}

	let response
	let versionIndex = 0
	while (!response?.ok) {
		const version = (
			await fetch(
				'http://ddragon.leagueoflegends.com/api/versions.json'
			).then(async (r) => await r.json())
		)[versionIndex++]

		response = await fetch(
			`https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`
		)
	}

	championJson[language] = await response.json()
	return championJson[language]
}
