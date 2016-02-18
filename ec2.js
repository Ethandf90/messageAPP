//to create a new instance, modify the ImageId below, and have the AWS_ACCESS_KEY prepared
//run 'node ec2.js'  to create an instance named 'instanceByCode'

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var ec2 = new AWS.EC2();
var instanceName = "instanceByCode";

// AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are exported for safety

var params = {
  ImageId: 'ami-f6bb8d9c', // this is a private image
  InstanceType: 't1.micro',
  MinCount: 1, MaxCount: 1
};

// Create the instance
ec2.runInstances(params, function(err, data) {
  if (err) { console.log("Could not create instance", err); return; }

  var instanceId = data.Instances[0].InstanceId;
  console.log("Created instance", instanceId);

  // Add tags to the instance
  params = {Resources: [instanceId], Tags: [
    {Key: 'Name', Value: instanceName}
  ]};
  ec2.createTags(params, function(err) {
    console.log("Tagging instance", err ? "failure" : "success");
  });
});