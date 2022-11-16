exports.seed = function(knex) {
    return knex('roster')
        .then(function() {
            return knex('roster').insert([
                {encounter_id: 1, dnd_id: 1, ac: 10, hp: 90, name: "Lucas", status: ""}
            ])
        })
}