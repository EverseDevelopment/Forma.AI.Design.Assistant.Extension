import json
import openai

# setting up project based API key from Mithun
openai.api_key = 'sk-proj-vqJE6iC2UTKook4fi1szT3BlbkFJlRbhTDyFSZ3GDZhAtILS'

def read_data(event, context):
    data = event["body-json"]
    if data:
        try:
            query = event["params"]["querystring"]["query"]
        except:
            query = False
        if query:
            messages = [{"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": f"Here is the gievn data:\n\n{data}\n\nAnswer question based on the given data: {query}"}]
            response = openai.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
            GPT_reply = response.choices[0].message.content
            return GPT_reply
        else:
            return data
    else:
        return "no data recieved"