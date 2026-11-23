import { banco } from "../config/database.js";


export async function cadastrar(leitura) {
  const sql = `
    INSERT INTO leituras_energia
    (maquina_id, data_leitura, consumo_kwh, horas_operacao)
    VALUES (?, ?, ?, ?)
  `;

  const [resultado] = await banco.query(sql, [
    leitura.maquinaId,
    leitura.dataLeitura,
    leitura.consumoKwh,
    leitura.horasOperacao
  ]);

  return resultado.insertId;
}


export async function listar() {
  const sql = "SELECT * FROM leituras_energia ORDER BY id";
  const [resultado] = await banco.query(sql);

  return resultado;
}


export async function listarDetalhadas() {
  const sql = `
    SELECT
      l.id,
      l.maquina_id AS maquinaId,
      l.data_leitura AS dataLeitura,
      l.consumo_kwh AS consumoKwh,
      l.horas_operacao AS horasOperacao,
      m.codigo AS maquinaCodigo,
      m.nome AS maquinaNome
    FROM leituras_energia l
    INNER JOIN maquinas m ON l.maquina_id = m.id
    ORDER BY l.id
  `;

  const [resultado] = await banco.query(sql);

  return resultado;
}

export async function buscarPorId(id) {
  const sql = `
    SELECT
      id,
      maquina_id AS maquinaId,
      data_leitura AS dataLeitura,
      consumo_kwh AS consumoKwh,
      horas_operacao AS horasOperacao
    FROM leituras_energia
    WHERE id = ?
  `;

  const [resultado] = await banco.query(sql, [id]);

  return resultado[0];
}


export async function atualizar(id, leitura) {
  const sql = `
    UPDATE leituras_energia
    SET maquina_id = ?, data_leitura = ?, consumo_kwh = ?, horas_operacao = ?
    WHERE id = ?
  `;

  const [resultado] = await banco.query(sql, [
    leitura.maquinaId,
    leitura.dataLeitura,
    leitura.consumoKwh,
    leitura.horasOperacao,
    id
  ]);

  return resultado.affectedRows;
}


export async function deletar(id) {
  const sql = "DELETE FROM leituras_energia WHERE id = ?";
  const [resultado] = await banco.query(sql, [id]);

  return resultado.affectedRows;
}
