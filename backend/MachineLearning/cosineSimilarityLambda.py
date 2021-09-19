import os
import re
import csv
from collections import Counter
import math
import textdistance
import json
import boto3
import urllib
import ast

client = boto3.client('dynamodb')
s3 = boto3.client('s3')
s3wrtie = boto3.resource('s3')

def lambda_handler(event, context):
	my_bucket = event['Records'][0]['s3']['bucket']['name']
	key1 = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'],encoding='utf-8')
	obj = s3.get_object(Bucket=my_bucket, Key=key1)
	new_recipe = obj['Body'].read().decode('utf-8')
	max_similarity = 0
	similar_to = ''
	bucket = s3wrtie.Bucket('csci5410-group-project-recipe-bucket')
	for obje in bucket.objects.all():
		key = obje.key
		body = obje.get()['Body'].read().decode('utf-8')
		if(key1!=key):
			cosine_similarity = textdistance.cosine.similarity(new_recipe,body)
			if(cosine_similarity > max_similarity):
				max_similarity = cosine_similarity
				similar_to = os.path.splitext(key)[0]
	max_similarity = int(max_similarity*100)
	key1 = os.path.splitext(key1)[0]
	key1 = str(key1)
	data = client.get_item(
		TableName= 'recipes',
		Key={
			'dish_name': {
				'S': similar_to
				
			}
		}
		)
	print(data['Item']['Type']['S']);
	type = data['Item']['Type']['S'];
	type = str(type)
	client.put_item(
		TableName= 'recipes',
		Item={'dish_name':{'S': key1}, 'Type':{'S': type}}
		)
	final_output = "Your dish "+key1+" is "+str(max_similarity)+"% similar to "+similar_to+" and its tag is "+type+"."
	s3.put_object(Bucket='csci-5410-group-project-output', Key='output.txt', Body=final_output, ACL='public-read')