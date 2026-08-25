// custom datebase
const users = [];
const products = [];
const orders = [];
const shops = [];

class User {
    #id = User.sequalNumber++;
    #name;
    #age;
    #gender;
    #address;
    #email;
    #password;
    #payment;
    #shop = null;
    #cart = [];
    #history = [];
    #isLogin = false;

    static sequalNumber = 1;
    static GENDER_TYPES = ["MALE", "FEMALE"];
    static PAYMENT_TYPES = ["Paypal", "ApplePay", "card"];
    static EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    static REGEX = {
        EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };

    constructor(
        name,
        age,
        gender,
        address,
        email,
        password,
        payment,
        shop_name,
    ) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.email = email;
        this.password = password;
        this.payment = payment;
        this.#shop = new Shop(shop_name);
    }

    // getter / setter

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        if (typeof name !== "string") {
            throw new Error("the name must be string");
        }

        const normaliezedName = name.trim();
        if (
            !normaliezedName ||
            normaliezedName.length < 3 ||
            normaliezedName.length > 20
        ) {
            throw new Error("Invalid name");
        }

        if (normaliezedName.startsWith("<")) {
            throw new Error("the name can't start with '<' ");
        }

        this.#name = normaliezedName;
    }

    get age() {
        return this.#age;
    }

    set age(age) {
        if (typeof age !== "number") {
            throw new Error("the age must be a number");
        }

        if (age < 1 || age > 100) {
            throw new Error("Invalid age");
        }

        this.#age = age;
    }

    get gender() {
        return this.#gender;
    }

    set gender(gen) {
        if (!User.GENDER_TYPES.includes(gen)) {
            throw new Error("Invalid gender");
        }

        this.#gender = gen;
    }

    get address() {
        return this.#address;
    }

    set address(addr) {
        if (typeof addr !== "string") {
            throw new Error("Invalid address");
        }

        this.#address = addr;
    }

    get email() {
        return this.#email;
    }

    set email(em) {
        if (!User.REGEX.EMAIL_PATTERN.test(em)) {
            throw new Error("Invalid email");
        }

        this.#email = em;
    }

    get password() {
        return this.#password;
    }

    set password(pass) {
        if (!User.REGEX.PASSWORD_PATTERN.test(pass)) {
            throw new Error("Invalid password");
        }

        this.#password = pass;
    }

    get payment() {
        return this.#payment;
    }

    set payment(type) {
        if (!User.PAYMENT_TYPES.includes(type)) {
            throw new Error("Invalid type for payment");
        }

        this.#payment = type;
    }

    get isLogin() {
        return this.#isLogin;
    }

    get shop() {
        return this.#shop;
    }

    // user main functionality
    login(email, password) {
        if (email !== this.email || password !== this.password) {
            throw new Error("Invalid credentials");
        }

        this.#isLogin = true;
    }

    logout() {
        this.#isLogin = false;
    }

    select(product) {
        if (product instanceof Product) {
            if (product.user_id === this.id) {
                throw new Error("You cannot select your product");
            }

            if (product.qty <= 0) {
                throw new Error("Out of stock");
            }

            this.#cart.push(product);
            --product.qty;
        } else {
            throw new Error("Invalid product");
        }
    }

    deleteFromCart(product) {
        this.#cart = this.#cart.filter((p) => p !== product);
        ++product.qty;
    }
    buy() {
        if (!this.#cart.length) {
            throw new Error("Empty cart");
        }

        const order = new Order(true, this.address, this.id, this.#cart);
        this.#history.push(order);
        orders.push(order);
        this.#cart = [];
        console.log("The process successfuly completed");
    }

    addProduct(product) {
        if (product instanceof Product) {
            this.#shop.products.push(product);
            products.push(product);
        } else {
            throw new Error("Invalid product");
        }
    }
    deleteProduct(product) {
        products = products.filter((p) => p !== product);
    }
}

class Shop {
    #id = Shop.sequalNumber++;
    #shop_name;
    #products = [];

    constructor(shop_name) {
        if (typeof shop_name !== "string") {
            throw new Error("Invalid shop name");
        }
        this.#shop_name = shop_name;
    }

    static sequalNumber = 1;

    get products() {
        return this.#products;
    }

    set products(prdc) {
        if (prdc instanceof Product) {
            this.#products.push(prdc);
        } else {
            throw new Error("Invalid product");
        }
    }
}

class Product {
    #id = Product.sequalNumber++;
    #title;
    #description;
    #price;
    #qty;
    #user_id;

    constructor(title, description, price, qty, user_id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.qty = qty;
        this.#user_id = user_id;
    }

    get title() {
        return this.#title;
    }

    set title(tl) {
        if (typeof tl !== "string") {
            throw new Error("Invalid title. Title must be a string");
        }

        this.#title = tl;
    }

    get description() {
        return this.#description;
    }

    set description(dsc) {
        if (typeof dsc !== "string") {
            throw new Error(
                "Invalid description. description must be a string",
            );
        }

        this.#description = dsc;
    }

    get price() {
        return this.#price;
    }

    set price(price) {
        if (typeof price !== "number") {
            throw new Error("Invalid price. Price must be a number");
        }

        this.#price = price;
    }

    get qty() {
        return this.#qty;
    }

    set qty(q) {
        if (typeof q !== "number") {
            throw new Error("Invalid quantity. Quantity must be a number");
        }

        this.#qty = q;
    }

    get user_id() {
        return this.#user_id;
    }

    static sequalNumber = 1;
}

class Order {
    #id = Order.sequalNumber++;
    #products = [];
    #delivery_address;
    #status = "";
    #user_id;
    #total_sum;

    static STATUS_ENUMS = ["SUCCESS", "REJECT"];
    static sequalNumber = 1;

    constructor(status, delivery_addres, user_id, products) {
        this.#status = status ? "SUCCESS" : "REJECT";
        this.delivery_addres = delivery_addres;
        this.#user_id = user_id;
        this.#products = [...products];
        this.#total_sum = this.#products.reduce(
            (acc, item) => acc + item.price,
            0,
        );
    }

    get status() {
        return this.#status;
    }

    get products() {
        return this.#products;
    }

    get total_sum() {
        return this.#total_sum;
    }
}
