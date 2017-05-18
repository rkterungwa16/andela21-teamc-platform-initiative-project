
$('#description')
  .focus((e) => {
    $(e.target).attr({ rows: '5' });
  })
  .focusout((e) => {
    $(e.target).attr({ rows: '1' });
  });

$(() => {
  $(document).on('click', '.allVotes', (e) => {
    e.preventDefault();
    const button = e.target.id;
    alert(button);
    const id = button.split('-')[1];
    alert(id);

    $.ajax({
      type: 'GET',
      url: '/andelainitiative/:id/opinions/:opinion_id/upvote',
      data: { id },
      success: (res) => {
        $('#upvoted').text(res.upvotes.length);
      }
    });
  });
});

