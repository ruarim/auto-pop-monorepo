resource "aws_instance" "auto_pop_instance" {
  ami           = "ami-830c94e3"
  instance_type = "t2.micro"
  
  tags = {
    Name = "${var.app_name}-instance"
  }
}

resource "aws_security_group" "nest_app_sg" {
  name        = "nest-app-sg"
  description = "Security group for Nest.js app"
  
  // Specify ingress and egress rules as needed
}

// Define other resources required for app deployment
//RDS - MySql

