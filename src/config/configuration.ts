export default () => ({
    NODE:{
        PORT: parseInt(process.env.NODE_PORT, 10) || 3000,
        ENV: process.env.NODE_ENV || 'develop',
        URL: process.env.NODE_URL || 'localhost:3000',
    }
});
