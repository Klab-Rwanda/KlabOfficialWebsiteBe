import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { googleAuthHandler } from "../services/auth.service";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: Express.User | false) => void
      ) => {
        try {
          const { token, user } = await googleAuthHandler(profile);
          done(null, { token, user });
        } catch (err) {
          done(err as Error, false);
        }
      }
    )
  );
  

passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser((data, done) => {
  done(null, data as any);
});

export default passport;
