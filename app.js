/*
Reference: http://docs.railsbridge.org/javascript-to-do-list/
 */
var itemTemplate = $('#templates .item'); //spacing between #templates .item matters
var list         = $('#list');
console.log('this is working');
$(document).ready(function(){
    console.log('this is working')

});
var addItemToPage = function(itemData) {
    /*
        var itemData = { description: 'Orange', id: 9000, completed: false }
     */
    console.log("started adding new item");
    console.log(list)
    var item = itemTemplate.clone();
    item.attr('data-id',itemData.id);
    item.find('.description').text(itemData.description);
    if(itemData.completed) {
        item.addClass('completed')
    }
    list.append(item);
    console.log("successfully added new item");
    console.log(list)
};
var loadRequest = $.ajax({
    type: 'GET',
    url: "https://listalous.herokuapp.com/lists/sample/"
});
loadRequest.done(function(dataFromServer) {
    var itemsData = dataFromServer.items;

    itemsData.forEach(function(itemData) {
        addItemToPage(itemData)
    })
});
$('#add-form').on('submit', function(event) {
    var itemDescription = event.target.itemDescription.value;
    event.preventDefault();
    // alert('trying to create a new item with a description ' + itemDescription)
    var creationRequest = $.ajax({
        type: 'POST',
        url: "http://listalous.herokuapp.com/lists/sample/items",
        data: { description: itemDescription, completed: false }
    });
    creationRequest.done(function(itemDataFromServer) {
        addItemToPage(itemDataFromServer)
    })
});
$('#list').on('click', '.complete-button', function(event) {
    // alert('trying to complete an item!')
    var item = $(event.target).parent()
    var isItemCompleted = item.hasClass('completed')
    var itemId = item.attr('data-id')
    // alert('clicked item ' + itemId + ', which has completed currently set to ' + isItemCompleted)
    var updateRequest = $.ajax({
        type: 'PUT',
        url: "https://listalous.herokuapp.com/lists/sample/items/" + itemId,
        data: { completed: !isItemCompleted }
    })
    updateRequest.done(function(itemData) {
        if (itemData.completed) {
            item.addClass('completed')
        } else {
            item.removeClass('completed')
        }
    })
});