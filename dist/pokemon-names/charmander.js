"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Charmander = void 0;
const fire_class_1 = require("../pokemon-types/fire-class");
class Charmander extends fire_class_1.Fire {
    constructor() {
        super("Charmander", 44, 17);
        this.move = "ember";
    }
}
exports.Charmander = Charmander;
