const express = require('express')
const router = express.Router()

const Task = require('../../models/Task')

router.get('/tasks', (req,res) => {
  const { user } = req
  const userId = user._id
  Task.find({userId}).then( tasks => res.render('tasks', { tasks, user }) )
})

router.get('/task/new', (req,res) => {
  const { user } = req
  res.render('addTask', { user })
})

router.get('/client/:id', (req,res) => {
  const { user } = req
  const { id } = req.params
  Client.findById(id).then( client => res.render('clientProfile', { client, user }) )
})

router.post('/tasks', (req,res) => {
  const { name } = req.body
  const userId = req.user._id
  console.log(userId)
  const task = new Task({ name, userId })
  task.save()
    .then( () => {
      res.redirect('/admin/tasks')
    })
})

module.exports = router