const express = require('express')
const router = express.Router()

const Task = require('../../models/Task')

router.get('/tasks', (req, res) => {
    const { user } = req
    const userId = user._id
    const done = false
    Task.find( { $and: [{userId},{done} ]  } )
      .then(tasks => res.render('tasks', { tasks, user }))
})

router.get('/tasks/completed', (req, res) => {
    const { user } = req
    const userId = user._id
    const done = true
    Task.find( { $and: [{userId},{done} ]  } )
      .then(tasks => res.render('tasksCompleted', { tasks, user }))
})

router.get('/task/new', (req, res) => {
    const { user } = req
    res.render('addTask', { user })
})

router.get('/client/:id', (req, res) => {
    const { user } = req
    const { id } = req.params
    Client.findById(id).then(client => res.render('clientProfile', { client, user }))
})

router.post('/tasks', (req, res) => {
    const { name } = req.body
    const userId = req.user._id
    console.log(userId)
    const task = new Task({ name, userId })
    task.save()
        .then(() => {
            res.redirect('/admin/tasks')
        })
})

router.get('/tasks/delete/:id', (req, res) => {

    const { id } = req.params

    Task.findByIdAndRemove(id)
        .then(task => {
            console.log(`tasks has been removed succesfully`)
            res.status(200).redirect('/admin/tasks')
        })
        .catch(err => res.status(500).json(err))

})

router.get('/task/complete/:id', (req, res) => {

    const { id } = req.params

    const updatedAt = Date.now()
    const done = true

    Task.findByIdAndUpdate(id, { done, updatedAt })
        .then(task => {
            console.log('task has been updated succesfully')
            res.status(200).redirect('/admin/tasks')
        })
        .catch(err => res.status(500).json(err))
})




module.exports = router
