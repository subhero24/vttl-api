import soap from '../utils/soap.js';
import { prepare } from '../utils/options.js';
import { XmlNodes, XmlString, XmlInteger, XmlBoolean } from '../utils/xml.js';

// Options can contain the following fields:
// - UniqueIndex

export default async function systems(options = {}) {
	let props = prepare(options, [['id', 'UniqueIndex']]);

	let xml = await soap({ GetMatchSystems: props });
	let systems = XmlNodes(xml, 'MatchSystemEntries', parseSystem);

	return systems;
}

function parseSystem(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		name: XmlString(xml, 'Name'),
		sets: XmlInteger(xml, 'SetCount'),
		points: XmlInteger(xml, 'PointCount'),
		forced: XmlBoolean(xml, 'ForcedDoubleTeams'),
		singles: XmlInteger(xml, 'SingleMatchCount'),
		doubles: XmlInteger(xml, 'DoubleMatchCount'),
		matches: XmlNodes(xml, 'TeamMatchDefinitionEntries', parseMatchDescription),
		substitutes: XmlInteger(xml, 'SubstituteCount'),
	};
}

function parseMatchDescription(xml) {
	return {
		type: XmlString(xml, 'Type'),
		home: XmlInteger(xml, 'HomePlayerIndex'),
		away: XmlInteger(xml, 'AwayPlayerIndex'),
		position: XmlInteger(xml, 'Position'),
		substitute: XmlBoolean(xml, 'AllowSubstitute'),
	};
}
