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
    Drug Information:
    {openfda_data}

    You are a medical accessibility assistant.

    You will receive an FDA drug label.

    Your job is NOT to give medical advice.

    Your job is to improve readability while preserving every important safety warning.

    Return ONLY valid JSON.

    Create:

    1. A patient-friendly summary.

    2. A list of medical terms that an average patient may not understand.

    For each term provide:

    - the exact term
    - a short definition (max 2 sentences)
    - why the user should pay attention to it
    - severity:
        info
        important
        warning
        critical

    3. Extract the most important warnings a patient should notice immediately.

    Never invent information.
    Only use information present in the FDA label.

    Return in valid JSON:
    Return this exact structure:

    {{
        "summary": {{
            "purpose": "...",
            "dosage": "...",
            "side_effects": "...",
            "warnings": "...",
            "doctor": "..."
        }},

        "highlights": [
            {{
                "term": "",
                "definition": "",
                "reason": "",
                "severity": "info"
            }}
        ],

        "important_notices": [
            {{
                "title": "",
                "description": "",
                "severity": "warning"
            }}
        ]
    }}


    """

    response = client.models.generate_content(
    model="gemini-2.5-pro",contents=prompt)

    #print(response.output_text)
    return response.text
