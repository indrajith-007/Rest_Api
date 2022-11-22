import config from 'config';
import mongoose from 'mongoose';
import log from './logger';

const connect = async () => {
    const dburi = config.get('dbUri');

    try {
        await mongoose.connect(`${dburi}`);
        log.info('Database connected!!!');
    } catch (e: any) {
        console.error(e);
        log.error('DB connect failed');
    }
};

export default connect;
