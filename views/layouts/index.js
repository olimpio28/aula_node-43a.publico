const express = required("express")
const exphbs = required("express-handlebars")
const mysql = required("mysql2")


const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({
      extended: true 
}))

// crud -> create, read, update, delete

app.use(express.json())

app.post("/register/save", (request, response) => {


    const {title, pageqty} = request.body

    const query = ' INSERT INTO  books (title, pageqty)'
    VALUES ('${title}','${pageqty}')

    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.redirect("/")
    })

})

app.get("/register", (request, response) => {
    response.render("registrer")
})

app.get("/", (request, response) => {
    const sql = 'SELECT * FROM books'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const books = data

        response.render("home", {books})
    })
    
    })

const conn = mysql.createConection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
})

conn.connect((error) => {
    if(error) {
        console.log(error)
        return
    }
    console.log("Conectado ao Mysql!")

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000!")

    })
})