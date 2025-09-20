// Confirm before delete
document.addEventListener('DOMContentLoaded', () => {
  const deleteForms = document.querySelectorAll('.delete-form');

  deleteForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const confirmed = confirm('Are you sure you want to delete this item?');
      if (confirmed) {
        form.submit();
      }
    });
  });
});