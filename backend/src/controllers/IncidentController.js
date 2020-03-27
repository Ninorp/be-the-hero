const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .select(
                ['incidents.*',
                    'ongs.name',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf',
                ])
            .limit(5)
            .offset((page - 1) * 5);

        response.header('X-Total-Count', count['count(*)']);        
        return response.json(incidents);
    },
    async create(request, response) {
        const {title, description, value} = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert(
            {
                title,
                description,
                value,
                ong_id
            }
        );

        return response.json({id});
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const obj = await connection('incidents').select('ong_id').where('id', id).first();
        if (!obj) {
            response.status(400);
            return response.json({
                error: 'Incident not found'
            });
        }
        if(obj.ong_id !== ong_id){
            response.status(401);
            return response.json({
                error: 'Operation not permitted'
            });
        }
        await connection('incidents').delete().where('id', id);

        return response.status(204).send();
    }
}