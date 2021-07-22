const express = require('express')
const mysql = require('mysql2') //incluindo o pacote do MySQL2

const app = express()
app.use(express.json());
const port = 3000

const connection = mysql.createConnection({ //preparando a conexão com DB
    host: 'localhost',
    user: 'root',
    password: '2205derLEYan',
    database: 'desafio_grupo_2'
})

connection.connect() //conectando com o DB





//1- GET RETORNANDO A LISTA DE TODOS OS PRODUTOS - OK
app.get('/produto', (req, res) => {

    connection.query('SELECT * FROM produtos', function (err, rows, fields) {
        if (err) throw err

        res.send(rows);
    })
})





//2- GET RETORNANDO UM PRODUTO PELO ID - OK
app.get('/produto/:id', (req, res) => {
    connection.query('SELECT * FROM produtos where id =' + req.params.id, function (err, rows, fields) {
        if (req.params.id = !rows[0]) {
            res.status(404).json('Produto não encontrado. Informe um ID válido.')
        }
        else {
            res.json(rows)
        }
    });
})








// //3- POST INCLUINDO NOVO PRODUTO ---- loading...
// app.post('/produto', (req, res) => {

//     //
//     //
//     //FALTA EXCEÇÃO DE PRODUTO 
//     //
//     //
//     let emp = req.body;
//     var sql = "INSERT INTO produto SET idProduto = ?, descricao=?, preco=?, idDepto=?";
//     if (emp.idProduto == 0 || !emp.idProduto) {
//         res.status(400).send("ERRO 400 - BAD REQUEST!\n Informe o ID do produto que deseja cadastrar");
//     } else if (emp.preco == 0 || !emp.preco) {
//         res.status(400).send("ERRO 400 - BAD REQUEST!\n Informe o preço do produto que deseja cadastrar");
//     } else if (emp.descricao == "" || !emp.descricao) {
//         res.status(400).send("ERRO 400 - BAD REQUEST!\n Informe a descrição do produto que deseja cadastrar");
//     } else if ((emp.qtdEstoque == 0 || !emp.qtdEstoque) && (emp.disponivel == "sim" || emp.emDestaque == "sim")) {
//         res.status(400).send("ERRO 400 - BAD REQUEST!\n Se o produto em estoque está esgotado, ele não pode estar disponivel e/ou em destaque!!")
//     } else if (emp.idDepto == 0 || !emp.idDepto) {
//         res.status(400).send("ERRO 400 - BAD REQUEST!\n Informe a qual departamento seu produto pertence(coloque o ID do departamento).\n \
//         São eles:\nidDepto: 1\n Departamento: Adaptadores\n\n \
//         idDepto: 2\n Departamento: Ferramentas\n\n \
//         idDepto: 3\n Departamento: Eletrônicos\n\n \
//         idDepto: 4\n Departamento: Casa \n\n \
//         idDepto: 5\n Departamento: Acessórios \n\n \
//         idDepto: 6\n Departamento: Móveis \n\n \
//         idDepto: 7\n Departamento: Tablets e Celulares \n\n \
//         idDepto: 8\n Departamento: Games \n\n \
//         idDepto: 9\n Departamento: Informática \n\n \
//         ");
//     }
//     else {
//         mySqlConnection.query(sql,
//             [emp.idProduto, emp.descricao, emp.preco, emp.qtdEstoque, emp.disponivel, emp.emDestaque, emp.idDepto],
//             function (err, rows, fields) {

//                 if (!err) {
//                     res.send("Produto inserido com sucesso!\n Código do produto: " + emp.idProduto);
//                 } else {
//                     res.status(400).send("ERRO 400 - BAD REQUEST\nProduto já existe na base de dados!\n Código do produto: " + emp.idProduto);
//                 }
//             });
//     }
// })































