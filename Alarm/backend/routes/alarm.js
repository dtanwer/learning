const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const Alarm = require('../models/alarm');

module.exports = (io)=>{

    router.get('/:id', async (req, res) => {
        const id = req.params.id;
        const alarms = await Alarm.find({ user: id });
        alarms.forEach(alarm => {
            schedule.scheduleJob(alarm.time, () => {
                console.log('Alarm triggered at', new Date());
            });
        });
        return res.status(200).send({
            message: 'Alarms successfully retrieved',
            alarms
        });
    });
    
    
    router.post('/', async (req, res) => {
        const { time, id } = req.body;
        const newAlarm = new Alarm({ time, user: id });
        await newAlarm.save();
        schedule.scheduleJob(time, () => {
            console.log('Alarm triggered at', new Date());
            io.emit(id, "Jag Ja bhai !!!! :) ");
    
        });
        res.status(200).send({
            message: 'Alarm successfully set',
            alarm: newAlarm
        });
    });

    return router;
}

