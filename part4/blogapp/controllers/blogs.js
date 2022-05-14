const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findById(body.user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

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
    const { userId, title, author, url, likes } = request.body
    const user = await User.findById(userId)
    const blog = {
        title: title,
        author: author,
        url: url,
        likes: likes,
        user: user
    }
    const updatedBlog = await Blog.findOneAndUpdate({ _id: request.params.id }, blog,  { new: true, runValidators: true, context: 'query' })

    response.json(updatedBlog)
})

module.exports = blogRouter