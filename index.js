import { FormParamsObject } from "./FormParamsObject.js";

// example 1

const params1 = {
    param1: "test1",
    param2: {
        param21: 'test2',
        param22: {
            number: ["123", "456"],
            text: ["text1", "text2"],
        }
    }
};

const fp1 = new FormParamsObject(params1);

console.log(fp1.getObjectProperty('param1'));
console.log(fp1.getObjectProperty('param2.param22.text'));
console.log(fp1.getObjectProperty('param2.param21.3'));
console.log(fp1.getObjectProperty('param2.param22.param3'));

console.log(fp1.setObjectProperty('param1.param11.param3', 'new value'));
console.log(fp1.setObjectProperty('param2.param21', 'new value2'));
console.log(fp1.setObjectProperty('param2.param22.boolean', {a: true, b: false}));
console.log(fp1.getFullObject());

console.log(fp1.convertObjectToArray('param2.param22'));
console.log(fp1.getFullObject());
console.log(fp1.convertObjectToArray('param2'));
console.log(fp1.getFullObject());
console.log(fp1.convertObjectToArray('param1.param11.param3'));
console.log(fp1.convertObjectToArray('param3'));
console.log(fp1.getFullObject());

// example 2

const param2 = 'incorrect data'; // everything except the object

const fp2 = new FormParamsObject(param2);

console.log(fp2.getObjectProperty('param1.param2'));
console.log(fp2.setObjectProperty('param1.param2.param3', [1, 2]));
console.log(fp2.convertObjectToArray('param1.param2'));
console.log(fp2.getFullObject());
