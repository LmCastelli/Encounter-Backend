exports.up = async (knex) => {
  await knex.schema
    .createTable("dnd", (dnd) => {
      dnd.increments('dnd_id')
      dnd.string('name', 50).notNullable().unique()
      dnd.string('size', 10).defaultTo('medium')
      dnd.string('type', 20).defaultTo('')
      dnd.string('alignment', 10).defaultTo('neutral')
      dnd.integer('hit_points', 1000 ).notNullable().unsigned()
      dnd.string('armor_type', 25).defaultTo('Light Armor')
      dnd.integer('nat_armor_bonus', 100).defaultTo(0)
      dnd.integer('speed', 1000).notNullable().unsigned()
      dnd.integer('burrow_speed', 1000).unsigned().defaultTo(0)
      dnd.integer('climb_speed', 1000).unsigned().defaultTo(0)
      dnd.integer('fly_speed', 1000).unsigned().defaultTo(0)
      dnd.integer('swim_speed', 1000).unsigned().defaultTo(0)
      dnd.integer('STR', 50).notNullable().unsigned()
      dnd.integer('DEX', 50).notNullable().unsigned()
      dnd.integer('CON', 50).notNullable().unsigned()
      dnd.integer('INT', 50).notNullable().unsigned()
      dnd.integer('WIS', 50).notNullable().unsigned()
      dnd.integer('CHA', 50).notNullable().unsigned()
      dnd.string('saving_throws', 200).defaultTo('none')
      dnd.string('proficient_skills', 200).defaultTo('none')
      dnd.string('expert_skills', 200).defaultTo('none')
      dnd.string('immunities', 200).defaultTo('none')
      dnd.string('damage_vulnerable', 200).defaultTo('none')
      dnd.string('damage_resistant', 200).defaultTo('none')
      dnd.string('damage_immune', 200).defaultTo('none')
      dnd.string('languages_spoken', 200).defaultTo('none')
      dnd.string('languages_understood', 200).defaultTo('none')
      dnd.integer('telepathy', 200).unsigned().defaultTo(0)
      dnd.integer('blind_sight', 200).unsigned().defaultTo(0)
      dnd.integer('dark_vision', 200).unsigned().defaultTo(0)
      dnd.integer('tremor_sense', 200).unsigned().defaultTo(0)
      dnd.integer('true_sight', 200).unsigned().defaultTo(0)
      dnd.integer('challenge_rating', 2000).notNullable().unsigned()
    })
    .createTable("abilities", (ability) => {
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
