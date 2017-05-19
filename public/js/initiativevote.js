$(() => { 
$(document).on('click', '.IVotes', (e) => {
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
      if (res.idName === 'Ivote') {
        $(votesDisplay).find('.Ivoted').text(res.newInitiative.upvotes.length);
      } 
    }
  });
});
});