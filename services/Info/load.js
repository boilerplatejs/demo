import async from '@machete-platform/core-bundle/lib/Promise';

export default async((req, params, resolve) => {
  resolve({
    message: 'This came from the api server',
    time: Date.now()
  });
});
