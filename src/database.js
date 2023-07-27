import fs from 'node:fs/promises'

export class Database {
  #database = {}


  constructor() {
    fs.readFile('db.json', 'utf-8').then((data) => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile('db.json', JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }


    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
    return data
  }

  delete(table, id) {
    const validateUser = this.#database[table].findIndex(row => String(row.id) === String(id))
    console.log(validateUser);

    if (validateUser > -1) {
      this.#database[table].splice(validateUser, 1)

      this.#persist()
    }
  }

  update(table, id, data) {
    const validateUser = this.#database[table].findIndex(row => row.id === id)

    if (validateUser > -1) {
      data.updated_at = Date.now()

      console.log(data);

      this.#database[table][validateUser] = { id, ...data }
    }
  }

  updateTask(table, id) {
    const validateUser = this.#database[table].findIndex(row => row.id === id)


    if (validateUser > -1) {
      this.#database[table][validateUser].completed_at = Date.now()
    }
  }
}