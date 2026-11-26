
const students = [
    { id: 1, name: "Rahul", age: 20, marks: 85, course: "JavaScript" },
    { id: 2, name: "Priya", age: 21, marks: 72, course: "Python" },
    { id: 3, name: "Amit", age: 19, marks: 91, course: "Java" },
    { id: 4, name: "Sneha", age: 22, marks: 65, course: "JavaScript" },
    { id: 5, name: "Rohan", age: 20, marks: 45, course: "Python" }
];


console.log("All Students:", students);


console.log("Total Students:", students.length);


students.push({ id: 6, name: "Karan", age: 20, marks: 78, course: "Java" });
console.log("After adding at end:", students);


students.unshift({ id: 7, name: "Neha", age: 19, marks: 88, course: "Python" });
console.log("After adding at beginning:", students);


students.shift();
console.log("After removing first student:", students);


students.pop();
console.log("After removing last student:", students);


let studentIndex = students.findIndex(student => student.name === "Amit");
console.log("Index of Amit:", studentIndex);


let names = students.map(student => student.name);
console.log("Does Amit exist?", names.includes("Amit"));


let studentNames = students.map(student => student.name);
console.log("Student Names:", studentNames);


let bonusMarks = students.map(student => student.marks + 5);
console.log("Marks after bonus:", bonusMarks);


let upperNames = students.map(student => student.name.toUpperCase());
console.log("Uppercase Names:", upperNames);

let above80 = students.filter(student => student.marks > 80);
console.log("Students above 80:", above80);


let failedStudents = students.filter(student => student.marks < 50);
console.log("Failed Students:", failedStudents);


let javascriptStudents = students.filter(student => student.course === "JavaScript");
console.log("JavaScript Students:", javascriptStudents);

let studentAbove90 = students.find(student => student.marks > 90);
console.log("Student above 90:", studentAbove90);


let studentId3 = students.find(student => student.id === 3);
console.log("Student with ID 3:", studentId3);

let totalMarks = students.reduce((total, student) => total + student.marks, 0);
console.log("Total Marks:", totalMarks);


let averageMarks = totalMarks / students.length;
console.log("Average Marks:", averageMarks);


let highestMarks = students.reduce((highest, student) => {
    return student.marks > highest ? student.marks : highest;
}, students[0].marks);
console.log("Highest Marks:", highestMarks);

// 20. Find lowest marks
let lowestMarks = students.reduce((lowest, student) => {
    return student.marks < lowest ? student.marks : lowest;
}, students[0].marks);
console.log("Lowest Marks:", lowestMarks);

let above90Exists = students.some(student => student.marks > 90);
console.log("At least one student above 90:", above90Exists);

let allPassed = students.every(student => student.marks >= 35);
console.log("All students passed:", allPassed);

let ascendingMarks = students.slice().sort((a, b) => a.marks - b.marks);
console.log("Ascending Marks:", ascendingMarks);

let descendingMarks = students.slice().sort((a, b) => b.marks - a.marks);
console.log("Descending Marks:", descendingMarks);

let alphabeticalNames = students.slice().sort((a, b) => a.name.localeCompare(b.name));
console.log("Alphabetical Order:", alphabeticalNames);

let firstThree = students.slice(0, 3);
console.log("First Three Students:", firstThree);

let removedStudent = students.splice(2, 1);
console.log("Removed Student:", removedStudent);
console.log("After removing middle student:", students);

students.splice(1, 0, { id: 8, name: "Anjali", age: 21, marks: 82, course: "JavaScript" });
console.log("After inserting at second position:", students);


let topper = students.reduce((topper, student) => {
    return student.marks > topper.marks ? student : topper;
}, students[0]);
console.log("Topper:", topper);

let totalAge = students.reduce((total, student) => total + student.age, 0);
let averageAge = totalAge / students.length;
console.log("Average Age:", averageAge);

let courseCounts = students.reduce((counts, student) => {
    counts[student.course] = (counts[student.course] || 0) + 1;
    return counts;
}, {});
console.log("Course Counts:", courseCounts);

let aboveAverage = students.filter(student => student.marks > averageMarks);
let aboveAverageNames = aboveAverage.map(student => student.name);
console.log("Above Average Students:", aboveAverageNames);

let nameAndCourses = students.map(student => {
    return { name: student.name, course: student.course };
});
console.log("Names and Courses:", nameAndCourses);

let reversedStudents = students.slice().reverse();
console.log("Reversed Students:", reversedStudents);

let allNames = students.map(student => student.name).join(", ");
console.log("All Names:", allNames);

let courses = students.map(student => student.course);
let uniqueCourses = courses.filter((course, index) => courses.indexOf(course) === index);
console.log("Unique Courses:", uniqueCourses);

let namesStartingR = students.filter(student => student.name.startsWith("R"));
console.log("Names Starting with R:", namesStartingR);

let passedCount = students.filter(student => student.marks >= 35).length;
let failedCount = students.filter(student => student.marks < 35).length;

let report = {
    totalStudents: students.length,
    passedStudents: passedCount,
    failedStudents: failedCount,
    highestMarks: Math.max(...students.map(student => student.marks)),
    lowestMarks: Math.min(...students.map(student => student.marks)),
    averageMarks: students.reduce((total, student) => total + student.marks, 0) / students.length,
    topperName: topper.name
};

console.log("Student Report:", report);
