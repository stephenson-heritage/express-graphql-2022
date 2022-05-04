const dbcPool = require('./db');

let Teacher = {};

Teacher.list = async function() {

    //SELECT teacherId,`first`,`last` FROM teacher

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT teacherId as `id`,`first`,`last` FROM teacher");
    dbConn.end();
    delete rows.meta;
    console.log(rows);
    return rows;
}

Teacher.getById = async(args) => {
    let dbConn = await dbcPool.getConnection();
    const row = await dbConn.query(
        "SELECT teacherId as `id`,`first`,`last` FROM teacher WHERE teacherId = ?", [args.id]);

    dbConn.end();

    return row[0];
}

Teacher.getByCourse = async(course) => {
    let dbConn = await dbcPool.getConnection();
    const row = await dbConn.query(
        "SELECT teacher.teacherId as `id`,`first`,`last` FROM course JOIN teacher ON course.teacherId = teacher.teacherId WHERE course.courseId = ?", [course.id]);

    dbConn.end();

    return row[0];
}




module.exports = Teacher;