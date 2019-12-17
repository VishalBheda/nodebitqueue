### **Simple RabbitMQ interaction with Nodejs**
<pre>
<b>Start RabbitMQ Server with custom download</b>
<a href="https://www.rabbitmq.com/download.html" target="_blank">Downloading and Installing RabbitMQ Official</a>
make sure enable rabbitmq_management
</pre>

<pre>
<b>Start RabbitMQ server using dockers</b>
$ docker-compose up -d 
</pre>

<pre>
Install <a href="https://www.npmjs.com/package/amqplib" target="_blank">AMQP 0-9-1</a> library and client for Node.JS

$ npm install</pre>

<pre>
start subscriber
$ cd subscriber
$ node index.js
</pre>

<pre>
start producer
$ cd producer
$ node index.js
$ hello world!
</pre>


