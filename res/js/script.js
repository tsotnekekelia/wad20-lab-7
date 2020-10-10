$(function () {

    $('.pill').click(function () {
        switchTab($(this).attr('data-target'))
    });

    loadUserInfo()
        .then(function (response) {
            user = new User(
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

});

function displayUserInfo(user) {
    $('#profile #name').text(user.firstname + " " + user.lastname);
    $('#profile #birthdate').text(user.birthdate );
    $('#profile #faculty').text(user.faculty );
}

function loadUserInfo() {
    return $.get(
        {
            url: './data/user.json',
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