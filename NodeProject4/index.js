const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer  = require('multer') // Multer per fare upload di file
const cloudinary = require('cloudinary').v2; // Cloudinary per salvare i file nel cloud
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // CloudinaryStorage per metter in collegamento Multer e Cloudinary

const sgMail = require('@sendgrid/mail'); // inviare email
sgMail.setApiKey('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')

const app = express();

// Upload File in locale tramite Multer
//const upload = multer({ dest: 'uploads/' })
/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage }) */
// Fine Upload File in locale tramite Multer

// Upload File nel Cloud tramite multer cloudinary
// Configuration 
cloudinary.config({
    cloud_name: "dvymthoja",
    api_key: "579949874516564",
    api_secret: "CNaELVH4XI2idgyJqPH72wgDjyY"
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads/',
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => file.originalname,
    },
  });
   
  const upload = multer({ storage: storage });
  // Fine Upload File nel Cloud tramite multer cloudinary

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoints

app.post('/upload', upload.single('uploadFile'), (req, res) => {
    const data = req.file;
    console.log(data)
    res.status(200).json({...data})
})

app.post('/mail', (req, res) => {
    const msg = {
        to: 'ghibli20tre@gmail.com', // Change to your recipient
        from: 'info@emanueleumberto.it', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sgMail.send(msg).then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
        res.status(response[0].statusCode).json({...response})
    }).catch((error) => {
        console.error(error)
        res.status(response[0].statusCode).json({...error})
  })
})

mongoose
    .connect('mongodb+srv://admin:root@cluster0.rpwcfk4.mongodb.net/MioDB')
    .then(response => {
        console.log("DB Connected...");
        app.listen(3000, async () => console.log("Server listening on port " + 3000))
    }).catch(err => console.log(err))
