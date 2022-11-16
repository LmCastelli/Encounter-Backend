exports.seed = function(knex) {
    return knex('encounters')
        .then(function () {
            return knex('encounters').insert([
                {name: "The first fight!", description: "The players encounter a small pack of wolves"}, {name: "The first BBEG encounter!", description: "The players meet the bbeg who attacks with an aoe spell before leaving his minions to finish the townsfolk"}
            ])
        })
}