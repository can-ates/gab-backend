const {
  AuthenticationService,
  JWTStrategy,
} = require('@feathersjs/authentication');
const {
  expressOauth,
  OAuthStrategy,
} = require('@feathersjs/authentication-oauth');
const axios = require('axios');

class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.login,
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

    const userData = await axios.get(
      'https://api.twitter.com/1.1/account/verify_credentials.json',
      {
        headers: {
          oauth_token: profile.access_token,
          oauth_token_secret: profile.access_secret,
        },
        params: {
          include_email: true,
        },
      }
    );
    console.log(userData);
  }
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
