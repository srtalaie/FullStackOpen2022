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
  
  module.exports = {
    dummy,
    totalLikes
  }