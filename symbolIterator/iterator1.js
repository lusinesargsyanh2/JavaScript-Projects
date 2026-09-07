

const range = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        let current = this.from;
        const end = this.to;

        return {
            next() {
                if (current <= end) {
                    return {
                        value: current++,
                        done: false,
                    };
                }

                return {
                    value: undefined,
                    done: true,
                };
            },
        };
    }
};

for (const value of range) {
    console.log(value);
}

