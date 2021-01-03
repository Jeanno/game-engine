export default class Vector {
    constructor (values) {
        this.values = values;
    }

    clone () {
        return new Vector([...this.values]);
    }

    add (vector2) {
        const a = this.values;
        const b = vector2.values;
        for (let i = 0; i < a.length; i++) {
            a[i] += b[i];
        }
    }

    minus (vector2) {
        const a = this.values;
        const b = vector2.values;
        for (let i = 0; i < a.length; i++) {
            a[i] -= b[i];
        }
    }

    multiply (value) {
        const a = this.values;
        for (let i = 0; i < a.length; i++) {
            a[i] *= value;
        }
    }
}
