// SOLID

// User
class User {
    static #id = 0;
    constructor(name, email, phone, address, type) {
        this.id = ++User.#id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.type = type;
    }

    generateProfileReport() {
        console.log(
            `Generating profile report for ${this.name}`
        );
    }
}
/////// Restaurant
class Restaurant {
    static #id = 0;
    constructor(name, address) {
        this.id = ++Restaurant.#id;
        this.name = name;
        this.address = address;
        this.menu = [];
    }

    addDish(dish) {
        this.menu.push(dish);
    }

    removeDish(dishId) {
        this.menu = this.menu.filter(
            dish => dish.id !== dishId
        );
    }


}
/////// Dish

class Dish {
    static #id = 0;

    constructor(name, price, type) {
        this.id = ++Dish.#id;
        this.name = name;
        this.price = price;
        this.type = type;
    }


}

///// Order

class Order {
    static #id = 0;
    constructor(user, restaurant) {
        this.id = ++Order.#id;
        this.user = user;
        this.restaurant = restaurant;
        this.items = [];
        this.status = "created";
    }

    addItem(dish, quantity) {
        this.items.push({
            dish,
            quantity
        });
    }

    calculateTotal() {
        let total = 0;

        // for (const item of this.items) {
        //     total +=
        //         item.dish.price *
        //         item.quantity;
        // }
        total = this.items.reduce(
            (total, item) =>
                total + item.dish.price * item.quantity,
            0
        );

        return total;
    }



    generateInvoice() {
        console.log(
            `Generating invoice for order ${this.id}`
        );
    }

    cancel() {
        if (this.status === "delivered") {
            throw new Error(
                "Delivered order cannot be cancelled"
            );
        }

        this.status = "cancelled";
    }
}
/////// PaymentService

class Payment {
    pay(amount) {
        throw new Error("is abstract method need to be changed in child class");
    }
    refund(amount) {
        throw new Error("is abstract method need to be changed in child class");
    }
}

class PaymentCard extends Payment {
    pay(amount) {
        console.log(
            `Charging card: ${amount}`
        );
    }
    refund(amount) {
        console.log(
            `Refunding card: ${amount}`
        );
    }
}
class PaymentPayPal extends Payment {
    pay(amount) {
        console.log(
            `Charging PayPal: ${amount}`
        );
    }
    refund(amount) {
        console.log(
            `Refunding PayPal: ${amount}`
        );
    }
}
class PaymentCrypto extends Payment {
    pay(amount) {
        console.log(
            `Charging crypto wallet: ${amount}`
        );
    }
    refund(amount) {
        console.log(
            `Refunding crypto: ${amount}`
        );
    }
}
class PaymentCash extends Payment {
    pay(amount) {
        console.log(
            `Cash payment: ${amount}`
        );
    }
    refund(amount) {
        throw new Error(
            "Cash cannot be refunded"
        );
    }
}
/////// DeliveryService

class Delivery {
    deliver(order) {
        throw new Error("is abstract method need to be changed in child class");
    }
}

class CourierDelivery extends Delivery {
    deliver(order) {
        console.log(
            `Courier delivers order ${order.id} to ${order.user.address}`
        );
    }
}
class PickupDelivery extends Delivery {
    deliver(order) {
        console.log(
            `User will pick up order ${order.id}`
        );
    }
}
class DroneDelivery extends Delivery {
    deliver(order) {
        console.log(
            `Drone delivers order ${order.id}`
        );
    }
}
///////////NotificationService
class Notification {
    sendMsg(user, message) {
        throw new Error("is abstract method need to be changed in child class");
    }
}
class NotificationEmail extends Notification {
    sendMsg(user, message) {
        console.log(
            `Sending email to ${user.email}: ${message}`
        );
    }
}

class NotificationSMS extends Notification {
    sendMsg(user, message) {
        console.log(
            `Sending SMS to ${user.phone}: ${message}`
        );
    }
}
class NotificationPush extends Notification {
    sendMsg(user, message) {
        console.log(
            `Push notification to user ${user.name}: ${message}`
        );
    }
}
class NotificationEmailToOwner extends Notification {
    sendMsg(user, message) {
        console.log(
            `Sending email to restaurant owner: ${message}`
        );
    }
}
///////// DiscountService


