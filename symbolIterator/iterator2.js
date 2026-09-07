const range = {
    from: 0,
    to: 10,
    step: 2,
    [Symbol.iterator]() {
        let current = this.from;
        const end = this.to;
        const step = this.step;

        return {
            next() {
                const value = current;
                current += step;
                if (current <= end) {
                    return {
                        value,
                        done: false
                    }
                }

                return {
                    value: undefined,
                    done: true,
                }
            }
        }

    }
};

for (const value of range) {
    console.log(value);
}
