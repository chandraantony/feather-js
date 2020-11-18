const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const {decrypt , encrypt} = require('../../../helpers/index');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), async context => {
      if(context.params.query.email){
        context.params.query.email = encrypt(context.params.query.email);
      }
      return context;
    }],
    get: [ authenticate('jwt') ],
    create: [hashPassword('password') , async context => {
      context.data.email = encrypt(context.data.email);
      return context;
    }],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [async context => {
      context.result.data.forEach(element => {
        element.email = decrypt(element.email);
      });
      return context;
    },],
    get: [async context => {
      context.result.email = decrypt(context.result.email);
      return context;
    },],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
