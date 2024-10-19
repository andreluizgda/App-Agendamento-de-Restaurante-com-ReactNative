const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Configuração das credenciais da AWS usando o SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  },
});

module.exports = {
  BUCKET_NAME: process.env.BUCKET_NAME,
  
  // Função para upload de arquivos no S3 usando AWS SDK v3
  uploadToS3: async function (file, filename, acl = 'public-read') {
    try {
      const params = {
        Bucket: this.BUCKET_NAME,
        Key: filename,
        Body: file.data,
        ACL: acl,
      };

      const command = new PutObjectCommand(params);
      const response = await s3Client.send(command);

      console.log(response);
      return { error: false, message: response };
    } catch (err) {
      console.log(err);
      return { error: true, message: err };
    }
  },

  // Função para deletar arquivos no S3 usando AWS SDK v3
  deleteFileS3: async function (key) {
    try {
      const params = {
        Bucket: this.BUCKET_NAME,
        Key: key,
      };

      const command = new DeleteObjectCommand(params);
      const response = await s3Client.send(command);

      console.log(response);
      return { error: false, message: response };
    } catch (err) {
      console.log(err);
      return { error: true, message: err };
    }
  },
};
