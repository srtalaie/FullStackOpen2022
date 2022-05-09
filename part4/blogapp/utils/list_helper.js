const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let initialVal = 0
    const reducedBlogs = blogs.reduce((prevValue, currentValue) => {
        return prevValue + currentValue.likes
    }, initialVal)

    return blogs.length === 0 ? 0 : reducedBlogs

}

const favoriteBlog = (blogs) => {
    let maxLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
    let group = _.countBy(blogs, function(item){return item.author})
    let maxAuthor = _.maxBy(Object.keys(group), o => group[o])
    let result = {
        author: maxAuthor,
        blogs: group[maxAuthor]
    }
    return result
}

const mostLikes = (blogs) => {
    let totalLikes = _.chain(blogs)
        .groupBy('author')
        .map((group, key) => ({ key, val : _.sumBy(group, 'likes') }))
        .value()
    let result = totalLikes.reduce(function(prev, current) {
        if (current.val > prev.val) {
            return current
        } else {
            return prev
        }
    })
    let cleanResult = {
        'author': result.key,
        'likes': result.val
    }
    return cleanResult
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}