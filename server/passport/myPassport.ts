import myPassport, {DoneCallback} from 'passport';
import {githubStrategy} from './github';
import {prisma} from "../domain/PrismaClient";

myPassport.use(githubStrategy);

myPassport.serializeUser((profile, done: DoneCallback) => {
    console.log('serialize user: ' + profile)
    done(null, profile);
});

myPassport.deserializeUser<number>((id: number, done: DoneCallback) => {
    console.log('deserialize user: ' + id)
    prisma.user.findUniqueOrThrow({where: {id: id}})
        .then(res => done(null, {id: res.id}))
        .catch(err => done(err, {id: id}))
});

export {myPassport};
