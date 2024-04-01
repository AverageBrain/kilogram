import myPassport from 'passport';
import {githubStrategy} from './github';
import {User} from "./domain/entity/User";

myPassport.use(githubStrategy);

myPassport.serializeUser((profile: User, done) => {
    done(null, profile);
});

myPassport.deserializeUser((profile: User, done) => {
    done(null, profile);
});

export { myPassport };
