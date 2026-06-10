const amqp = require('amqplib'); 

async function start(){
    try{
        connection = await amqp.connect('amqp://rabbitmq'); 
        channel = await connection.createChannel(); 

        await channel.assertQueue('task_created');
        console.log("Notification service is listening to messages"); 

        channel.consume("task_created", (msg) => {
            const taskData = JSON.parse(msg.content.toString()); 
            console.log("Notification service received task created event:", taskData.title); 
            channel.ack(msg);
        });

    } catch (error) {
        console.error("Error starting notification service:", error);
    }
}

start();

