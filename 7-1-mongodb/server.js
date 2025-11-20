
import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://cluster0.rtvzhms.mongodb.net/";


async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}

const studentSchema = new mongoose.Schema({
name: { type: String, required: true },
age: { type: Number, required: true },
major: { type: String, required: true },
});


const Student = mongoose.model("Student", studentSchema);

async function createStudents() {
await Student.insertMany([
{ name: "Ali", age: 21, major: "CS" },
{ name: "Sara", age: 23, major: "SE" },
]);
console.log("Inserted Ali & Sara");
}

async function readStudents() {
const all = await Student.find();
console.log("All students:", all);
}


// Filtered read example (age > 21)
async function readFiltered() {
const filtered = await Student.find({ age: { $gt: 21 } });
console.log("Filtered (age > 21):", filtered);
}


async function updateStudent() {
const res = await Student.updateOne({ name: "Ali" }, { $set: { age: 22 } });
console.log("Updated Ali:", res.modifiedCount, "document(s)");
}

async function deleteStudent() {
const res = await Student.deleteOne({ name: "Sara" });
console.log("Deleted Sara:", res.deletedCount, "document(s)");
}

(async () => {
  await connectDB();

  await createStudents();
  await readStudents();
  await updateStudent();
  await deleteStudent();
  await readStudents();

  mongoose.disconnect();
})();




