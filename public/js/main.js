$(() => { 
  // Click to like an idea
$(document).on('click', '.allVotes', (e) => {
  e.preventDefault();
  const button = e.target.id;
  const id = button.split('-')[1];
  const idName = button.split('-')[0];

  $.ajax({
    type: 'GET',
    url: '/andelainitiative/:id/opinions/:opinion_id/upvote',
    data: { id, idName },
    success: (res) => {
      const votesDisplay = e.target.parentNode.parentNode;
      if (res.idName === 'Uvote') {
        $(votesDisplay).find('.upvoted').text(res.newOpinion.upvotes.length);
      } if (res.idName === 'Dvote') {
        $(votesDisplay).find('.downvoted').text(res.newOpinion.downvotes.length);
      }
    }
  });
});
});
