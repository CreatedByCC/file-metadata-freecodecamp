const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configure Multer 
const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
    cb(null, 'uploads/'); 
  }, filename: (req, file, cb) => { 
    cb(null, Date.now() + path.extname(file.originalname)); 
  } 
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  if(req.file) {
    const { originalname, mimetype, size } = req.file;
    res.json({
      name: originalname,
      type: mimetype,
      size: size
    });
  } else {
    res.json({ error: "No file to upload" })
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
