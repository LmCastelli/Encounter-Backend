//Check id exists
//Check fields being filled
//Check name isn't in use
//More?
//Check ability id exists
//Check ability name and description

const Dnd = require('./dnd-model')

async function checkIdExists(req, res, next) {
    try {
        const entry = await Dnd.findById(req.params.id);
        if (entry) {
            req.entry = entry;
            next();
        } else {
            res.status(404).json({message: 'Could not find the entry with that ID'})
        }
    } catch(err) {
        res.status(500).json({message: 'Error finding entry'})
    }
}

function validateDnd(req, res, next) {
    console.log(req.body)
    next();
}

function checkNameAvailable(rea, res, next) {
    //check string.to.lower version of name
}

async function checkAbilityIdExists(req, res, next) {
    try {
        const ability = await Dnd.findAbilitiesById(req.params.id);
        if(ability) {
            req.ability = ability;
            next();
        } else {
            res.status(404).json({message: 'Could not find ability with that ID'})
        }
    } catch(err) {
        res.status(500).json({message: 'Error finding ability'})
    }
}

function validateAbility(req, res, next) {

}

module.exports = {
    checkIdExists,
    validateDnd,
    checkNameAvailable,
    checkAbilityIdExists,
    validateAbility,
}