const UserController = require('./src/controllers/user');

module.exports = [
  {
    method: 'GET',
    path: '/dogs',
    handler: UserController.list
  },
  {
    method: 'GET',
    path: '/dogs/{id}',
    handler: UserController.get
  },
  {
    method: 'POST',
    path: '/dogs',
    handler: UserController.create
  },
  {
    method: 'PUT',
    path: '/dogs/{id}',
    handler: UserController.update
  },
  {
    method: 'DELETE',
    path: '/dogs/{id}',
    handler: UserController.remove
  }
]