from google import genai
import os
import json

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_summary(openfda_data):

    prompt = f"""
Drug Information:
{json.dumps(openfda_data, indent=2)}

You are a medical accessibility assistant.

Your job is NOT to give medical advice.

Rewrite the FDA label into language understandable by an average patient while preserving EVERY safety warning.

Return ONLY valid JSON.

Return EXACTLY this structure:

{{
    "summary": {{
        "purpose": "",
        "dosage": "",
        "side_effects": "",
        "warnings": "",
        "doctor": ""
    }},

    "highlights": [
        {{
            "term": "",
            "exact_text": "",
            "section": "",
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

Rules:

- Return JSON only.
- No markdown.
- No ```json.
- No explanations.

Summary:
- 6th–8th grade reading level.
- Keep all important warnings.

Highlights:
- "term" = difficult medical word
- "exact_text" = EXACT wording copied from the FDA label
- "section" must be one of:
    purpose
    indications
    dosage
    warnings
    adverse_reactions

- definition = max 2 sentences
- reason = why patient should care
- severity = info | important | warning | critical

Important notices:
- Return the 3-5 most important warnings.
- Never invent information.
"""

    response = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt
    )

    text = response.output_text.strip()


    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    try:
        return json.loads(text)

    except json.JSONDecodeError:
        print("Gemini returned invalid JSON:")
        print(text)

        return {
            "summary": {
                "purpose": "",
                "dosage": "",
                "side_effects": "",
                "warnings": "",
                "doctor": ""
            },
            "highlights": [],
            "important_notices": [],
            "error": "Invalid JSON returned by Gemini",
            "raw": text
        }