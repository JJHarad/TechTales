import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

export default router;
/*
// Image Upload Logic - Cloudinary
   const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  // Upload to Cloudinary
  const storeImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mern-blog");
    data.append("cloud_name", "dieeirg8r");

    return new Promise((resolve, reject) => {
      fetch("https://api.cloudinary.com/v1_1/dieeirg8r/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((uploadedImage) => {
          if (uploadedImage.secure_url) {
            resolve(uploadedImage.secure_url); // Cloudinary URL
          } else {
            reject("Image upload failed");
          }
        })
        .catch((err) => reject(err));
    });
  };
*/