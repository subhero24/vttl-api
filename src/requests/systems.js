import request from '../utils/request';
import { XmlNodes, XmlString, XmlInteger, XmlBoolean } from '../utils/xml-types';

// Options can contain the following fields:
// - UniqueIndex

export default async function systems(options = {}) {
	let xml = await request({ GetMatchSystems: options });
	return XmlNodes(xml, 'MatchSystemEntries', parseSystem);
}

function parseSystem(xml) {
	return {
		id: XmlString(xml, 'UniqueIndex'),
		name: XmlString(xml, 'Name'),
		sets: XmlInteger(xml, 'SetCount'),
		points: XmlInteger(xml, 'PointCount'),
		singles: XmlInteger(xml, 'SingleMatchCount'),
		doubles: XmlInteger(xml, 'DoubleMatchCount'),
		forced: XmlBoolean(xml, 'ForcedDoubleTeams'),
		matches: XmlNodes(xml, 'TeamMatchDefinitionEntries', parseMatchDescription),
		substitutes: XmlInteger(xml, 'SubstituteCount'),
	};
}

function parseMatchDescription(xml) {
	return {
		index: XmlInteger(xml, 'Position'),
		type: XmlString(xml, 'Type'),
		home: XmlInteger(xml, 'HomePlayerIndex'),
		away: XmlInteger(xml, 'AwayPlayerIndex'),
	};
}
