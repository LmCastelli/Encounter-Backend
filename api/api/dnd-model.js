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
    return db("dnd");
}

function findById(id) {
    return db("dnd")
        .where({dnd_id: Number(id)}).first();
} 


function insert(dnd) {
    return db("dnd")
        .insert(dnd);
}

function update(id, dnd) {
    return db("dnd")
        .where({dnd_id: Number(id)})
        .update(dnd);
}

function remove(dnd_id) {
    return db("dnd")
        .where({dnd_id}).del();
}

function findByName(name) {
    return db("dnd")
        .where('name', name)
}

//abilities

function findAbilitiesByDndId(dnd_id) {
    return db("abilities")
        .join('dnd', 'dnd.dnd_id', 'abilities.user_id')
        .select('abilities.*')
        .where('user_id', dnd_id);
}

function findAbilitiesById(id) {
    return db("abilities")
        .where({ability_id: Number(id)}).first();
}

function insertAbility(ability) {
    return db("abilities")
        .insert(ability);
}

function updateAbility(user_id, ability) {
    return db("abilities")
        .where('ability_id', Number(user_id))
        .update(ability);
}

function removeAbility(id) {
    return db("abilities")
        .where('ability_id', Number(id))
        .del();
}

//encounters

function findEncounters() {
    return db('encounters');
}

function findByEncounterId(id) {
    return db('encounters')
        .where({encounter_id: Number(id)}).first();
}

function insertEncounter(encounter) {
    return db('encounters')
        .insert(encounter);
}

function removeEncounter(id) {
    return db('encounters')
        .where('encounter_id', Number(id)).del();
}
//roster

function findRosters() {
    return db('roster')
}

function findRosterById(id) {
    return db('roster')
        .where({roster_id: Number(id)}).first();
}

function findRosterByEncounterId(id) {
    return db('roster')
    //ASK UNCLE
        .where({encounter_id: Number(id)});
}

function insertRoster(roster) {
    return db('roster')
        .insert(roster);
}

function updateRoster(id, roster) {
    return db('roster')
        .where({roster_id: Number(id)})
        .update(roster);
}

function removeRoster(roster_id) {
    return db('roster')
        .where({roster_id}).del();
}

module.exports = {
    findDnd,
    findById,
    insert,
    update,
    remove,
    findByName,
    findAbilitiesByDndId,
    findAbilitiesById,
    insertAbility,
    updateAbility,
    removeAbility,
    findEncounters,
    findByEncounterId,
    insertEncounter,
    removeEncounter,
    findRosters,
    findRosterById,
    findRosterByEncounterId,
    insertRoster,
    updateRoster,
    removeRoster,
}