$(function () {
$(document).on('click', 'button.btn.btn-info.btn-xs.edit', (e) => {
  e.preventDefault();
  const button = e.target.id;
  const id = button.split('-')[1];

  $.ajax({
    type: 'GET',
    url: '/andelainitiative/:id/edit',
    data: { id: id },
    success: (res) => {
      $('input.form-control#fullname').val(res.found.fullname);
      $('input.form-control#title').val(res.found.title);
      $('input.form-control#image').val(res.found.image);
      $('textarea.form-control#description').val(res.found.description);
      $('form#update').attr('action', `/andelainitiative/${res.id}?_method=PUT`);
    }
  });
});
});
