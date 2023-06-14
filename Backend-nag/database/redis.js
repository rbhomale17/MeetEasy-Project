const Redis = require("ioredis");


const redis = new Redis({
    port: 16711, 
    host: 'redis-16711.c305.ap-south-1-1.ec2.cloud.redislabs.com', 
    password: '3B1MTC6cd0jNPDX9t2Rzmr0TAgRr362m',
});



module.exports = {redis};