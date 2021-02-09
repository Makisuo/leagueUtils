import {
	authenticate,
	request,
	LeagueClient,
	Credentials,
} from 'league-connect'

import { getChampionByKey } from './Ddragon'
import https from 'https'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

class LCU {
	credentials: Credentials
	client: LeagueClient
	connected = false
	authToken: string
	async connect() {
		this.credentials = await authenticate({
			awaitConnection: true,
			pollInterval: 2000,
		})
		this.authToken = `Basic ${Buffer.from(
			`riot:${this.credentials.password}`
		).toString('base64')}`

		this.client = new LeagueClient(this.credentials)

		this.client.on('connect', async (newCredentials) => {
			this.connected = true
			this.authToken = `Basic ${Buffer.from(
				`riot:${newCredentials.password}`
			).toString('base64')}`
		})

		this.client.on('disconnect', () => {
			this.connected = false
			console.log('Disconnected')
		})

		this.client.start()
	}

	async disconnect() {
		this.client.stop()
	}

	test = async () => {
		console.log(
			await request(
				{
					method: 'GET',
					url: '/lol-summoner/v1/current-summoner',
				},
				this.credentials
			)
		)
	}

	getUser = async () => {
		const user = await this.lcu('/lol-summoner/v1/current-summoner')
		return user
	}

	getLoot = async () => {
		const loot = await this.lcu('/lol-loot/v1/player-loot-map')
		return loot
	}

	getChampionsInLoot = async (loot: any) => {
		const champs = Object.values(loot).filter(
			(x: any) => x.type === 'CHAMPION_RENTAL'
		)
		return champs
	}

	getMastery = async (user: any) => {
		const mastery = await this.lcu(
			`/lol-collections/v1/inventories/${user.summonerId}/champion-mastery`
		)
		return mastery
	}

	getOwnedChampsInLoot = async (user: any) => {
		const owned = [
			...(await this.lcu(
				`/lol-champions/v1/inventories/${user.summonerId}/champions`
			)),
		].filter((c) => c.ownership.owned)
		return owned
	}

	openCapsules = async () => {
		const loot = await this.lcu('/lol-loot/v1/player-loot-map')
		const capsules: any = Object.values(loot).find(
			(x: any) => x.storeItemId === 128
		)
		if (capsules && capsules.count > 0) {
			const result = await this.lcu(
				'/lol-loot/v1/recipes/CHEST_128_OPEN/craft?repeat=' +
					capsules.count,
				'POST',
				[capsules.lootId]
			)
			console.log('Champion capsules opened.')
		}
	}

	getChampionsToDisenchant = async (
		disenchantAll: boolean,
		disenchantUnowned: boolean,
		onlyKeepLevel5And6: boolean
	): Promise<
		[count: number, beAmount: number, championsToDisenchant: any]
	> => {
		const user = await this.getUser()
		const loot = await this.getLoot()

		const champsInLoot: any = await this.getChampionsInLoot(loot)
		const ownedChampsInLoot: any = await this.getChampionsInLoot(user)
		const mastery = await this.getMastery(user)

		let disenchantValue = 0
		let count = 0

		const championsToDisenchant = []
		for (const champ of champsInLoot) {
			const champId = +champ.lootId.split('_')[2]
			const championData = await getChampionByKey(champId, 'en_US')
			const entry = mastery.find(
				(champion: any) => champion.championId === champId
			)

			// If you have have a champion level 6 or 7 remove a count of 1 or 2 respectivly
			if (entry && !disenchantAll) {
				if (onlyKeepLevel5And6) {
					if (entry.championLevel === 5) {
						champ.count -= 2
					}
				} else {
					if (entry.championLevel <= 5) {
						champ.count -= 2
					}
				}

				if (entry && entry.championLevel === 6) {
					champ.count--
				}
			}

			const hasChampion =
				ownedChampsInLoot.find((c: any) => c.id == champId) !== null
			if (disenchantUnowned === false && hasChampion === false) {
				champ.count--
			}

			// If no champions are left in loot after removing the once u shouldnt remove dont add it to the list
			if (champ.count <= 0) {
				continue
			}

			disenchantValue += champ.disenchantValue * champ.count
			count += champ.count

			championsToDisenchant.push({ ...champ, name: championData.name })
		}

		return [count, disenchantValue, championsToDisenchant]
	}

	disenchantChampions = async (champions) => {
		const promises = [Promise]
		for (let champ of champions)
			promises.push(
				this.lcu(
					`/lol-loot/v1/recipes/CHAMPION_RENTAL_disenchant/craft?repeat=${champ.count}`,
					'POST',
					[champ.lootId]
				)
			)
		await Promise.all(promises)
	}

	lcu(path: string, method = 'GET', body = undefined): any {
		return new Promise((resolve) => {
			const req = https.request(
				{
					host: '127.0.0.1',
					port: this.credentials.port,
					path,
					method,
					headers: {
						Authorization: this.authToken,
						'Content-Type': 'application/json',
					},
				},
				(res) => {
					let contents = ''
					res.setEncoding('utf8')
					res.on('data', (chunk) => (contents += chunk))

					res.on('end', () => {
						resolve(JSON.parse(contents))
					})
				}
			)

			if (body) req.write(JSON.stringify(body))

			req.end()
		})
	}
}

export default new LCU()
