import { Router } from 'express';
import users from '../data/users.js';

const usersRouter = Router()

// GET all users
usersRouter.get('/users', (req, res) => {
    res.json(users)
});

// GET user by ID
usersRouter.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
});

// POST a new user
usersRouter.post('/users', (req, res) => {
    const { firstName, lastName, telephone, address, hobbies } = req.body
    const newUser = { id: users.length + 1, firstName, lastName, telephone, address, hobbies }
    users.push(newUser)
    res.status(201).json(newUser)
});

// PUT update user
usersRouter.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ message: "User not found" })

    const { firstName, lastName, telephone, address, hobbies } = req.body
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.telephone = telephone || user.telephone
    user.address = address || user.address
    user.hobbies = hobbies || user.hobbies

    res.json(user);
});

// DELETE user
usersRouter.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ message: "User not found" })

    users.splice(index, 1)
    res.status(202).json({ message: "User deleted" })
});

export default usersRouter