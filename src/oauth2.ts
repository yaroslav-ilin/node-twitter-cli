// TODO: invalidate & refresh token

import * as request from 'request';


/**
 * This function makes a call to Twitter API to obtain Application context OAuth2 access token.
 * @see https://dev.twitter.com/oauth/application-only
 * Note that Application context tokens have more limitations, see docs on every API method for details.
 *
 * To retrieve Consumer Key and Consumer Secret (which are the 2 arguments to this function), go to
 * apps.twitter.com and create your application, then go to its Keys and Access Tokens section.
 *
 * @param Consumer Key (API Key)
 * @param Consumer Secret (API Secret)
 * @returns Bearer Token
 */
export async function getToken(key: string, secret: string): Promise<string> {
    const options = {
        'url': 'https://api.twitter.com/oauth2/token',
        'method': 'POST',
        'headers':{
            'Authorization': 'Basic ' + new Buffer(key + ':' + secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        'body': 'grant_type=client_credentials'
    };

    return new Promise<string>(function(resolve, reject) {
        request.post(options, function(err, res, body) {
            if (err) {
                reject(err);
                return;
            }
            try {
                const jsonBody = JSON.parse(body);
                if ('errors' in jsonBody) {
                    reject(jsonBody.errors);
                    return;
                }
                resolve(jsonBody.access_token);
            } catch(e) {
                reject(e);
            }
        });
    });
};
