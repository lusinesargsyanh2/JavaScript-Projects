# Bank Account System

## Objective

Build a simple Bank Account system using JavaScript objects and object methods.

This project demonstrates how objects can store data and provide methods to manage their own state.

## Description

The system contains two bank account objects. Each account can:

- Store account owner information
- Track current balance
- Record transaction history
- Deposit money
- Withdraw money
- Transfer money to another account
- Display balance
- Display transaction history

## Account Structure

Each account contains:

- `owner` - account owner's name
- `balance` - current account balance
- `history` - list of performed operations

Example:

```javascript
const account = {
    owner: "Alice",
    balance: 1000,
    history: [],

    deposit(amount) {},
    withdraw(amount) {},
    transfer(account, amount) {},
    showBalance() {},
    showHistory() {}
};