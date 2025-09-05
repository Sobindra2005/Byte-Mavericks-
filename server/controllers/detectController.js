

exports.detectImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }


  res.json({ message: 'Image uploaded successfully!', file: req.file });
};
