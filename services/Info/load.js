import async from '@boilerplatejs/core/lib/Promise';

export default async((req, params, resolve) => {
  resolve({
    message: 'This came from the api server',
    time: Date.now()
  });
});
