import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB conectado com sucesso');
  } catch (err) {
    console.error('❌ Erro ao conectar MongoDB:', err.message);
    process.exit(1);
  }
};

export default conectarDB;