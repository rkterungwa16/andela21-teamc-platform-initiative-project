$(() => { 
  // Click to like an idea
$(document).on('click', '.allVotes', (e) => {
  e.preventDefault();
  const button = e.target.id
  alert(button);
  const id = button.split('-')[1]
  const idName = button.split('-')[0]

  $.ajax({
    type: 'GET',
    url: '/andelainitiative/:id/opinions/:opinion_id/upvote',
    data: { id, idName },
    success: (res) => {
      console.log('=====', JSON.stringify(res, null, 4));
      console.log(res.newOpinion.idName);
      if (res.idName === 'Uvote') {
        $('.upvoted').text(res.newOpinion.upvotes.length);
      } if (res.idName === 'Dvote') {
        $('.downvoted').text(res.newOpinion.downvotes.length);
      }
    }
  });
});
});
