"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specifications = void 0;
const uuid_1 = require("uuid");
class Specifications {
    id;
    name;
    description;
    created_at;
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
}
exports.Specifications = Specifications;
