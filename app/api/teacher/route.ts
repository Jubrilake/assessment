// Import the required modules
import fs from 'fs';
import path from 'path';

// Define the data
const userData = {
    name: 'John Doe',
    dateOfBirth: '1990-01-01'
  };

  // Define the file path
const filePath = path.join(process.cwd(), 'data.json');

export async function GET(){
    
    const filePath = path.resolve('./data.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    let teacher = jsonData[0]["teacher"];
console.log(teacher)
return new Response(JSON.stringify(teacher))
}

// Post req
export async function POST(request: Request) {
    const res = await request.json() // res now contains body
       // Read the JSON file
       console.log(res)
const filePath = path.resolve('./data.json');
const data = fs.readFileSync(filePath, 'utf-8');

// Parse the JSON data
const jsonData = JSON.parse(data);
let teachers = jsonData[0]["teacher"];
const newTeacher  = {
    title: res.title,
    lastName: res.lastName,
    firstName: res.firstName,
    dateOfBirth: res.dateOfBirth,
    phoneNumber: res.phoneNumber,
    nin: res.nin,
    salary:res.salary
}

teachers = [...teachers, newTeacher]
jsonData[0]['teacher'] = teachers
fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
return new Response(JSON.stringify(jsonData), {
    status:201
})

  }