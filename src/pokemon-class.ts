export abstract class Pokemon {
  #hitPoints;
  #attackDamage;
  #move;
  name;
  type: string;
  constructor(
    name: string,
    hitPoints: number,
    attackDamage: number,
    type: string
  ) {
    this.name = name;
    this.#hitPoints = hitPoints;
    this.#attackDamage = attackDamage;
    this.#move = "tackle";
    this.type = type;
  }

  get hitPoints() {
    return this.#hitPoints;
  }
  get attackDamage() {
    return this.#attackDamage;
  }
  get move() {
    return this.#move;
  }

  set hitPoints(updatedHitPoint) {
    this.#hitPoints = updatedHitPoint;
  }
  set move(updatedMove) {
    this.#move = updatedMove;
  }

  takeDamage(amount: number) {
    this.hitPoints = this.hitPoints - amount;
  }
  useMove() {
    console.log(this.name, "used", this.move);
    return this.attackDamage;
  }
  hasFainted() {
    return this.hitPoints <= 0;
  }

  abstract isWeakTo(pokemon: Pokemon): boolean;
  abstract isEffectiveAgainst(pokemon: Pokemon): boolean;
}
