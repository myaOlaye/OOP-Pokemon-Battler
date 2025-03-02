"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Trainer_trainerName;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
const pokeball_1 = require("./pokeball");
class Trainer {
    constructor(trainerName) {
        _Trainer_trainerName.set(this, void 0);
        __classPrivateFieldSet(this, _Trainer_trainerName, trainerName, "f");
        // This is bad practice - fix it later
        const ball1 = new pokeball_1.Pokeball();
        const ball2 = new pokeball_1.Pokeball();
        const ball3 = new pokeball_1.Pokeball();
        const ball4 = new pokeball_1.Pokeball();
        const ball5 = new pokeball_1.Pokeball();
        const ball6 = new pokeball_1.Pokeball();
        this.belt = [ball1, ball2, ball3, ball4, ball5, ball6];
    }
    get trainerName() {
        return __classPrivateFieldGet(this, _Trainer_trainerName, "f");
    }
    catch(pokemon) {
        let isThrown = false;
        for (let ball of this.belt) {
            if (ball.isEmpty()) {
                ball.throw(pokemon);
                isThrown = true;
                break;
            }
        }
        if (isThrown == false) {
            console.log("You do not have any empty pokeballs!!");
        }
    }
    hasPokemon(pokemonName) {
        var _a;
        for (let ball of this.belt) {
            if (((_a = ball.storedPokemon) === null || _a === void 0 ? void 0 : _a.name) == pokemonName) {
                return true;
            }
            return false;
        }
    }
    getPokemon(pokemonName) {
        var _a;
        for (let ball of this.belt) {
            if (((_a = ball.storedPokemon) === null || _a === void 0 ? void 0 : _a.name) == pokemonName) {
                return ball.throw(undefined);
            }
        }
    }
}
exports.Trainer = Trainer;
_Trainer_trainerName = new WeakMap();
