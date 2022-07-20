const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;


    const sortUsers = users.sort((a, b) => {
      if(order === 'desc') {
        return a.id < b.id ? 1 : - 1;
      }

      return a.id > b.id ? 1 : - 1;
    });

    response.send(200, sortUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      response.send(400, { error: 'User not found'});
    } else {
      response.send(200, user);
    }
  },

  createUser(request, response) {
    const { body } = request;
    
    const lastUserId = users.at(-1).id; 
    const newUser = {
      id: lastUserId + 1,
      name: body.name
    };

    users.push(newUser);

    response.send(200, newUser);
  }
}