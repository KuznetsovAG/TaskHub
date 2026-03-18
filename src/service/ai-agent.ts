const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `
Ты профессиональный технический редактор. Твоя задача — улучшать описания задач в трекере.

Правила:
- Сохраняй исходный смысл и все факты
- Делай текст чётким, конкретным, без воды
- Используй активный залог вместо пассивного
- Структурируй: суть задачи → контекст → критерии готовности (если применимо)
- Сохраняй технические термины как есть
- Возвращай ТОЛЬКО улучшенный текст. Без предисловий, без комментариев.
`.trim();

// ── Types ──

// Groq возвращает OpenAI-совместимый формат
interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string;
  }>;
  error?: {
    message: string;
    type: string;
    code?: string;
  };
  // Rate limit info (полезно для дебага)
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class GroqError extends Error {
  constructor(
    message: string,
    public readonly code?: number,
    public readonly type?: string
  ) {
    super(message);
    this.name = "GroqError";
  }
}

// ── Service ──

export async function improveTextWithGroq(
  text: string,
  apiKey: string
): Promise<string> {
  if (!text.trim()) {
    throw new GroqError("Текст не может быть пустым");
  }

  if (!apiKey) {
    throw new GroqError("API ключ не указан");
  }

  let response: Response;

  try {
    response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Groq использует Bearer-токен, как OpenAI
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text },
        ],
        temperature: 0.4,
        max_tokens: 1024,
        // stream: false — явно отключаем стриминг
        // (можно включить для UX "печатающего" эффекта)
        stream: false,
      }),
    });
  } catch {
    // fetch упал на сетевом уровне (офлайн, CORS, DNS)
    throw new GroqError("Нет соединения с Groq API");
  }

  // HTTP-level ошибки
  if (!response.ok) {
    // 429 — rate limit (у Groq он жёсткий на бесплатном плане)
    if (response.status === 429) {
      throw new GroqError(
        "Превышен лимит запросов. Попробуй через несколько секунд.",
        429
      );
    }

    // 401 — невалидный ключ
    if (response.status === 401) {
      throw new GroqError("Неверный API ключ", 401);
    }

    const errorData = await response.json().catch(() => ({}));
    const message =
      (errorData as GroqResponse)?.error?.message ?? `HTTP ${response.status}`;
    throw new GroqError(message, response.status);
  }

  const data: GroqResponse = await response.json();

  // API-level ошибки (200 OK, но error в теле)
  if (data.error) {
    throw new GroqError(data.error.message, undefined, data.error.type);
  }

  const improved = data.choices?.[0]?.message?.content;

  if (!improved) {
    throw new GroqError("Пустой ответ от модели");
  }

  return improved.trim();
}
