const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Bloggie 1',
        author: 'Blogger 1',
        url: 'www.url.com',
        likes: 20
    },
    {
        title: 'Bloggie 2',
        author: 'Blogger 2',
        url: 'www.url.com',
        likes: 200
    }
]

const checkForField = (blogs, field) => {
    return blogs.every( blog => {
        field in blog
    })
}

const getBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const errorWithUserCreation = async (newUser, api) => {
    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
    return response
}

module.exports = {
    initialBlogs,
    checkForField,
    getBlogs,
    errorWithUserCreation
}