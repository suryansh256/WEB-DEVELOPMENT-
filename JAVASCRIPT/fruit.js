
const fruits = [
    "Apple", "Banana", "Orange", "Mango", "Pineapple",
    "Grapes", "Strawberry", "Watermelon", "Peach", "Kiwi"
];

function rearrangeFruits(fruits) {
    let removedFruits = fruits.splice(6, 4);

    fruits.splice(0, 0, ...removedFruits);

    return fruits;
}

console.log(rearrangeFruits(fruits));

