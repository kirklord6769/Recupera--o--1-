import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Pool de conexões com os dados que estão no arquivo .env
export const banco = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

// Testa se a conexão com o banco está funcionando
export async function conexao() {
  const conexao = await banco.getConnection();

  try {
    await conexao.query("SELECT 1");
    console.log("Conectado ao MySQL com sucesso!");
  } finally {
    conexao.release();
  }
}
