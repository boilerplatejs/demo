import async from '@vitruvian-tech/app-studio-core/helpers/Promise';

export default async((req, params, resolve) => {
  resolve({
    message: 'This came from the api server',
    time: Date.now()
  });
});
