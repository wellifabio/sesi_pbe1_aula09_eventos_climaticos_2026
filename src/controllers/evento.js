 const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, nivelImpacto } = req.body
    try {
        const sql = 'INSERT INTO evento (usuarioId, cidade, tipoEvento, temperaturaMaxima, nivelImpacto) VALUES (?, ?, ?, ?, ?);'
        con.query(sql, [usuarioId, cidade, tipoEvento, temperaturaMaxima, nivelImpacto], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar evento' })
            } else {
                const novoevento = req.body
                novoevento.id = results.insertId
                res.status(201).json({ message: 'Evento cadastrado com sucesso', event: novoevento })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe { usuarioId, cidade, tipoEvento, temperaturaMaxima, nivelImpacto }' })
    }
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM evento;'
    con.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar eventos' })
        } else {
            res.json(results)
        }
    })
}

module.exports = {
    cadastrar,
    listar
}