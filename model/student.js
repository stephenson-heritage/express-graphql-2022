const dbcPool = require('./db');

let Student = {};

Student.list = async function() {

    //SELECT StudentId,`first`,`last` FROM Student

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT `studentId` AS `id`, `first`,`last` FROM student;");
    dbConn.end();
    delete rows.meta;
    console.log(rows);
    return rows;
}

Student.listForCourse = async function(course) {

    //SELECT StudentId,`first`,`last` FROM Student

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT student.studentId as `id`,`first`,`last` from student JOIN coursestudent ON coursestudent.studentId = student.studentId WHERE courseId = ?;", [course.id]);
    dbConn.end();
    //console.log(rows);
    return rows;
}

Student.getById = async(args) => {
    let dbConn = await dbcPool.getConnection();
    const row = await dbConn.query(
        "SELECT `studentid` AS `id`, `first`, `last` FROM student WHERE `studentid` = ? ", [args.id]);

    dbConn.end();

    return row[0];
}




module.exports = Student;