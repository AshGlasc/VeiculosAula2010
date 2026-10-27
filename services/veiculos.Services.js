import { pool } from "../database/db.js";

class veiculosService{
    async getall() {
        const res = await pool.query("SELECT * FROM veiculos")
        return res.rows
    }

    async create({modelo, marca, ano, placa}) {
        const res = await pool.query("INSERT INTO veiculos (modelo,marca,ano,placa) VALUES ($1, $2, $3, $4) RETURNING *", [modelo,marca,ano,placa]);
        return res.rows[0]
    }

    async getbyid(id) {
        const res = await pool.query("SELECT * FROM veiculos WHERE id = $1", [id]);
        return res.rows
    }

    async delete(id) {
    const res = await pool.query("DELETE FROM veiculos WHERE id = $1", [id]);

        return{ 
           message: "excluido com sucesso"
           
            
        }
    }


 async updatePut() {
        const res = await pool.query("UPDATE veiculos SET modelo = $1, marca = $2, ano = $3, placa = $4 WHERE id = $5 RETURNING *", [modelo, marca, ano, placa, id]);
        return res.rows[0]

    }
    async updatePatch(id, campos) {
        const keys = Object.keys(campos)
        if (keys.length === 0) {
            throw new Error("É necessário informar um campo para ser atualizado");
        }

        const queryDinamica = keys.map((key, index) => `${key} = $${index + 1}`).join(", ")

        const valores = Object.values(campos)
        valores.push(id)

        const query = `UPDATE veiculos SET ${queryDinamica} WHERE id = $${valores.length} RETURNING *`

        const res = await pool.query(query, valores)
        return {
            message: "Veículo atualizado com sucesso!",
            veiculoAtualizado: res.rows[0]
        }
    }
    async updateknex(){
        const (veiculosAtualizados) = await knex('veiculos').where('id', id).update(dados).returning('*');
    }

}xz


export const veiculosServices = new veiculosService()