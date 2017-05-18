/*
 *  Like an idea post
*/ /*
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
*/


// const anchoring = (event) => {
//   event.preventDefault();
//   var id = $( this ).attr('class');
//   alert(id)
//   console.log(id);

//   $.ajax({
//     type: 'GET',
//     url: '/andelainitiative/:id/opinions/:opinion_id/upvote',
//     data: { id: id },
//     success: (res) => {
//       console.log('success -->', res);
//       $('#upvoted').text(res.upvotes.length);

//     }
//     // error: () => {
//     //   alert('error loading')
//     // }
//   });

// };
// $(function () { 
//   // Click to like an idea
//   $('div#selectors.col-md-12').on('click', 'a', anchoring);
// });

$(function () { 
  // Click to like an idea
$(document).on('click', '.allVotes', (e) => {
  e.preventDefault();
  const button = e.target.id
  const id = button.split('-')[1]
  const idName = button.split('-')[0]

  $.ajax({
    type: 'GET',
    url: '/andelainitiative/:id/opinions/:opinion_id/upvote',
    data: { id, idName },
    success: (res) => {
      console.log('success -->', res);
      if (res.newOpinion.idName == 'Uvote') {
        $('#upvoted').text(res.newOpinion.upvotes.length);
      } if (res.newOpinion.idName == 'Dvote') {
        $('#downvoted').text(res.newOpinion.downvotes.length);
      }
    }
  });
});
});

