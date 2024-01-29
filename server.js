const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sunucuda dosyaların depolanacağı dizin
const uploadDir = path.join(__dirname, 'uploads');

// Eğer uploads dizini yoksa oluştur
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Multer ayarı
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Form verilerini almak ve dosyayı yüklemek için POST endpoint'i
app.post('/submitForm', upload.single('profilFoto'), (req, res) => {
    const formData = req.body;
    const profileImage = req.file;

    // Verileri konsola yazdır
    console.log('Alınan Form Verileri:', formData);
    
    // Profil fotoğrafı varsa, dosyayı kaydet
    if (profileImage) {
        console.log('Profil Fotoğrafı:', profileImage);
    }

    res.status(200).send('Form başarıyla alındı.');
});

// Sunucuyu dinle
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
