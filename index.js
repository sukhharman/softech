
const express = require('express');

const teacherController = require('./controller/teacher');
const postTeacherController = require('./controller/insertteacher');
const updateTeacherController = require('./controller/updateTeacher');
const deletteacher =require('./controller/deleteTeacher')

const getStudent =require('./controller/getstudent')
const deletestudent =require('./controller/deleteStudent')
const postStudent =require('./controller/insertStudent')
const updateTeacher= require('./controller/updateStudent')

const postCourse =require('./controller/insertCourse')
const updatecourse= require('./controller/updateCourse')
const getCourse =require('./controller/getCourse')
const deleteCourse =require('./controller/deleteCourse')


const getUser =require('./controller/getuser')
const postUser =require('./controller/insertuser')

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is working");
});


app.get('/getteacher', teacherController);
app.post('/postteacher', postTeacherController);
app.put('/updateteacher:name', updateTeacherController);
app.delete('/deleteTeacher:name', deletteacher)


app.get('/getStudent', getStudent)
app.post('/postStudent', postStudent)
app.put('/updateStudent', updateTeacher)
app.delete('/deleteStudent', deletestudent)


app.get('/getCourse', getCourse)
app.post('/postCourse', postCourse)
app.put('/updateCourse', updatecourse)
app.delete('/deleteCourse', deleteCourse)


app.get('/getUser', getUser)
app.post('/postuser', postUser)


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