class Discount {
    calculateDiscount(user, order, price) {
        throw new Error("is abstract method need to be changed in child class");
    }
}
class DiscountRegular extends Discount {
    calculateDiscount(user, order, price) {
        return 0;
    }
}
class DiscountVip extends Discount {
    calculateDiscount(user, order, price) {
        return order.calculateTotal() * 0.1;
    }
}
class DiscountEmployee extends Discount {
    calculateDiscount(user, order, price) {
        return order.calculateTotal() * 0.3;
    }
}
class DiscountNewUser extends Discount {
    calculateDiscount(user, order, price) {
        return order.calculateTotal() * 0.2;
    }
}

class DiscountPizza extends Discount {
    calculateDiscount(user, order, price) {
        return price * 0.10; // 10%
    }
}
class DiscountBurger extends Discount {
    calculateDiscount(user, order, price) {
        return price * 0.05; // 5%
    }
}
class DiscountDessert extends Discount {
    calculateDiscount(user, order, price) {
        return price * 0.10; // 10%

    }
}
/// multiple  discounts 
class DiscountComposite extends Discount {
    constructor(discounts) {
        super();
        this.discounts = discounts;
    }

    calculateDiscount(user, order, price) {
        let totalDiscount = 0;

        for (const discount of this.discounts) {
            totalDiscount += discount.calculateDiscount(
                user,
                order,
                price
            );
        }

        return totalDiscount;
    }
}
///////// Database

class Database {
    saveUser(user) {
        console.log(
            "Saving user to MySQL..."
        );
    }

    saveRestaurant(restaurant) {
        console.log(
            "Saving restaurant to MySQL..."
        );
    }

    saveOrder(order) {
        console.log(
            "Saving order to MySQL..."
        );
    }

    saveDish(dish) {
        console.log(
            "Saving dish to MySQL..."
        );
    }
}
/////OrderService

class OrderService {

    constructor(
        database,
        payment,
        delivery,
        notification,
        discount,
        ownerNotification
    ) {
        this.database = database;
        this.payment = payment;
        this.delivery = delivery;
        this.notification = notification;
        this.discount = discount;
        this.ownerNotification = ownerNotification;
    }


    createOrder(user, restaurant, items) {
        const order = new Order(user, restaurant);

        for (const item of items) {
            order.addItem(item.dish, item.quantity);
        }

        const total = order.calculateTotal();

        const discount = this.discount.calculateDiscount(
            user,
            order,
            total
        );

        const finalPrice = total - discount;

        this.payment.pay(finalPrice);

        this.delivery.deliver(order);

        this.notification.sendMsg(
            user,
            `Order ${order.id} was created. Total: ${finalPrice}`
        );

        // Restaurant owner notification
        this.ownerNotification.sendMsg(
            restaurant,
            `New order ${order.id}`
        );

        this.database.saveOrder(order);

        console.log(
            `Order created. Final price: ${finalPrice}`
        );

        return order;
    }
}



////////////// Example  
const user1 = new User(
    "James",
    "james@gmail.com",
    "+37499123456",
    "Yerevan, Armenia",
    "vip"
);

const restaurant = new Restaurant(
    "Pizza",
    "Yerevan"
);

const pizza = new Dish(
    "Margherita Pizza",
    5000,
    "pizza"
);

const burger = new Dish(
    "Cheese Burger",
    3500,
    "burger"
);


const dessert = new Dish(
    "Chocolate Cake",
    2500,
    "dessert"
);

restaurant.addDish(pizza);
restaurant.addDish(burger);
restaurant.addDish(dessert);


// Services
const database = new Database();
const payment = new PaymentCard();
const delivery = new CourierDelivery();
const notification = new NotificationEmail();
const ownerNotification = new NotificationEmailToOwner();


// discount 
const discount = new DiscountComposite([
    new DiscountVip(),
    new DiscountPizza(),
    new DiscountBurger()
]);
const orderService = new OrderService(
    database,
    payment,
    delivery,
    notification,
    discount,
    ownerNotification
);

// Create order
const order = orderService.createOrder(
    user1,
    restaurant,
    [
        {
            dish: pizza,
            quantity: 2
        },
        {
            dish: burger,
            quantity: 1
        }
    ]
);