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
var _Pokemon_hitPoints, _Pokemon_attackDamage, _Pokemon_move;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
class Pokemon {
    constructor(name, hitPoints, attackDamage, type) {
        _Pokemon_hitPoints.set(this, void 0);
        _Pokemon_attackDamage.set(this, void 0);
        _Pokemon_move.set(this, void 0);
        this.name = name;
        __classPrivateFieldSet(this, _Pokemon_hitPoints, hitPoints, "f");
        __classPrivateFieldSet(this, _Pokemon_attackDamage, attackDamage, "f");
        __classPrivateFieldSet(this, _Pokemon_move, "tackle", "f");
        this.type = type;
    }
    get hitPoints() {
        return __classPrivateFieldGet(this, _Pokemon_hitPoints, "f");
    }
    get attackDamage() {
        return __classPrivateFieldGet(this, _Pokemon_attackDamage, "f");
    }
    get move() {
        return __classPrivateFieldGet(this, _Pokemon_move, "f");
    }
    set hitPoints(updatedHitPoint) {
        __classPrivateFieldSet(this, _Pokemon_hitPoints, updatedHitPoint, "f");
    }
    set move(updatedMove) {
        __classPrivateFieldSet(this, _Pokemon_move, updatedMove, "f");
    }
    takeDamage(amount) {
        this.hitPoints = this.hitPoints - amount;
    }
    useMove() {
        console.log(this.name, "used", this.move);
        return this.attackDamage;
    }
    hasFainted() {
        return this.hitPoints <= 0;
    }
}
exports.Pokemon = Pokemon;
_Pokemon_hitPoints = new WeakMap(), _Pokemon_attackDamage = new WeakMap(), _Pokemon_move = new WeakMap();
