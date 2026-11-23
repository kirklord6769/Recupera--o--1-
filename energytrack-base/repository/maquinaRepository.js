import { banco } from "../config/database.js";


export async function cadastrar(maquina) {
  const sql = `
    INSERT INTO maquinas (codigo, nome, setor, status)
    VALUES (?, ?, ?, ?)
  `;

  const [resultado] = await banco.query(sql, [
    maquina.codigo,
    maquina.nome,
    maquina.setor,
    maquina.status
  ]);

  return resultado.insertId;
}


export async function listar() {
  const sql = "SELECT * FROM maquinas ORDER BY id";
  const [resultado] = await banco.query(sql);

  return resultado;
}


export async function buscarPorId(id) {
  const sql = "SELECT * FROM maquinas WHERE id = ?";
  const [resultado] = await banco.query(sql, [id]);

  return resultado[0];
}


export async function atualizar(id, maquina) {
  const sql = `
    UPDATE maquinas
    SET codigo = ?, nome = ?, setor = ?, status = ?
    WHERE id = ?
  `;

  const [resultado] = await banco.query(sql, [
    maquina.codigo,
    maquina.nome,
    maquina.setor,
    maquina.status,
    id
  ]);

  return resultado.affectedRows;
}


export async function deletar(id) {
  const sql = "DELETE FROM maquinas WHERE id = ?";
  const [resultado] = await banco.query(sql, [id]);

  return resultado.affectedRows;
}
