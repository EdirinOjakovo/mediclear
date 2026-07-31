from google import genai
import os

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# interaction1 = client.interactions.create(
#     model="gemini-3.6-flash",
#     input="You are a medical information summarizer. Your job is NOT to provide medical advice. ONLY summarize the FDA information below. " \
#     "If information is missing, say 'Not listed in FDA data.' " \
#     "Write at an 8th-grade reading level. Use bullet points." \
#     "FDA Data: ",)
# print("Response 1:", interaction1.output_text)


def generate_summary(openfda_data):
    prompt = f"""
    Summarize the following FDA drug information in simple language.

    Drug Information:
    {openfda_data}

    Include:
    - What the drug is used for
    - Common side effects
    - Serious warnings
    - Who should avoid taking it
    - Keep it under 200 words.
    """

    response = client.interactions.create(
    model="gemini-3.6-flash",
    input=prompt,)

    print(response.output_text)
    return response.output_text

# interaction2 = client.interactions.create(
#     model="gemini-3.6-flash",
#     input="How many paws are in my house?",
#     previous_interaction_id=interaction1.id,
# )
# print("Response 2:", interaction2.output_text)