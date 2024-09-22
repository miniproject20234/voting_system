const multer = require('multer');
const path = require('path');
const User = require('../model/regUser'); // Import your model correctly
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, '..', 'images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File filter to accept only image formats
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Multer middleware
const upload = multer({ storage, fileFilter });

// Controller function to upload profile image
const uploadProfileImage = async (req, res) => {
    try {
        const email = req.query.email || req.headers.email; // Get email from query params or headers
        const photo = req.file ? req.file.filename : null;

        if (!email) {
            return res.status(400).json({ error: 'Email is required to update profile' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's name and photo, but do not update password or confirmPassword
        if (req.body.name) user.name = req.body.name;
        if (photo) user.photo = photo;

        // Save the updated user data
        await user.save();
        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (err) {
        console.error('Error updating user profile:', err.message);
        res.status(400).json({ error: 'Error updating user profile: ' + err.message });
    }
};




// Function to remove the image
const removePhoto = async (req, res) => {
    const { email } = req.query;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user || !user.photo) {
            return res.status(404).json({ error: 'User or photo not found' });
        }

        // Get the image file path from the user's photo field
        const imagePath = path.join(__dirname, '..', 'images', user.photo);

        // Remove the image file from the server
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error removing image file:', err);
                return res.status(500).json({ error: 'Failed to remove image file' });
            }
        });
        // Unset the photo field in MongoDB
        await User.findOneAndUpdate({ email }, { $unset: { photo: '' } });

        res.status(200).json({ message: 'Image removed successfully' });
    } catch (err) {
        console.error('Error removing image:', err.message);
        res.status(500).json({ error: 'Failed to remove image' });
    }
};

module.exports.uploadProfileImage = [upload.single('photo'), uploadProfileImage];
module.exports.removePhoto = removePhoto;