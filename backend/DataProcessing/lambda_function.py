import os

os.environ['MPLCONFIGDIR'] = "/tmp"
import matplotlib.pyplot as plt
import json
import boto3
from wordcloud import WordCloud, STOPWORDS

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
comprehend = boto3.client("comprehend")
s3 = boto3.client('s3')


def generate_word_cloud(text):
    wordcloud = WordCloud(width=3000,
                          height=2000,
                          random_state=1,
                          background_color='white',
                          colormap='Pastel1',
                          collocations=False,
                          stopwords=STOPWORDS).generate(text)
    plt.imshow(wordcloud)
    plt.savefig("/tmp/halifaxFoodieCloud.png")


def lambda_handler(event, context):
    # TODO implement
    table = dynamodb.Table('Ratings')
    response = table.scan(AttributesToGet=['comment'])
    data = response['Items']
    mylist = ' '.join([str(elem) for elem in data])
    entities = comprehend.detect_entities(Text=mylist, LanguageCode="en")
    output = json.dumps(entities)
    myOutput = json.loads(output)
    strf = ""
    for i in range(0, len(myOutput['Entities'])):
        strf += myOutput['Entities'][i]['Text']
        strf += " "
    generate_word_cloud(strf)
    s3.upload_file("/tmp/halifaxFoodieCloud.png", "halifaxfoodie", "halifaxFoodieCloud.png",
                   ExtraArgs={'ACL': 'public-read'})
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
        },
        'body': json.dumps('Here is your wordCloud!')
    }
