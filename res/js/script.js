let courses = [];

$(function () {

    $('.pill').click(function () {
        switchTab($(this).attr('data-target'))
    });

    loadUserInfo()
        .then(function (response) {
            let user = new User(
                response.firstname,
                response.lastname,
                response.birthdate,
                response.faculty
            );

            displayUserInfo(user)
        })
        .catch(function () {
            alert('Error loading user info')
        });


    loadCourses()
        .then(function (response) {
            for (let course of response) {
                courses.push(new Course(course.title, course.semester, course.grade))
            }

            displayCourses()
        })
        .catch(function () {
            alert('Error loading courses info')
        });

    $('#add-course-button').click(function () {
        $('#add-course').toggle()
    })

    $('#save-course').click(function () {
        let title       = $('#title').val()
        let semester    = $('#semester').val()
        let grade       = $('#grade').val()

        if (!title || !semester || !grade) {
            alert("Please fill in the form")
            return;
        }

        let course = new Course(title, semester, grade)

        courses.push(course)

        displayCourses()

        closeCourseForm()

    })

    $('#cancel-course').click(function () {
        closeCourseForm()
    })

});

function closeCourseForm() {
    $('#title').val("")
    $('#semester').val("")
    $('#grade').val("")
    $('#add-course').toggle()
}

function displayUserInfo(user) {
    $('#profile #name').text(user.firstname + " " + user.lastname);
    $('#profile #birthdate').text(user.birthdate );
    $('#profile #faculty').text(user.faculty );
}

function displayCourses() {

    let gpa = calculateGPA()
    $('#gpa strong').text(gpa)

    $('table#courses tbody').empty()
    let i = 1;
    for (let course of courses) {

        let tr = $('<tr>')
        let number = $('<td>').text(i)
        let title = $('<td>').text(course.title)
        let semester = $('<td>').text(course.semester)
        let grade = $('<td>').text(course.grade)

        tr.append(number)
        tr.append(title)
        tr.append(semester)
        tr.append(grade)

        $('table#courses tbody').append(tr)

        i++
    }
}

function calculateGPA() {

    let result = 0;

    for (let course of courses) {
        if (course.grade > 90) {
            result += 4
        }
        else if (course.grade > 80) {
            result += 3
        }
        else if (course.grade > 70) {
            result += 2
        }
        else if (course.grade > 60) {
            result += 1
        }
        else if (course.grade > 50) {
            result += 0.5
        } else {
            result += 0
        }
    }

    return result / courses.length

}

function loadUserInfo() {
    return $.get(
        {
            url: 'https://private-a62dc2-wad20lab7.apiary-mock.com/users/1',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}

function loadCourses() {
    return $.get(
        {
            url: 'https://private-a62dc2-wad20lab7.apiary-mock.com/users/1/courses',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}

function switchTab(id) {
    $('.tab').each(function () {
        if ($(this).attr('id') === id) {
            $(this).addClass('active')
        } else {
            $(this).removeClass('active')
        }
    });
    $('.pill').each(function () {
        if ($(this).attr('data-target') === id) {
            $(this).addClass('active')
        } else {
            $(this).removeClass('active')
        }
    });
}