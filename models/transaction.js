// transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  compte: { type: mongoose.Schema.Types.ObjectId, ref: 'Compte', required: true },
  type: { type: String, enum: ['dépôt', 'retrait'], required: true },
  montant: { type: Number, required: true },
  solde: { type: Number, required: true }
}, {
  timestamps: true
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = {
    Transaction
   
}