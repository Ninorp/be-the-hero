const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .select('name')
            .where('id', id)
            .first();
        
        if(!ong){
            response.status(400);
            return response.json({ error: 'ONG not found with this ID'});
        }

        return response.json(ong);
    }    
};