//3- POST INCLUINDO NOVO PRODUTO - OK
app.post('/produto', (req, res) => {

    if (req.body.descricao == "" || req.body.preco <= 0 || req.body.departamento <= 0) {
        return res.status(400).send({ message: 'Dados inseridos de forma incorreta. Verifique os dados informados e tente novamente.' });
    }
    else {
        connection.query('INSERT INTO desafio_grupo_2.produtos (descricao, preco, departamento) VALUES ("' + req.body.descricao + '", ' + req.body.preco + ', ' + req.body.departamento + ')', (err) => {
            if (err) {
                return res.status(400).send({ message: 'Dados inseridos de forma incorreta. Verifique os dados informados e tente novamente.' });
            }
            res.status(201).send({ message: 'Dados inseridos com sucesso.' });
        });
    }
})




//4- PUT ALTERANDO UM PRODUTO ---- loading...
app.put('/produto/:id', (req, res) => {

    let emp = req.body;
    connection.query('UPDATE produtos SET descricao=?, preco=?, departamento=? WHERE idProduto =?',
            [emp.descricao, emp.preco, emp.departamento, req.params.id],
            function (err, result, fields) {
                if (result.affectedRows == 0) {
                    res.status(404).json({message:'Esse produto não existe, verifique os dados indicados e tente novamente!'})
                } else {
                    res.status(200).json({message:"Produto atualizado com sucesso!\n Código do produto: " + req.params.id});
                }
            }
        );
})






// app.put('/produto/:id', (req, res) => {
//     let emp = req.body;
//     if (emp.preco == 0 || !emp.preco) {
//         res.status(400).send("ERRO 400 - BAD REQUEST!\n Informe o preço do produto que deseja atualizar");
//     } else if (emp.descricao == "" || !emp.descricao) {
//         res.status(400).send("ERRO 400 - BAD REQUEST!\n Informe a descrição do produto que deseja atualizar");
//     } else if (emp.departamento == 0 || !emp.departamento) {
//         res.status(400).json({message:"Informe a qual departamento seu produto pertence(coloque o ID do departamento).\n \
//         São eles:\ndepartamento: 1\n Departamento: Adaptadores\n\n \
//         departamento: 2\n Departamento: Ferramentas\n\n \
//         departamento: 3\n Departamento: Eletrônicos\n\n \
//         departamento: 4\n Departamento: Casa \n\n \
//         departamento: 5\n Departamento: Acessórios \n\n \
//         departamento: 6\n Departamento: Móveis \n\n \
//         departamento: 7\n Departamento: Tablets e Celulares \n\n \
//         departamento: 8\n Departamento: Games \n\n \
//         departamento: 9\n Departamento: Informática \n\n \
//         ");
//     }
//     else {
//         connection.query('UPDATE produtos SET descricao=?,departamento=? WHERE id =?',
//             [emp.descricao, emp.preco, emp.departamento, req.params.id],
//             function (err, result, fields) {
//                 if (err) {
//                     console.log(err)
//                     res.status(404).send('ERRO 404 - NOT FOUND\nEsse produto não existe, verifique os dados indicados e tente novamente!')
//                 } else {
//                     res.status(200).send("Produto atualizado com sucesso!\n Código do produto: " + req.params.id);
//                 }
//             }
//         );
//     }
// })








//5 - GET RETORNANDO A LISTA DE TODOS OS DEPARTAMENTOS - OK
app.get('/departamento', (req, res) => {

    connection.query('SELECT * FROM departamentos', function (err, rows, fields) {
        if (err) throw err

        res.send(rows);
    })
})





//6 - GET RETORNANDO A LISTA DE TODOS OS PRODUTOS POR DEPARTAMENTO - OK
app.get('/departamento/:id', (req, res) => {
    connection.query('select * from produtos inner join departamentos on produtos.departamento = departamentos.id where departamentos.id =' + req.params.id, function (err, rows, fields) {
        if (req.params.id = !rows[0]) {
            res.status(404).json('Departamento não encontrado. Informe um ID válido.')
        }
        else {
            res.json(rows)
        }
    });
})










//EXEMPLOOOOO
// app.get('/produto/:id', (req, res) => {

//     connection.query('SELECT * FROM produtos WHERE id = ' + req.params.id + 'NOVA BUSCA NO DB' + req.params.oquefor, function (err, rows, fields) {
//         if (err) throw err

//         res.send(rows);
//       })

// })

//EXEMPLO PARA PUXAR STATUS
//res.status(xxx).send(rows)












app.listen(port, () => {
    console.log("Server running")
})
