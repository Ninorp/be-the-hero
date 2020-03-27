const generateUniqueID = require('../../src/utils/generateUniqueID')

describe('Generane Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueID();

        expect(id).toHaveLength(8);
    })
})