const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Contra Corona",
                email: "contato@cc.com.br",
                whatsapp: "21992774775",
                city: "Belford Roxo",
                uf: "RJ"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})