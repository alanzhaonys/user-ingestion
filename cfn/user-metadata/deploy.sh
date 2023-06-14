#!/bin/bash

CLOUDFORMATION_BUCKET=XXXXX
STACK_NAME=demo-user-ingestion
PROFILE=default
REGION=us-east-1

aws cloudformation package \
  --template-file template.yaml \
  --output-template-file template.packaged.yaml \
  --s3-bucket $CLOUDFORMATION_BUCKET \
  --s3-prefix $STACK_NAME \
  --force-upload \
  --profile $PROFILE

aws cloudformation deploy \
  --template-file template.packaged.yaml \
  --stack-name $STACK_NAME \
  --s3-bucket $CLOUDFORMATION_BUCKET \
  --tags Application=$STACK_NAME \
  --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
  --region $REGION \
  --profile $PROFILE
