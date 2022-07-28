const config = require('config');
const dacast = require('dacast')(config.get('dacast.apiKey'));
const Joi = require('joi');

exports.listChannels = (req, res) => {

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


exports.createChannel = (req, res) => {

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

exports.modifyChannel = (req, res) => {

    const id = req.params.channelId;
    // res.send(id)
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
        console.log('success', success);
        res.json(success);
    }, function (error) {
        console.log('error', error);
        res.status(500)
    });

    res.send("channel modified.")
}