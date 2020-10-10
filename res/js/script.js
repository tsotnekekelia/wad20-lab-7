
$(function() {

    $('.pill').click(function() {
        switchTab($(this).attr('data-target'))
    })

})

function switchTab(id) {
    $('.tab').each(function(){
        if ($(this).attr('id') === id) {
            $(this).addClass('active')
        } else {
            $(this).removeClass('active')
        }
    });
    $('.pill').each(function(){
        if ($(this).attr('data-target') === id) {
            $(this).addClass('active')
        } else {
            $(this).removeClass('active')
        }
    });
}