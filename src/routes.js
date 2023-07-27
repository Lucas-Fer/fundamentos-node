import { Database } from './database.js'
const database = new Database();
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query

      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)

      return res
        .end(JSON.stringify(users))
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const users = database.select('tasks', search ? {
        name: search,
        email: search
      } : null)

      return res
        .end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user)

      return res.writeHead(201).end('Criação de usuário')
    }
  },

  {
    method: 'POST',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: Date.now(),
        completed_at: '',
        updated_at: '',
      }

      database.insert('tasks', task)

      return res.writeHead(201).end('Tarefa criada')
    }
  },

  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {

      const { id } = req.params

      database.delete('users', id)

      return res.writeHead(204).end()
    }
  },

  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {

      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {

      const { id } = req.params
      const { name, email } = req.body

      database.update('users', id, { name, email })

      return res.writeHead(204).end()
    }
  },

  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {

      const { id } = req.params
      const { title, description } = req.body

      database.update('tasks', id, { title, description })

      return res.writeHead(204).end()
    }
  },

  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {

      const { id } = req.params

      database.updateTask('tasks', id)

      return res.writeHead(204).end()
    }
  },
]