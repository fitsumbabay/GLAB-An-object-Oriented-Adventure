
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
      name: "Frank",
      type: "Flea",
      belongings: {
        hat: "small hat",
        sunglasses: "sunglasses",
      },
    },
  },

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  },
};
//console.log(adventurer.companion.companion)
// console.log(adventurer.roll());
// console.log(adventurer.roll());
// console.log(adventurer.roll());

class Character {
  static MAX_HEALTH = 100; // Static property for maximum health
  constructor(name) {
    this.name = name;
    this.health = Character.MAX_HEALTH;
    this.inventory = [];
  }
}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];


class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"];

  constructor(name, role) {
      super(name);
       if (!Adventurer.ROLES.includes(role)) {
         throw new Error(
           `Invalid role: ${role}. Valid roles are: ${Adventurer.ROLES.join(
             ", "
           )}`
         );
       }
    // Adventurers have specialized roles.
    this.role = role;
    // Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push("bedroll", "50 gold coins");
  }
  // Adventurers have the ability to scout ahead of them.
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
}



class Companion {
  constructor(name, type) {
    this.name = name; 
    this.type = type; 
    this.health = 50; // Initial health of the companion
    this.belongings = []; // Array to hold items specific to the companion
  }

  // Method
  attack(target) {
    const damage = 5; 
    console.log(
      `${this.name} attacks ${target.name} and deals ${damage} damage!`
    );
    target.health -= damage;
  }

  addBelonging(item) {
    this.belongings.push(item);
    console.log(`${item} has been added to ${this.name}'s belongings.`);
  }

  displayResult() {
    console.log(
      `Name: ${this.name}, Type: ${this.type}, Health: ${
        this.health
      }, Belongings: ${this.belongings.join(", ")}`
    );
  }
}

const leo = new Companion("Leo", "Cat");
leo.addBelonging("captured");
leo.addBelonging("toy mouse");
console.log(leo.displayResult());

const frank = new Companion("Frank", "Flea");
frank.addBelonging("small hat");
frank.addBelonging("sunglasses");
console.log(frank.displayResult())

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex(index) {
    return this.adventurers[index];
  }
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healers = new AdventurerFactory("Healer");
//const robin = healers.generate("Robin");