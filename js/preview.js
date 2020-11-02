'use strict';
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  const ImageProperties = {
    WIDTH: 70,
    HEIGHT: 70,
    SOURCE: `img/muffin-grey.svg`
  }
  const avatar = window.form.ad.querySelector(`.ad-form-header__preview img`);
  const avatarChooser = window.form.ad.querySelector(`.ad-form-header__upload input[type="file"]`);
  const photoPreview = window.form.ad.querySelector(`.ad-form__photo`);
  const photoChooser = window.form.ad.querySelector(`.ad-form__upload input[type="file"]`);

  const addSourceImage = (src) => {
    avatar.src = src;
  }

  const addBackgroundImage = (url) => {
    photoPreview.style = `background: url(${url}) center center / cover no-repeat;`;
  }

  const showPreview = (fileChooser, cb) => {
    let file = fileChooser.files[0];
    let matches = FILE_TYPES.some((item) => {
      return file.type.endsWith(item);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, () => {
        let src = reader.result;
        cb(src);
      });

      reader.readAsDataURL(file);
    }
  };

  const resetPreview = () => {
    photoPreview.style = ``,
    avatar.src = ImageProperties.SOURCE
  };

  avatarChooser.addEventListener(`change`, function () {
    showPreview(this, addSourceImage)
  });

  photoChooser.addEventListener(`change`, function () {
    showPreview(this, addBackgroundImage);
  });

  window.photos = {
    reset: resetPreview
  };
