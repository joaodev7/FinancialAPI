const router = require('express').Router()
const User = require('../models/User')


router.post('/', async (req, res) => {
    //Recurso JS estructure 
    const { username, password } = req.body

    if (!username) {
        res.status(422).json({ error: "O nome do usuário é obrigatório" })
        return
    }
    else if (!password) {
        res.status(422).json({ error: "A senha do usuário é obrigatória" })
        return
    }

    const user = {
        username,
        password,
    }

    try {
        await User.create(user)

        res.status(201).json({ message: 'Usuário criado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})
router.get('/', async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {

        const user = await User.findOne({ _id: id })

        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado!" })
            return
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { username, password } = req.body
    const user = {
        username,
        password,
    }

    const existsUser = await User.findOne({ _id: id })
    if (!existsUser) {
        res.status(404).json({ message: "Usuário não encontrado!" })
        return
    }

    try {
        await User.updateOne({ _id: id }, user)
        res.status(201).json({ message: `Usuário ${username} atualizado com sucesso` })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ _id: id })
    if (!user) {
        res.status(404).json({ message: "Usuário não encontrado!" })
        return
    }

    try {
        await User.deleteOne({ _id: id })
        res.status(201).json({ message: "Usuário deletado com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router