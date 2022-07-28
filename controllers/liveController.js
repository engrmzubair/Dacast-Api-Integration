const config = require('config');
const { json } = require('express');
const dacast = require('dacast')(config.get('dacast.apiKey'));
const Joi = require('joi');

exports.listSteams = (req, res) => {

    /*
 * List all channels
 * Returns a list of your channels. The channels are returned sorted by creation date, with the most recent channels appearing first.
 */
    dacast.channel.all({
        perpage: 10, // Optional - Default : 25 
        page: 2 // Optional - Default : 1
    }, function (success) {
        console.log('success', success);
        res.json(success)
    }, function (error) {
        console.log('error', error);
        res.status(500)
    });
};


exports.createStream = (req, res) => {

    const { title, description } = req.body;
    const schema = Joi.object({
        title: Joi.string()
            .min(5)
            .max(30)
            .required(),
        description: Joi.string().min(10).max(100).required()
    })

    const { error } = schema.validate(req.body);

    if (error) return res.json(error.details[0].message);

    dacast.channel.create({
        title, // Required
        description, // Required
        flash: 0 // Optional - Only few accounts are able to set flash channel type (Default : 0)
    }, function (success) {
        console.log('success', success);
        res.json(success);
    }, function (error) {
        res.status(500);
        console.log('error', error);
    });
}

exports.modifyStream = (req, res) => {

    const id = req.params.streamId;

    const { title } = req.body;

    const schema = Joi.object({
        title: Joi.string()
            .min(5)
            .max(30),
        description: Joi.string().min(10).max(100)
    })

    const { error } = schema.validate(req.body);

    if (error) return res.json(error.details[0].message);

    dacast.channel.modify({
        id, // Required - Set your own channel id
        title // Optional - See the documentation to get parameters list
    }, function (success) {
        return res.json(success);
    }, function (error) {
        return res.status(500).send(error)
    });

}

exports.deleteStream = (req, res) => {

    const id = req.params.streamId;
    /*
    * Permanently deletes a channel. It cannot be undone. 
    * Delete a channel object.
    */
    dacast.channel.delete({
        id, // Required - Set your own channel id
    }, function success() {
        console.log('success');
        res.send("Channel Deleted")
    }, function fail(error) {
        console.log('error', error);
    });
}

exports.listStreamById = (req, res) => {

    const id = req.params.streamId;

    dacast.channel.
        get({ id },
            success => res.json({ success }),
            error => res.status(500).send(error)
        )
}

