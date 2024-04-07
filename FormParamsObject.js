export class FormParamsObject {
    constructor(params) {
        if(this.isObject(params)) {
            this.object = params;
        }
    }

    getFullObject() {
        return this.object;
    }

    getObjectProperty(propPath) {
        const path = this.getPath(propPath);
        return path.reduce((acc, curr) => {
            return this.isObject(acc) ? acc[curr] : undefined;
        }, this.object);
    }

    setObjectProperty(propPath, value) {
        if (!this.isObject(this.object)) {
            return;
        }

        const path = this.getPath(propPath);
        path.reduce((acc, curr, index) => {
            if (!this.isObject(acc[curr])) {
                acc[curr] = {};
            }
            if (index === path.length - 1) {
                acc[curr] = value;
            }
            return acc[curr];
        }, this.object);

        return this.getObjectProperty(propPath);
    }

    convertObjectToArray(propPath) {
        const propObject = this.getObjectProperty(propPath);

        if (!this.isObject(propObject)) {
            return;
        }

        const array = Object.keys(propObject).reduce((acc, key) => {
            if (Array.isArray(propObject[key])) {
                propObject[key].forEach((el, index) => {
                    acc[index] ?
                        acc[index][key] = el :
                        acc[index] = {[key]: el};
                });
            } else {
                acc[0][key] = propObject[key];
            }
            return acc;
        }, [{}]);

        this.setObjectProperty(propPath, array);
        return array;
    }

    getPath(pathStr) {
        return typeof pathStr === 'string' ? pathStr.split('.') : [];
    }

    isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
}