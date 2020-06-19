/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} description
 */

/**
 * A map of all the existing VTTL categories by ID
 * @type {Object<string, Category>}
 */

const Categories = {
	1: { id: 1, description: 'Seniors Heren' },
	2: { id: 2, description: 'Seniors Dames' },
	3: { id: 3, description: 'Veteranen' },
	4: { id: 4, description: 'Dames Veteranen' },
	5: { id: 5, description: 'Pre-miniemen' },
	6: { id: 6, description: 'Pre-miniemen meisjes' },
	7: { id: 7, description: 'Miniemen' },
	8: { id: 8, description: 'Miniemen meisjes' },
	9: { id: 9, description: 'Cadetten' },
	10: { id: 10, description: 'Cadetten meisjes' },
	11: { id: 11, description: 'Juniors' },
	12: { id: 12, description: 'Juniors meisjes' },
	13: { id: 13, description: '17-21' },
	14: { id: 14, description: '17-21 meisjes' },
	15: { id: 15, description: 'Benjamins' },
	16: { id: 16, description: 'Benjamines' },
	17: { id: 17, description: 'Veteranen 40' },
	18: { id: 18, description: 'Veteranen Dames 40' },
	19: { id: 19, description: 'Veteranen 50' },
	20: { id: 20, description: 'Veteranen Dames 50' },
	21: { id: 21, description: 'Veteranen 60' },
	22: { id: 22, description: 'Veteranen Dames 60' },
	23: { id: 23, description: 'Veteranen 70' },
	24: { id: 24, description: 'Veteranen Dames 70' },
	25: { id: 25, description: 'Veteranen 80' },
	26: { id: 26, description: 'Veteranen Dames 80' },
	27: { id: 27, description: 'Jeugd' },
	28: { id: 28, description: 'YouthFilles' },
	29: { id: 29, description: 'Alle' },
	30: { id: 30, description: 'Alle Dames' },
	31: { id: 31, description: 'Veteranen 65' },
	32: { id: 32, description: 'Veteranen Dames 65' },
	33: { id: 33, description: 'Veteranen 75' },
	34: { id: 34, description: 'Veteranen Dames 75' },
	35: { id: 35, description: 'Veteranen 85' },
	36: { id: 36, description: 'Veteranen Dames 85' },
};

export default Categories;
