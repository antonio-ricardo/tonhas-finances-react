import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [{
        id: 1,
        title: 'show',
        value: 123,
        category: 'show',
        date: new Date(),
        type: 'DEPOSIT'
      }, {
        id: 2,
        title: 'show',
        value: 123,
        category: 'show',
        date: new Date(),
        type: 'DEPOSIT'
      }, {
        id: 3,
        title: 'show',
        value: 123,
        category: 'show',
        date: new Date(),
        type: 'DEPOSIT'
      }, {
        id: 4,
        title: 'show',
        value: 123,
        category: 'show',
        date: new Date(),
        type: 'DEPOSIT'
      }, {
        id: 5,
        title: 'show',
        value: 123,
        category: 'show',
        date: new Date(),
        type: 'DEPOSIT'
      }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', (schema, request) => {

      const transactions = schema.db.transactions

      return transactions.length > 0 ? transactions : null
    })
  }
})

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
