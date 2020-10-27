const {
  AuthenticationService,
  JWTStrategy,
} = require('@feathersjs/authentication');
const {
  expressOauth,
  OAuthStrategy,
} = require('@feathersjs/authentication-oauth');
const axios = require('axios');
const randomstring = require('randomstring');

class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.name,
      // The GitHub profile image
      avatar: profile.avatar_url,
      // The user email address (if available)
      email: profile.email,
    };
  }
}

class FaceBookStrategy extends OAuthStrategy {
  async getProfile(authResult) {
    const accessToken = authResult.access_token;

    const { data } = await axios.get('https://graph.facebook.com/me', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        // There are
        fields: 'id,name,email,picture',
      },
    });

    return data;
  }
  async getEntityData(profile) {
    // `profile` is the data returned by getProfile

    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      name: profile.name,
      email: profile.email,
      avatar: profile.picture.data.url,
    };
  }
}

class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    // this will set 'googleId'
    const baseData = await super.getEntityData(profile);

    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      name: profile.name,
      avatar: profile.picture,
      email: profile.email,
    };
  }
}

class TwitterStrategy extends OAuthStrategy {
  async getProfile(profile) {
    console.log(profile);

    console.log(
      encodeURI('Thisishowwedoinamerica'),
      encodeURI(process.env.TWITTER_API_KEY),
      encodeURI(randomstring.generate()),
      encodeURI('HMAC_SHA1'),
      encodeURI(new Date()),
      encodeURI(profile.access_token)
    );

    axios.post('https://api.twitter.com/1.1/statuses/update.json',
      {
        status: encodeURI('Thisishowwedoinamerica'),
        include_entities: encodeURI('true'),
        oauth_consumer_key: encodeURI(process.env.TWITTER_API_KEY),
        oauth_nonce: encodeURI(randomstring.generate()),
        oauth_signature_method: encodeURI('HMAC_SHA1'),
        oauth_timestamp: encodeURI(new Date()),
        oauth_token: encodeURI(profile.access_token),
        oauth_version: encodeURI('1.0'),
      }
    ).then(res => {
      console.log(res);
    }).catch(res => {
      console.log(res);
    })

    // const userData = await axios.get(
    //   'https://api.twitter.com/1.1/account/verify_credentials.json',
    //   {
    //     headers: {
    //       authorization: `OAuth oauth_token_secret=${profile.access_token_secret}, oauth_consumer_secret=${process.env.TWITTER_SECRET_KEY}, oauth_consumer_key=${process.env.TWITTER_API_KEY}, oauth_token=${profile.access_token}, oauth_version="1.1"`,
    //     },
    //     params: {
    //       // There are
    //       include_email: true,
    //     },
    //   }
    // );
    // console.log(userData);
    
  }

  // async getEntityData(profile) {
  //   // `profile` is the data returned by getProfile

  //   const baseData = await super.getEntityData(profile);

  //   return {
  //     ...baseData,
  //     name: profile.name,
  //     email: profile.email,
  //     avatar: profile.picture.data.url,
  //   };
  // }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('github', new GitHubStrategy());
  authentication.register('facebook', new FaceBookStrategy());
  authentication.register('google', new GoogleStrategy());
  authentication.register('twitter', new TwitterStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
