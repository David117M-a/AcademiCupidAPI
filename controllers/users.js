const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require("../models/users");
const Match = require("../models/match");

const getUsers = async (req = request, res = response) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const users = (await User.find()).filter(u => {
        if (user.preference.includes(u.gender) && u.preference.includes(user.gender) && user.id != u.id) {
            u.password = "";
            return true;
        }

        return false;
    });

    return res.status(200).json(users);
}

const getUserById = async (req = request, res = response) => {
    const { id } = req.params;
    const user = await User.findById(id);
    user.password = "";
    return res.status(200).json(user);
}

const updateUser = async (req = request, res = response) => {
    const { body } = req;
    const user = await User.findById(body._id);
    const newUser = new User(body);
    newUser.password = user.password;
    newUser.cellphone = user.cellphone;
    await User.updateOne({ id: body._id }, newUser);
    newUser.password = "";
    return res.status(200).json(newUser);
}

const match = async (req = request, res = response) => {
    const { body } = req;
    try {
        const existBeforeMatch = await Match.findOne({ personTwo: body.personOne });
        if (existBeforeMatch) {
            existBeforeMatch.matchedPersonTwo = true;
            await Match.updateOne({ id: existBeforeMatch.id }, existBeforeMatch);
            return res.status(200).json(existBeforeMatch);
        } else {
            if (!body.personOne || !body.personTwo) {
                return res.status(400).json({
                    msg: 'Persone One and Two are mandatory to continue'
                });
            }

            const match = new Match(body);
            match.matchedPersonOne = true;
            const savedMatch = await Match.create(match);
            return res.status(201).json(savedMatch);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

const createUser = async (req = request, res = response) => {
    const { body } = req;
    try {
        const alreadyRegistered = await User.findOne({ cellphone: body.cellphone });
        console.log(alreadyRegistered);
        if (alreadyRegistered) {
            return res.status(400).json({
                msg: 'Este número telefónico ya se encuentra enlazado a otro usuario.'
            });
        }

        const newUser = new User(body);
        const salt = bcryptjs.genSaltSync();
        newUser.password = bcryptjs.hashSync(body.password, salt);
        const savedUser = await User.create(newUser);
        delete savedUser.password;
        return res.status(200).json(savedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    match
}