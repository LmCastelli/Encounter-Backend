exports.seed = function(knex) {
    return knex('dnd')
        .then(function () {
            return knex('dnd').insert([
                {name: 'Lucas', size: "Medium", type: "Humanoid", alignment: "Good", hit_points: 90, armor_type: "Chain Mail", nat_armor_bonus: 10, speed: 20, burrow_speed: 20, climb_speed: 20, fly_speed: 40, swim_speed: 20, 
                STR: 20, DEX: 20, CON: 20, INT: 20, WIS: 20, CHA: 20, saving_throws: "Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma", proficient_skills: "History", expert_skills: "Stealth", 
                immunities:"Blinded, Charmed, Invisible", damage_vulnerable: "", damage_resistant:"All", damage_immune: "Poison", languages_spoken: "All", languages_understood:"All", telepathy: 60, blind_sight: 0, dark_vision: 60, tremor_sense: 0, true_sight: 30, 
                challenge_rating: 10, abilities: {"Great Club":"10d8 Damage"}}
            ])
        })
}