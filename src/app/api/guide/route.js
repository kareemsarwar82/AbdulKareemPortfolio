function createFallbackStream(text) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: { text } })}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
}

export async function POST(req) {
  const { messages, currentSection, systemPrompt } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return createFallbackStream("Please add your GEMINI_API_KEY in .env.local to enable AI responses.");
  }

  try {
    // Convert chat history to Gemini format
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const sectionContext = currentSection
      ? ` The visitor is currently viewing the "${currentSection}" section.`
      : "";

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt + sectionContext }],
          },
          contents,
          generationConfig: { maxOutputTokens: 200, temperature: 0.8 },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini error:", res.status, errText);
      return createFallbackStream("I'm having trouble connecting right now. Please try again in a moment!");
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

    if (!text) {
      return createFallbackStream("I didn't get a response. Please try asking again!");
    }

    // Word-by-word streaming effect
    const encoder = new TextEncoder();
    const words = text.split(" ");

    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const word = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: { text: word } })}\n\n`));
          await new Promise((r) => setTimeout(r, 30));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

  } catch (error) {
    console.error("Gemini request failed:", error);
    return createFallbackStream("Connection error. Please check your internet and try again!");
  }
}