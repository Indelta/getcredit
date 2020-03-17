const images_route = app => {
    // upload images from post editor

    app.post('/uploadImage', (req, res) => {
        if (!req.files) {
            res.send({error: true, message: "no uploaded files"});
        }
        else {
            let image = req.files.image;
            image.mv('./uploads/' + image.name);
            res.send({success: true, file: {url: "/uploads/" + image.name}});
        }
    });
}

module.exports = images_route;