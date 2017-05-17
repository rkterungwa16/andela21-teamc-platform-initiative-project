
$('#description')
  .focus((e) => {
    $(e.target).attr({ rows: '5' });
  })
  .focusout((e) => {
    $(e.target).attr({ rows: '1' });
  });
