import json
import boto3


def lambda_handler(event, context):
    return dispatch(event)
    
def dispatch(intent_request):
    intent_name = intent_request['currentIntent']['name']
    if intent_name == 'NavigationHelp':
        return get_answer(intent_request)
    if intent_name == 'OrderStatus':
        return get_status(intent_request)

def get_status(intent_request: dict,dynamodb = None)->dict:
    slots= intent_request['currentIntent']['slots']
    if slots['number']:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('orders')
        response = table.get_item(Key={'orderid': int(slots['number'])})
        answer=str(response['Item']['status'])
    return fresponse('Fulfilled','Your order is '+answer)

def get_answer(intent_request: dict)->dict:
    slots= intent_request['currentIntent']['slots']
    if slots['query'].lower()=="orderfood":
        return fresponse("Fulfilled","go to menu select the restaurant of youy choice, customize the food and click add to cart")
    if slots['query'].lower()=="orderstatus":
        return fresponse("Fulfilled","go to the chat and add your order number")
    if slots['query'].lower()=="makepayment":
        return fresponse("Fulfilled","you can pay using credit card or UPI")
    if slots['query'].lower()=="contactstaff":
        return fresponse("Fulfilled","go to the chat option, select between the restaurant and representative and send message.")
        
def fresponse(fulfillment,message):
    response = {
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": fulfillment,
            "message": {
                "contentType": "PlainText",
                "content":message
            }
      }
    }
    return response