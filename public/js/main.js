/*
 *  Like an idea post
*/ 
let vote = (event) => {
  event.preventDefault();
  var id = $(this).attr('rel');
  console.log(id);
  var idData = {id: id}
    
  $.ajax({
    type: 'GET',
    url: '/vote',
    data: idData,
    dataType: 'JSON'
  }).done(function (response) {
    console.log(response);
    console.log(response.likes.length);
    let upvoteCount = response.upvotes.length;
    let downvoteCount = response.downvotes.length
    console.log(typeof count);
    $('#upvotecount' + id).text(upvoteCount);
    $('#downvotecount' + id).text(downvoteCount);
  });

};

$(function () { 
  // Click to like an idea
  $('.voteClassElement').click(vote);
})