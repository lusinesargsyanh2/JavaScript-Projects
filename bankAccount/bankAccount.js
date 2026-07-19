const account1 = {
    owner: "Alice",
    balance: 1000,
    history: [],

    deposit(amount) {
        if (!amount || typeof amount !== "number") {
            console.log("Invalid deposit amount.");
        } else if (amount <= 0) {
            console.log("Amount must be greater than zero.");
        } else {
            this.balance += amount;
            this.history.push(`Deposited: $${amount}`);
            console.log(`Amount successfully added. Your balance is ${this.balance}`);

        }
    },

    withdraw(amount) {

        if (amount <= 0) {
            console.log("Amount must be greater than zero.");
        } else if (amount > this.balance) {
            console.log("There are insufficient funds in your balance");

        } else {
            this.balance -= amount;
            this.history.push(`Withdraw: $${amount}`);
            console.log(`You successfully withdraw money. Your balance is ${this.balance}`);
        }
    },

    transfer(account, amount) {
        if (amount <= 0) {
            console.log("Amount must be greater than zero.");
        } else if (amount > this.balance) {
            console.log("There are insufficient funds in your balance");

        } else {
            this.balance -= amount;
            account.balance += amount;
            this.history.push(`Transfer send to ${account.owner}: $${amount}`);
            account.history.push(`Transfer get from ${this.owner}: $${amount}`);
            console.log(`You successfully transfer money. Your balance is ${this.balance}`);
        }
    },

    showBalance() {
        console.log(`${this.owner}'s balance: ${this.balance}`);
    },

    showHistory() {
        if (this.history.length > 0) {
            console.log(`${this.owner} history:`);

            for (let i = 0; i < this.history.length; i++) {

                console.log(this.history[i]);


            }
        } else {
            console.log("No history yet");

        }
    },
};

const account2 = {
    owner: "James",
    balance: 4000,
    history: [],

    deposit: account1.deposit,

    withdraw: account1.withdraw,

    transfer: account1.transfer,

    showBalance: account1.showBalance,

    showHistory: account1.showHistory,
};


account1.showBalance();
account2.showBalance();

account1.deposit(500);

account2.deposit(300);

account1.withdraw(200);

account2.withdraw(100);

account1.transfer(account2, 400);

account1.showBalance();
account2.showBalance();


account1.showHistory();
account2.showHistory();
