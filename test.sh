#!/bin/bash

urlencode() {
  printf "$1" | xxd -plain | tr -d '\n' | sed 's/\(..\)/%\1/g'
}

API_URL="https://XXXXX.execute-api.us-east-1.amazonaws.com/prod/store"
API_KEY="XXXXX"
TOPIC="arn:aws:sns:us-east-1:XXXXX:demo-user-ingestion-topic"

SUBJECT=$(urlencode "New user sign up")
MESSAGE=$(urlencode '{"username":"demo-user-ingestion","user_id":"demo","email":"demo@demo.com"}')

curl -H "x-api-key: $API_KEY" \
  "$API_URL?topic=$TOPIC&message=$MESSAGE&subject=$SUBJECT"  
