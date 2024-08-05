import e from 'express';
import dbClient from './utils/db.js';
import { v4 } from 'uuid';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject()
                }
                else if(!dbClient.isAlive()) {
                    repeatFct()
                }
                else {
                    resolve()
                }
            }, 1000);
        };
        repeatFct();
    })
};

(async () => {
    console.log(dbClient.isAlive());
    await waitConnection();
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());

    console.log('\nTesting userExists');
    console.log(await dbClient.userExists('test'));
    console.log(await dbClient.userExists('fakeUser'));

    console.log('\nTesting user creation');
    //console.log('success =>', await dbClient.createUser('ifeanyi@yahoo.com', 'pwd'));
    try {
      console.log(await dbClient.createUser('Ifeanyi3', 'pwd'));
    } catch (err) {
      console.error(err);
    }
    console.log('\nTesting retrieveUser');
    console.log('GET =>', await dbClient.retrieveUser({ email: 'ifeanyi@yahoo.com'}));

    console.log('Testing update user');
    const token = v4();
    //console.log(await dbClient.updateUser('Ifeanyi3', { token }));
    console.log(await dbClient.updateUser('ifeks', { token }));
})();
