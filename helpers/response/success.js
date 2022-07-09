
const Success200 = (res, content) => {
    res.status(200).json(content)
}

module.exports = { Success200 }

