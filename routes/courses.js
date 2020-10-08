const Joi = require('joi')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true
    }
})
const Course = mongoose.model('course', courseSchema)

// create 
router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let course = new Course(req.body)
    course = await course.save();
    res.send(course)
})
// get all
// get by id
// edit
// delete


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(255),
        isGold: Joi.required(),
        phone: Joi.string().required()
    })
    return schema.validate(course)
}

module.exports = router