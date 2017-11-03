import async from '@vitruvian-tech/app-studio-core/helpers/Promise';

export default async((req, params, resolve, reject) => {
  setTimeout(() => {
    const errors = {};
    let valid = true;
    if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(req.body.email)) {
      errors.email = 'Email address already used';
      valid = false;
    }
    if (valid) {
      resolve();
    } else {
      reject(errors);
    }
  }, 1000);
});
