import { db } from "./SQLite";

export function criaTabela() {
    db.transaction((transaction) => {
        transaction.executeSql(
            "CREATE TABLE IF NOT EXISTS " +
                "notas " +
                "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);"
        );
    });
}

export async function adicionaNota(nota) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                "INSERT INTO notas(titulo, categoria, texto) VALUES(?,?,?);",
                [nota.titulo, nota.categoria, nota.texto],
                () => {resolve("Nota adicionada com sucesso!")}
            );
        });
    });
}

export async function atualizaNota(nota) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                "UPDATE notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;",
                [nota.titulo, nota.categoria, nota.texto, nota.id],
                () => {resolve("Nota atualizada com sucesso!")}
            );
        });
    });
}

export async function removeNota(nota) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                "DELETE FROM notas WHERE id = ?;",
                [nota.id],
                () => {resolve("Nota removida com sucesso!")}
            );
        });
    });
}

export async function buscaNotas(categoria) {
    let query = "SELECT * FROM notas";
    let params = [];
    if (categoria != "Todos") {
        query += " WHERE categoria = ?";
        params.push(categoria);
    }
    query += ";";
    console.log(categoria);
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                query,
                params,
                (transaction, resultados) => {resolve(resultados.rows._array)}
            );
        });
    });
}




export function deletaTabela() { 
    db.transaction((transaction) => { 
        transaction.executeSql("DROP TABLE IF EXISTS notas;")
    })
}