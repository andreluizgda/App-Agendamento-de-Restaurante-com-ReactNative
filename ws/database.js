const mongoose = require('mongoose');
const URI = 'mongodb+srv://ClienteUser:WXqRp8VCZkn2RMw@clusterdev.xtht3.mongodb.net/App_Agendamento_Restaurante?retryWrites=true&w=majority&appName=ClusterDev';
// ATENÇÃO: Vazar a URI do MongoDB pode representar um risco significativo para a segurança.
// Sempre armazene a URI em variáveis de ambiente ou em arquivos de configuração seguros.


mongoose.connect(URI)
    .then(() => console.log('DB is Up!'))
    .catch(err => console.log(err, 'error')); // Captura o erro, se houver
