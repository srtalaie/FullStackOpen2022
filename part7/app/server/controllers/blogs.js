const jwt = require('jsonwebtoken')
const blog = require('../models/blog')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      
    const user = request.user

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
    const user = request.user

    const blogToBeDeleted = await Blog.findById({ _id: request.params.id })

    if (user.id.toString() === blogToBeDeleted.user._id.toString()) {
        const deletedBlog = await Blog.findOneAndDelete({ _id: request.params.id })
        response.send(deletedBlog)

        user.blogs = user.blogs.filter((blog) => {
            String(blog) !== String(blogToBeDeleted.id)
        })
        console.log(user.blogs)
        await user.save()

        response.status(204).end()
    } else {
        response.status(401).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const { userId, title, author, url, likes, comments } = request.body
    const user = await User.findById(userId)
    const blog = {
        title: title,
        author: author,
        url: url,
        likes: likes,
        comments: comments,
        user: userId
    }
    const updatedBlog = await Blog.findOneAndUpdate({ _id: request.params.id }, blog,  { new: true, runValidators: true, context: 'query' })

    response.json(updatedBlog)
})

module.exports = blogRouter