const cloudinary = require("../../helpers/img-upload/cloundinary");
const fs = require("fs");

const uploadImages = async (req, res) => {
    try {
        const urls = [];
        const files = req.files;
        const cloudOptions = {
            folder: "Public/user/uploads",
            unique_filename: true,
        };

        if (files.length > 1) {
            for (const file of files) {
                const { path } = file;
                const upload = await cloudinary.uploader.upload(path, cloudOptions);
                urls.push(upload.url);
                fs.unlinkSync(path);
            }
            return res.status(200).send(urls);
        }
        for (const file of files) {
            const { path } = file;
            const upload = await cloudinary.uploader.upload(path, cloudOptions);
            urls.push(upload.url);
            fs.unlinkSync(path);
            break;
        }
        return res.status(200).json(urls[0]);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    uploadImages
}