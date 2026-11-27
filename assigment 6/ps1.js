
const API_URL = "https://6b099bfd6a4ecd58b007aab6.mockapi.io/students";

const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("search");
const courseFilter = document.getElementById("courseFilter");
const sortBtn = document.getElementById("sortBtn");
const totalStudents = document.getElementById("totalStudents");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

let students = [];
let editingId = null;
let sortByAge = false;

// GET: Fetch all students
async function fetchStudents() {
    loading.hidden = false;
    error.textContent = "";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        students = await response.json();
        displayStudents();
    } catch (err) {
        error.textContent = err.message;
    } finally {
        loading.hidden = true;
    }
}

// Display students
function displayStudents() {
    studentList.innerHTML = "";

    let filteredStudents = students.filter(student => {
        const searchText = searchInput.value.toLowerCase();

        return student.name.toLowerCase().includes(searchText) ||
               student.course.toLowerCase().includes(searchText);
    });

    // Filter by course
    if (courseFilter.value !== "") {
        filteredStudents = filteredStudents.filter(student =>
            student.course === courseFilter.value
        );
    }

    // Sort by age
    if (sortByAge) {
        filteredStudents.sort((a, b) => Number(a.age) - Number(b.age));
    }

    // Total student count
    totalStudents.textContent = "Total Students: " + students.length;

    // Update course filter options
    updateCourseFilter();

    if (filteredStudents.length === 0) {
        studentList.textContent = "No students found.";
        return;
    }

    filteredStudents.forEach(student => {
        const card = document.createElement("div");
        card.className = "student-card";

        const heading = document.createElement("h3");
        heading.textContent = student.name;

        const idText = document.createElement("p");
        idText.textContent = "ID: " + student.id;

        const emailText = document.createElement("p");
        emailText.textContent = "Email: " + student.email;

        const courseText = document.createElement("p");
        courseText.textContent = "Course: " + student.course;

        const ageText = document.createElement("p");
        ageText.textContent = "Age: " + student.age;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => editStudent(student));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => deleteStudent(student.id));

        card.append(
            heading, idText, emailText, courseText,
            ageText, editBtn, deleteBtn
        );

        studentList.appendChild(card);
    });
}

// Update course filter
function updateCourseFilter() {
    const selectedCourse = courseFilter.value;

    const courses = [...new Set(
        students.map(student => student.course)
    )];

    courseFilter.innerHTML = '<option value="">All Courses</option>';

    courses.forEach(course => {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;

        courseFilter.appendChild(option);
    });

    courseFilter.value = selectedCourse;
}

// POST and PUT: Add or update student
studentForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value.trim();
    const age = Number(document.getElementById("age").value);

    if (!name || !email || !course || !age || age < 1 || age > 120) {
        error.textContent = "Please enter valid student details.";
        return;
    }

    const studentData = {
        name,
        email,
        course,
        age
    };

    error.textContent = "";

    try {
        let response;

        if (editingId !== null) {
            // PUT: Update student
            response = await fetch(`${API_URL}/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            });
        } else {
            // POST: Add student
            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            });
        }

        if (!response.ok) {
            throw new Error("Failed to save student");
        }

        await fetchStudents();
        resetForm();

    } catch (err) {
        error.textContent = err.message;
    }
});

// Edit student
function editStudent(student) {
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.getElementById("age").value = student.age;

    editingId = student.id;

    submitBtn.textContent = "Update Student";
    cancelBtn.hidden = false;
}

// DELETE: Delete student
async function deleteStudent(id) {
    error.textContent = "";

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete student");
        }

        await fetchStudents();

    } catch (err) {
        error.textContent = err.message;
    }
}

// Reset form
function resetForm() {
    studentForm.reset();
    editingId = null;

    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;
}

// Cancel edit
cancelBtn.addEventListener("click", resetForm);

// Search
searchInput.addEventListener("input", displayStudents);

// Course filter
courseFilter.addEventListener("change", displayStudents);

// Age sorting
sortBtn.addEventListener("click", function() {
    sortByAge = !sortByAge;

    sortBtn.textContent = sortByAge
        ? "Sort by Original Order"
        : "Sort by Age";

    displayStudents();
});

// Load students when page opens
fetchStudents();
