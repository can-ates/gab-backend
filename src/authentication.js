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
    console.log(profile);
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
    console.log(profile);
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
    console.log(profile);
    // this will set 'googleId'
    const baseData = await super.getEntityData(profile);

    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      avatar: profile.picture,
      email: profile.email,
    };
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('github', new GitHubStrategy());
  authentication.register('facebook', new FaceBookStrategy());
  authentication.register('google', new GoogleStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
