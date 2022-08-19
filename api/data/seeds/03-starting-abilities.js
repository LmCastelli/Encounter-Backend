exports.seed = function(knex) {
    return knex('abilities')
        .then(function () {
            return knex('abilities').insert([
                {user_id:1,ability_name:"Death", ability_description:"Kill target"},{user_id:1, ability_name:"Life", ability_description:"Heal target for all its hit points and replenish all spell slots"}
            ])
        })
}