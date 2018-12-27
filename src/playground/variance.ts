/** Hierarchy */
class Animal {
	constructor(public name: string) {}
}
class Cat extends Animal {
	meow() {}
}

/** An item of each */
var animal = new Animal('animal');
var cat = new Cat('cat');

/**
 * Demo : polymorphism 101
 * Animal <= Cat
 */
animal = cat; // Okay
// cat = animal; // ERROR: cat extends animal

/** Array of each to demonstrate variance */
let animalArr: Animal[] = [animal];
let catArr: Cat[] = [cat];

/**
 * Obviously Bad : Contravariance
 * Animal <= Cat
 * Animal[] >= Cat[]
 */
// catArr = animalArr; // Okay if contravariant
catArr[0].meow(); // Allowed but BANG 🔫 at runtime

/**
 * Also Bad : covariance
 * Animal <= Cat
 * Animal[] <= Cat[]
 */
animalArr = catArr; // Okay if covariant
animalArr.push(new Animal('another animal')); // Just pushed an animal into catArr!
catArr.forEach(c => c.meow()); // Allowed but BANG 🔫 at runtime
