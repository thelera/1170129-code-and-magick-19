'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'gif', 'png'];
  var avatarPicture = document.querySelector('.setup-user-pic');
  var avatarInput = document.querySelector('input[name="avatar"]');

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPicture.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
