function productsImagePost(req, res) {
    try {
        res.status(200).json({
            paths: req.files.map((file) => {
                return(file.path);
            }),
        });
    } catch (err) {
        res.json({
            message: err,
        });
    }
}

module.exports = productsImagePost;