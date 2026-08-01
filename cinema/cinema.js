class Cinema {
    #name;
    #address;
    #sessions;

    constructor(name, address) {
        this.#name = name;
        this.#address = address;
        this.#sessions = []
    }

    get name() {
        return this.#name;
    }

    get address() {
        return this.#address;
    }

    get sessions() {
        return this.#sessions;
    }

    createSession(session) {
        this.#sessions.push(session);
    }
}

class Movie {
    #name;
    #duration;
    #genre;
    #ageLimit;
    #description;

    constructor(name, duration, genre, ageLimit, description) {
        this.#name = name;
        this.#duration = duration;
        this.#genre = genre;
        this.#ageLimit = ageLimit;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }

    get duration() {
        return this.#duration;
    }

    get genre() {
        return this.#genre;
    }

    get ageLimit() {
        return this.#ageLimit;
    }

    get description() {
        return this.#description;
    }

    get info() {
        console.log(`movie name: ${this.#name}`);
        console.log(`movie duration: ${this.#duration}`);
        console.log(`movie genre: ${this.#genre}`);
        console.log(`movie ageLimit: ${this.#ageLimit}`);
        console.log(`movie description: ${this.#description}`);
    }
}

class Ticket {
    #session;
    #seatNumber;
    #price;
    #person;

    constructor(session, seatNumber, price, person) {
        this.#session = session;
        this.#seatNumber = seatNumber;
        this.#price = price;
        this.#person = person;
    }

    get session() {
        return this.#session;
    }

    get seatNumber() {
        return this.#seatNumber;
    }

    get price() {
        return this.#price;
    }

    get person() {
        return this.#person;
    }

    get info() {
        console.log(`ticket session: ${this.#session?.movie?.name}`);
        console.log(`ticket seatNumber: ${this.#seatNumber}`);
        console.log(`ticket price: ${this.#price}`);
        console.log(`ticket person: ${this.#person.name}`);
    }
}

class Hall {
    #name;
    #cap;

    constructor(name, cap) {
        this.#name = name;
        this.#cap = cap;
    }

    get name() {
        return this.#name;
    }

    get cap() {
        return this.#cap;
    }
}

class Person {
    #name;

    constructor(name) {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }
}

class Client extends Person {
    #tickets;

    constructor(name) {
        super(name);
        this.#tickets = [];
    }

    get ticket() {
        return this.#tickets;
    }

    addTicket(ticket) {
        this.#tickets.push(ticket)
    }

    buyTicket(ticket) {
        this.addTicket(ticket)
        console.log(`You bought ticket for ${ticket.session?.movie?.name}`);
    }
}

class Employee extends Person {
    constructor(name) {
        super(name);
    }

    saleTicket() { }
}

class Session {
    #movie;
    #hall;
    #time;

    constructor(movie, hall, time) {
        this.#movie = movie;
        this.#hall = hall;
        this.#time = time;
    }

    get movie() {
        return this.#movie;
    }

    get hall() {
        return this.#hall;
    }

    get time() {
        return this.#time;
    }
}

// Usage
const hall1 = new Hall("Hall 1", 65);

const movie1 = new Movie(
    "Odyssey",
    "2h 30m",
    "Fantasy",
    "16+",
    "After the Trojan War, Odysseus faces a dangerous voyage back to Ithaca, meeting creatures like the Cyclops Polyphemus, Sirens, and Calypso along the way."
);

const movie2 = new Movie(
    "Spider-Man: Brand New Day",
    "2h 25m",
    "Action/Adventure",
    "PG-13",
    "A forgotten Peter Parker lives alone as a full-time Spider-Man until mounting pressure triggers a dangerous change and a powerful new enemy emerges."
);

// movie.info;

const cinema = new Cinema("my new cinema", "Yerevan, Armenia");

const session1 = new Session(movie1, hall1, "11:00");
const session2 = new Session(movie2, hall1, "14:00");
cinema.createSession(session1); // add session to cinema
cinema.createSession(session2); // add session to cinema

const client1 = new Client("James");

const ticket1 = new Ticket(session1, 56, "3500 AMD", client1);

ticket1.info;
 


client1.buyTicket(ticket1);
cinema.sessions.map((item) => console.log(`${item.movie.name} 
    ${item.hall.name} 
    ${item.time}`)); 
