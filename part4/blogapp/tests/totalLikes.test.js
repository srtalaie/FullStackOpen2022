const listHelper = require('../utils/list_helper')

describe('Total Likes', () => {
    const emptyList = []
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
    ]
    const listWithMultipleBlogs = [
        {
            "_id": "62783933c782843dd1196021",
            "title": "Blog 1",
            "author": "Arthur Blog",
            "url": "https://www.google.com",
            "likes": 10,
            "__v": 0
        },
        {
            "_id": "62783bba1a3f8e92df1ce374",
            "title": "Blog 2",
            "author": "Arthur Blog",
            "url": "https://www.google.com",
            "likes": 1,
            "__v": 0
        },
        {
            "_id": "62783cc4a678c8b0af78d317",
            "title": "Blog 3",
            "author": "Arthur Blog",
            "url": "https://www.google.com",
            "likes": 25,
            "__v": 0
        },
        {
            "_id": "62783e67c3fb9c58721b682c",
            "title": "Blog 4",
            "author": "Arthur Blog",
            "url": "https://www.google.com",
            "likes": 17,
            "__v": 0
        },
        {
            "_id": "62783f1e3570494144c8a6c9",
            "title": "Blog 5",
            "author": "Arthur Blog",
            "url": "https://www.google.com",
            "likes": 6,
            "__v": 0
        }
    ]
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('of a list containing one blog equals total likes for that one blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a list containing multiple blogs equals total sum of all the likes', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(59)
    })
})