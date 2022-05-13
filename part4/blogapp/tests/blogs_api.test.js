const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  helper.initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  })
  console.log('done')
})

describe('Server response', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Database indexed correctly', () => {
    test('unique identifier _id exists', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body
        blogs.forEach((blog) => {
            expect(blog._id).toBeDefined()
        })
    })
})

describe('User able to preform basic functions in DB', () => {
    test('able to create new blog post and blog is saved to DB', async () => {
        const newBlog = {
            title: 'New Blog',
            author: 'New Author',
            url: 'www.blog.com',
            likes: 9000
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('if user is able to successfully delete a blog', async () => {
        const response = await api.get('/api/blogs')
        const blogToBeDeletedID = response.body[0]._id
    
        await api
            .delete(`/api/blogs/${blogToBeDeletedID}`)
    
    
        const newResponseWithoutDeletedBlog = await Blog.find({ _id: blogToBeDeletedID})
    
        expect(newResponseWithoutDeletedBlog).toEqual([])
    })
    
    test('if user is able to successfully update a blog', async () => {
        const response = await api.get('/api/blogs')
        const blogToBeUpdatedID = response.body[0]._id
    
        await api
            .put(`/api/blogs/${blogToBeUpdatedID}`)
            .send({likes: 123})
    
    
        const newResponseWithUpdatedBlog = await Blog.find({ _id: blogToBeUpdatedID})
        const likes = newResponseWithUpdatedBlog[0].likes
    
        expect(likes).toEqual(123)
    })
})

describe('Missing data is met with the appropriate response', () => {
    test('if likes property is missing, default to 0', async () => {
        const newBlog = {
            title: 'New Blog',
            author: 'New Author',
            url: 'www.blog.com',
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
    
        const blogWithZeroLikes = await Blog.find({ title: 'New Blog' })
    
        expect(blogWithZeroLikes[0].likes).toEqual(0)
    })
    
    test('if missing title/url then api responds with 400 error', async () => {
        const newBadBlog = {
            author: 'New Author',
        }
    
        await api
            .post('/api/blogs')
            .send(newBadBlog)
            .expect(400)
    
    })
})

afterAll(() => {
  mongoose.connection.close()
})