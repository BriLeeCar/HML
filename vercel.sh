#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  npm run build:production
else 
  npm run build:payload
fi