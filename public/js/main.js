

$(function () { 
$(document).on('click', '.allVotes', (e) => {
  e.preventDefault();
  const button = e.target.id
  alert(button)
  const id = button.split('-')[1]
  alert(id)
  console.log(event.target.nodeName);
  console.log(id);

  $.ajax({
    type: 'GET',
    url: '/andelainitiative/:id/opinions/:opinion_id/upvote',
    data: { id: id },
    success: (res) => {
      console.log('success -->', res);
      $('#upvoted').text(res.upvotes.length);
    }
  });
});
});

