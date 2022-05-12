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

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier _id exists', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach((blog) => {
        expect(blog._id).toBeDefined()
    })
})

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

afterAll(() => {
  mongoose.connection.close()
})