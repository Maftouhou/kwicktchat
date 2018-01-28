provider "aws" {
   access_key = "${var.access_key}"
   secret_key = "${var.secret_key}"
   region = "${var.region}"
}

resource "aws_instance" "MEAN" {
   ami = "ami-fcc4db98"
   instance_type = "t2.micro"
   vpc_security_group_ids = ["${aws_security_group.instance.id}"]

   provisioner "local-exec" {
      command = "echo ${self.private_ip} > file.txt"
   }

   tags {
      Name = "AMI_FRM_TF_COOL"
   }
}

resource "aws_security_group" "instance" {
   name = "terraf_ex_inst"

   ingress {
      from_port = "${var.from_port}"
      to_port = "${var.to_port}"
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
   }
}
