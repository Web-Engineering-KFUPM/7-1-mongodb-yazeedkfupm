/**
 * ================================================================================================================
   Back-end Lab — MongoDB
 * ================================================================================================================
 *
 * ================================================================================================================
 *                                                    MongoDB Cloud
 * ================================================================================================================
 * 
 * ============================================
 * TODO-1: SignUp and create cluster  
 * ============================================
 * - SignUp on mongoDB cloud at https://cloud.mongodb.com/
 * - create project and click on Build Cluster
 * - choose free plan to create cluster
 * - Name the cluster cluster0
 * - choose AWS as provider
 * - choose region Bahrain
 * - click on the button "create deployment"
 * 
 *================================================================
 * TODO-2: Setup username and password to create a database user
 * ===============================================================
 *   - write any username to create a database user.
 *   - write any password.
 *   - click on the button to create a database user
 *
 * ============================================
 * TODO-3 Allow access to the network
 * ============================================
 *   - choose database & network access from the security option.
 *   - choose IP access list
 *   - edit IP address and set 0.0.0.0/0 and confirm it.
 *
 * ============================================
 * TODO-4 Download and setup Monogsh (Do it if you dont have mongosh, otherwise skip this step)
 * ============================================
*    - go to clusters and click on connect button.
*    - choose shell as the connection option.
*    - click on the I don't have mongoDB shell installed.
 *   - choose windows/MacOS as operating system and install mongosh.
 *   - After installation setup the environment variable path.
 *   - copy the connection string
 *   - open cmd and paste the connection string to establish connection with mongoDB cloud.
 *
 * ============================================
 * TODO-5 Create DB & Collection
 * ============================================
 *   - In cmd write the following commands: 
 *      - use labDB          // create or switch DB
 *      - db.createCollection("students") //// create collection
 * ============================================
 * TODO-6 Insert Documents
 * ============================================
 *   - In cmd write the following commands: 
 *      - db.students.insertMany([
            { name: "Ali", age: 21, major: "CS" },
            { name: "Sara", age: 23, major: "SE" } ])
 * 
 * ============================================
 * TODO-7 Read Documents
 * ============================================
 *   - In cmd write the following commands: 
 *      - db.students.find()               // all
 *      - db.students.find({ age: { $gt: 21 } })  // filtered
 * 
 * ============================================
 * TODO-8 Update & Delete
 * ============================================
 *   - In cmd write the following commands: 
 *      - db.students.updateOne({ name: "Ali" }, { $set: { age: 22 } }) 
 *      - db.students.deleteOne({ name: "Sara" })
 * 
 * ============================================
 * TODO-9 Quick Check
 * ============================================
 *   - In cmd write the following commands: 
 *      - db.students.find().pretty()
 *      - Should show only Ali, age = 22.
 * 
 * ================================================================================================================
 *                                                    Mongoose
 * ================================================================================================================
 * ===================================================================
    LAB SETUP INSTRUCTIONS
   ===================================================================

   1. Navigate to the project directory:
      Open your terminal and run:
         cd 7-1-mongodb

   2. Install project dependencies:
      Run either of these commands:
         npm i
         OR
         npm install
         npm install mongoose

   If your system blocks running npm commands (especially on Windows PowerShell),
      run this command first to allow script execution:
         Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

 * =====================================================
 * TODO-1 Estbalish Connection with MongoDB via Mongoose
 * =====================================================
 *  - Go to cluster click on connect and select MongoDB for VS code
 *  - Copy the connection string.
 *       Example connection string: mongodb+srv://mjwdmufti:<db_password>@cluster0.wwsbvm7.mongodb.net
 *  - write your database password in place of <db_password> in the connection string.
 *  - Run server: node server.js to test connection.
 * 
 * =====================================================
 * TODO-2 Define the schema of the DB
 * ===================================================== 
 *    const studentSchema = new mongoose.Schema({
         name: String,
         age: Number,
         major: String
      });
      const Student = mongoose.model("Student", studentSchema);
      - Run server: node server.js and go to mongo cloud to see DB schema in test->students.
 * 
 * =====================================================
 * TODO-3 Create Document
 * ===================================================== 
 *  - This code will create document in database.
 * async function createStudents() {
      await Student.insertMany([
         { name: "Ali", age: 21, major: "CS" },
         { name: "Sara", age: 23, major: "SE" }
      ]);
      console.log("✅ Inserted");
      }
      createStudents();
   - Run server: node server.js and go to mongo cloud to see created document.
 * =====================================================
 * TODO-4 Read Documents
 * ===================================================== 
 * - This code will read all the document in database.
 *  
 *    async function readStudents() {
         const all = await Student.find();
         console.log(all);
      }
      readStudents();
    - Run server: node server.js.
 * =====================================================
 * TODO-5 Update Document
 * ===================================================== 
 * - This code will update a document in database.
 *  
 *    async function updateStudent() {
         await Student.updateOne({ name: "Ali" }, { age: 22 });
         console.log("✅ Updated Ali");
      }
 * - Run server: node server.js and got to mongo cloud to see the updated document.
 * =====================================================
 * TODO-6 Delete Document
 * ===================================================== 
 * - This code will delete a document in database.
 *  
 *    async function deleteStudent() {
         await Student.deleteOne({ name: "Sara" });
      console.log("✅ Deleted Sara");
      }
 * - Run server: node server.js and got to mongo cloud to verify, document is deleted.
 * 
 */

import mongoose from "mongoose";


// ============================================
// TODO-1: Establish Connection with MongoDB via Mongoose
// ============================================
// 1) Replace the placeholder below OR set an environment variable MONGODB_URI
// Example: mongodb+srv://<username>:<db_password>@cluster0.xxxxx.mongodb.net/test
// 2) Then run: node server.js


const MONGODB_URI = "mongodb+srv://cluster0.rtvzhms.mongodb.net/";


async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
}


// ============================================
// TODO-2: Define the schema of the DB
// ============================================
const studentSchema = new mongoose.Schema({
name: { type: String, required: true },
age: { type: Number, required: true },
major: { type: String, required: true },
});


const Student = mongoose.model("Student", studentSchema);


// ============================================
// TODO-3: Create Documents
// ============================================
async function createStudents() {
await Student.insertMany([
{ name: "Ali", age: 21, major: "CS" },
{ name: "Sara", age: 23, major: "SE" },
]);
console.log("✅ Inserted Ali & Sara");
}


// ============================================
// TODO-4: Read Documents
// ============================================
async function readStudents() {
const all = await Student.find();
console.log("📄 All students:", all);
}


// Filtered read example (age > 21)
async function readFiltered() {
const filtered = await Student.find({ age: { $gt: 21 } });
console.log("📄 Filtered (age > 21):", filtered);
}


// ============================================
// TODO-5: Update Document (set Ali's age to 22)
// ============================================
async function updateStudent() {
const res = await Student.updateOne({ name: "Ali" }, { $set: { age: 22 } });
console.log("🔧 Updated Ali:", res.modifiedCount, "document(s)");
}


// ============================================
// TODO-6: Delete Document (delete Sara)
// ============================================
async function deleteStudent() {
const res = await Student.deleteOne({ name: "Sara" });
console.log("🗑️ Deleted Sara:", res.deletedCount, "document(s)");
}


// ============================================
// Runner: Uncomment the steps you want to test
(async () => {
  await connectDB();

  await createStudents();
  await readStudents();
  await updateStudent();
  await deleteStudent();
  await readStudents();

  mongoose.disconnect();
})();




