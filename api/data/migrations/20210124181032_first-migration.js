exports.up = async (knex) => {
  await knex.schema
    .createTable('dnd', (dnd) => {
      dnd.increments('dnd_id')
      dnd.string('name', 50).notNullable().unique()
      dnd.string('size', 10)
      dnd.string('type', 20)
      dnd.string('alignment', 10)
      dnd.integer('hit_points', 1000 ).notNullable().unsigned()
      dnd.string('armor_type', 25)
      dnd.integer('nat_armor_bonus', 100)
      dnd.integer('speed', 1000).notNullable().unsigned()
      dnd.integer('burrow_speed', 1000).unsigned()
      dnd.integer('climb_speed', 1000).unsigned()
      dnd.integer('fly_speed', 1000).unsigned()
      dnd.integer('swim_speed', 1000).unsigned()
      dnd.integer('STR', 50).notNullable().unsigned()
      dnd.integer('DEX', 50).notNullable().unsigned()
      dnd.integer('CON', 50).notNullable().unsigned()
      dnd.integer('INT', 50).notNullable().unsigned()
      dnd.integer('WIS', 50).notNullable().unsigned()
      dnd.integer('CHA', 50).notNullable().unsigned()
      dnd.string('saving_throws', 200)
      dnd.string('proficient_skills', 200)
      dnd.string('expert_skills', 200)
      dnd.string('immunities', 200)
      dnd.string('damage_vulnerable', 200)
      dnd.string('damage_resistant', 200)
      dnd.string('damage_immune', 200)
      dnd.string('languages_spoken', 200)
      dnd.string('languages_understood', 200)
      dnd.integer('telepathy', 200).unsigned()
      dnd.integer('blind_sight', 200).unsigned()
      dnd.integer('dark_vision', 200).unsigned()
      dnd.integer('tremor_sense', 200).unsigned()
      dnd.integer('true_sight', 200).unsigned()
      dnd.integer('challenge_rating', 200).notNullable().unsigned()
    })
    .createTable('abilities', (ability) => {
      ability.increments('ability_id')
      ability.integer('user_id').unsigned().notNullable();
      ability.string('ability_name').notNullable();
      ability.string('ability_description').notNullable();
      ability.foreign('user_id').references('dnd_id').inTable('dnd')
    })
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('abilities')
  .dropTableIfExists('dnd')
}
