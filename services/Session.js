import superagent from 'superagent';

export const login = async req => await superagent
    .get('https://dev-inw25gf0.auth0.com/userinfo')
    .set('Authorization', `Bearer ${req.body.access_token}`)
    .set('Accept', 'application/json')
    .then(res => ({ ...req.body, ...res.body }));

export const logout = async req => true;
