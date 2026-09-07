class Product {
    static #id = 0;
    constructor(name, price) {
        this.id = ++Product.#id;
        this.name = name;
        this.price = price;
    }
}

class Order {
    static #id = 0;
    constructor() {
        this.id = ++Order.#id;
        this.products = [];
        this.status = "PENDING";
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(productId) {
        this.products = this.products.filter(
            product => product.id !== productId
        );
    }
    getProducts() {
        return this.products;
    }
    calculateSubtotal() {
        return this.products.reduce(
            (total, product) => total + product.price,
            0
        );
    }
}

//// Discount
class Discount {
    apply(subtotal) {
        throw new Error("is abstract method need to be changed in child class");
    }
}


class NoDiscount extends Discount {
    apply(subtotal) {
        return subtotal;
    }
}


class PercentageDiscount extends Discount {
    constructor(percent) {
        super();
        this.percent = percent;
    }

    apply(subtotal) {
        return subtotal - subtotal * (this.percent / 100);
    }
}


class FixedDiscount extends Discount {
    constructor(amount) {
        super();
        this.amount = amount;
    }

    apply(subtotal) {
        return subtotal - this.amount;
    }
}


//// Payment

class Payment {
    pay(amount) {
        throw new Error("is abstract method need to be changed in child class");
    }
}

class CreditCardPayment extends Payment {
    pay(amount) {
        console.log(`Paid $${amount} with Credit Card`);

        return true;
    }
}


class PayPalPayment extends Payment {
    pay(amount) {
        console.log(`Paid $${amount} with PayPal`);

        return true;
    }
}


class CryptoPayment extends Payment {
    pay(amount) {
        console.log(`Paid $${amount} with Crypto`);

        return true;
    }
}

/// Notification

class Notification {
    send(order) {
        throw new Error("is abstract method need to be changed in child class");

    }
}

class EmailNotification extends Notification {
    send(order) {
        console.log(
            `Email notification sent. Order status: ${order.status}`
        );
    }
}


class SMSNotification extends Notification {
    send(order) {
        console.log(
            `SMS notification sent. Order status: ${order.status}`
        );
    }
}


class TelegramNotification extends Notification {
    send(order) {
        console.log(
            `Telegram notification sent. Order status: ${order.status}`
        );
    }
}

//// Save in db

class Database {
    save(order) {
        throw new Error("is abstract method need to be changed in child class");
    }
}

class OrderArray extends Database {
    constructor() {
        super();
        this.orders = [];
    }

    save(order) {
        this.orders.push(order);
        console.log("Order saved");
    }
}

class MySQLDatabase extends Database {
    save(order) {
        console.log("Order saved");
    }
}

class PostgreSQL extends Database {
    save(order) {
        console.log("Order saved");
    }
}

class FileStorage extends Database {
    save(order) {
        console.log("Order saved");
    }
}

////// Checkout 
class CheckoutService {
    constructor(payment, discount, notification, repository) {
        this.payment = payment;
        this.discount = discount;
        this.notification = notification;
        this.repository = repository;
    }
    checkout(order) {
        // Cannot pay empty order
        if (order.getProducts().length === 0) {
            throw new Error("Cannot pay an empty order");
        }

        const subtotal = order.calculateSubtotal();

        console.log(`Subtotal: $${subtotal}`);

        let finalPrice = Math.max(0, this.discount.apply(subtotal));

        const success = this.payment.pay(finalPrice);

        if (!success) {
            throw new Error("Payment failed");
        }

        order.status = "PAID";

        this.notification.send(order);

        this.repository.save(order);
    }
}

const iphone = new Product("iPhone", 1000);
const macbook = new Product("MacBook", 2000);

const order = new Order();

order.addProduct(iphone);
order.addProduct(macbook);

const payment = new CreditCardPayment();

const discount = new PercentageDiscount(10);

const notification = new EmailNotification();

const repository = new OrderArray();

const checkout = new CheckoutService(
    payment,
    discount,
    notification,
    repository
);

checkout.checkout(order);