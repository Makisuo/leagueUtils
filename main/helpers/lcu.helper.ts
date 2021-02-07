import { ipcMain } from 'electron'

import LCUConnector from 'lcu-connector'
const https = require('https')
const fetch = require('node-fetch')

let championByIdCache = {}
let championJson = {}
let authToken = 'UNAUTHORIZED'
let data

const connector = new LCUConnector()

export default class LCU {
	constructor() {
		window.ipcRenderer = require('electron').ipcRenderer

		connector.start()

		connector.on('connect', async (c) => {
			data = c
			authToken = `Basic ${Buffer.from(
				`${data.username}:${data.password}`
			).toString('base64')}`
		})

		ipcMain.handle('GET_LOOT', this.getLoot)
	}

	getLoot = async () => {
		const loot = await this.lcu('/lol-loot/v1/player-loot-map')
		console.log(loot)
		return loot
	}

	connectorConnect = async () => {
		const loot = await this.lcu('/lol-loot/v1/player-loot-map')
		const capsules = Object.values(loot).find(
			(x: any) => x.storeItemId === 128
		)
		const champs = Object.values(loot).filter(
			(x: any) => x.type === 'CHAMPION_RENTAL'
		)

		const user: any = await this.lcu('/lol-summoner/v1/current-summoner')
		const mastery = await this.lcu(
			`/lol-collections/v1/inventories/${user.summonerId}/champion-mastery`
		)
		const owned = [
			...(await this.lcu(
				`/lol-champions/v1/inventories/${user.summonerId}/champions`
			)),
		].filter((c) => c.ownership.owned)
	}

	// connector.on('connect', async (c) => {
	// 	data = c;
	// 	authToken = `Basic ${(Buffer.from(`${data.username}:${data.password}`)).toString('base64')}`;

	// 	const loot = await lcu("/lol-loot/v1/player-loot-map");
	// 	const capsules = Object.values(loot).find(x => x.storeItemId === 128);
	// 	const champs = Object.values(loot).filter(x => x.type === "CHAMPION_RENTAL");

	// 	const me = await lcu("/lol-summoner/v1/current-summoner");
	// 	const mastery = await lcu(`/lol-collections/v1/inventories/${me.summonerId}/champion-mastery`);
	// 	const owned = [... (await lcu(`/lol-champions/v1/inventories/${me.summonerId}/champions`))].filter(c => c.ownership.owned);

	// 	let disenchantValue = 0;
	// 	let count = 0;
	// 	const promises = [];

	// 	if (capsules && capsules.count > 0 && await askYesNo(`Should we open your ${capsules.count} champion capsule${capsules.count != 1 ? "s" : ""}?`)) {
	// 		const result = await lcu("/lol-loot/v1/recipes/CHEST_128_OPEN/craft?repeat=" + capsules.count, "POST", [capsules.lootId]);
	// 		console.log("Champion capsules opened.");
	// 	}

	// 	console.log("You can use champion tokens to improve your mastery level. You might want one for level 6 and one for 7.");
	// 	const disenchantLv5 = await askYesNo("Should we disenchant champion shards when you're mastery level 5 on the champion?");
	// 	const keepTwoShards = disenchantLv5 == false ? await askYesNo("Do you want to keep two shards in this case? You would have one for level 6 as well.") : false;
	// 	const disenchantLv6 = await askYesNo("Should we disenchant champion shards when you're mastery level 6 on the champion?");
	// 	const disenchantUnowned = await askYesNo("Should we disenchant champion shards of champs you don't own?");

	// 	const actions = [];
	// 	for (const champ of champs) {
	// 		const champId = +champ.lootId.split("_")[2];
	// 		const championData = await getChampionByKey(champId, "en_US");
	// 		const entry = mastery.find(x => x.championId === champId);

	// 		if (entry) {

	// 			if (entry.championLevel == 5 && disenchantLv5 == false)
	// 				champ.count -= keepTwoShards ? 2 : 1;

	// 			if (entry && entry.championLevel == 6 && disenchantLv6 == false)
	// 				champ.count--;
	// 		}

	// 		const hasChampion = owned.find(c => c.id == champId) != null;
	// 		if (disenchantUnowned == false && hasChampion == false)
	// 			champ.count--;
	// 		if (champ.count <= 0)
	// 			continue;

	// 		disenchantValue += champ.disenchantValue * champ.count;
	// 		count += champ.count;

	// 		actions.push({ ...champ, name: championData.name });
	// 	}

	// 	if (count == 0) {
	// 		console.log(`It seems we don't have any champions you can disenchant.`);
	// 		connector.stop();
	// 		process.exit(0);
	// 		return;
	// 	}

	// 	const shouldDisenchant = await askYesNo(`Would you like to disenchant ${count} champion shards for ${disenchantValue} BE? (${actions.map(a => a.name + " x" + a.count).join(", ")})`)
	// 	if (!shouldDisenchant) {
	// 		console.log(`Done. No champions were disenchanted.`);
	// 		connector.stop();
	// 		process.exit(0);
	// 		return;
	// 	}

	// 	for (let champ of actions)
	// 		promises.push(lcu("/lol-loot/v1/recipes/CHAMPION_RENTAL_disenchant/craft?repeat=" + champ.count, "POST", [champ.lootId]));
	// 	await Promise.all(promises);

	// 	console.log(`Done. Disenchanted ${count} champion shards for ${disenchantValue} BE.`);
	// 	connector.stop();
	// 	process.exit(0);
	// });

	lcu(path: string, method = 'GET', body = undefined): any {
		return new Promise((resolve) => {
			const req = https.request(
				{
					host: '127.0.0.1',
					port: data.port,
					path,
					method,
					headers: {
						Authorization: authToken,
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
