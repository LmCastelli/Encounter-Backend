const db = require('../data/db-config')

/* 
module.exports ={
    find all?
    findById
    insert
    update
    remove
    findAbilitiesById
}
*/ 

function findDnd() {
    return db('dnd');
}

function findById(id) {
    return db('dnd')
        .where({dnd_id: Number(id)}).first();
} 


function insert(dnd) {
    return db('dnd')
        .insert(dnd);
}

function update(id, dnd) {
    return db('dnd')
        .where('dnd_id', Number(id))
        .update(dnd);
}

function remove(id) {
    return db('dnd')
        .where('dnd_id', Number(id))
        .del();
}

function findAbilitiesByDndId(dnd_id) {
    return db('abilities')
        .join('dnd', 'dnd.dnd_id', 'user')
        .select('abilities.*')
        .where('user', dnd_id);
}

function findAbilitiesById(id) {
    return db('abilities')
        .where({ability_id: Number(id)}).first();
}

function insertAbility(ability) {
    return db('abilities')
        .insert(ability);
}

function updateAbility(user,ability) {
    return db('abilities')
        .where('user', Number(user))
        .update(ability);
}

function removeAbility(id) {
    return db('abilities')
        .where('ability_id', Number(id))
        .del();
}



module.exports = {
    findDnd,
    findById,
    insert,
    update,
    remove,
    findAbilitiesByDndId,
    findAbilitiesById,
    insertAbility,
    updateAbility,
    removeAbility,

}