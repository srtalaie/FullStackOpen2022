const supertest = require('supertest')
const app = require('../app')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('Basic functionalities for users', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('new user can be created', async () => {
        const allUsersStart = await User.find({})

        const newUser = {
            username: 'Spatch',
            name: 'Carlos Mencia',
            password: 'mindofmencia!'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
        const allUsersEnd = await User.find({})
        expect(allUsersEnd).toHaveLength(allUsersStart.length + 1)

        const usernames = allUsersEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('username must be unique', async () => {
        const allUsersStart = await User.find({})

        const newUser = {
            username: 'root',
            name: 'Carlos Mencia',
            password: 'mindofmencia!'
        }

       const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.error).toContain('username must be unique')
            
        const allUsersEnd = await User.find({})
        expect(allUsersEnd).toEqual(allUsersStart)
    })
})