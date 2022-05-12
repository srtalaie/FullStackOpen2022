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

module.exports = {
    initialBlogs
}