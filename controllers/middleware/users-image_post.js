function usersImagePost(req, res) {
    try {
        res.status(200).json({
            path: req.file.path,
        });
    } catch (err) {
        res.json({
            message: err,
        });
    }
}

module.exports = usersImagePost;