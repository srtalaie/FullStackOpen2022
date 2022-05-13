const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.find({ _id: request.params.id })
    response.json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
    const deletedBlog = await Blog.findOneAndDelete({ _id: request.params.id })

    response.send(deletedBlog)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }
    const updatedBlog = await Blog.findOneAndUpdate({ _id: request.params.id }, blog,  { new: true, runValidators: true, context: 'query' })

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogRouter