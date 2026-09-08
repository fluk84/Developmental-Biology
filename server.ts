import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 image/audio uploads
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // API Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 1. Chat & Scientific Q&A Endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, history, prompt, mode = "standard", systemInstruction } = req.body;
      
      let rawMessages = messages;
      if (!rawMessages || !Array.isArray(rawMessages) || rawMessages.length === 0) {
        if (history && Array.isArray(history)) {
          rawMessages = [...history, ...(prompt ? [{ role: "user", text: prompt }] : [])];
        } else if (prompt) {
          rawMessages = [{ role: "user", text: prompt }];
        }
      }

      if (!rawMessages || !Array.isArray(rawMessages) || rawMessages.length === 0) {
        return res.status(400).json({ error: "Missing or invalid messages array or prompt" });
      }

      const ai = getGeminiClient();
      const defaultInstruction = `คุณคือ Dr. BioDev ผู้เชี่ยวชาญระดับศาสตราจารย์ด้านชีววิทยาพัฒนาการ (Developmental Biology), ตัวอ่อนวิทยา (Embryology), พันธุศาสตร์ และเซลล์ต้นกำเนิด
ตอบคำถามด้วยความถูกต้องทางวิชาการ มีโครงสร้างชัดเจน เข้าใจง่าย ภาษาไทยสละสลวยและระบุศัพท์เฉพาะทางภาษาอังกฤษกำกับเมื่อจำเป็น
ให้ความรู้ครอบคลุมทั้ง:
- การแบ่งเซลล์และการเจริญ (Cleavage, Blastulation, Gastrulation)
- การกำหนดชะตากรรมและการแยกความแตกต่างของเซลล์ (Cell Fate & Differentiation)
- การควบคุมระดับโมเลกุล (Morphogens, Wnt, BMP, Sonic Hedgehog, Notch, FGF)
- การสร้างอวัยวะและเนื้อเยื่อ 3 ชั้น (Ectoderm, Mesoderm, Endoderm)
- ความผิดปกติแต่กำเนิดและเวชศาสตร์ฟื้นฟู (Regenerative Medicine & Stem Cells)`;

      const instruction = systemInstruction || defaultInstruction;

      // Select model & config based on requested mode
      let model = "gemini-3.8-flash";
      const config: Record<string, unknown> = {
        systemInstruction: instruction,
      };

      if (mode === "fast") {
        model = "gemini-3.1-flash-lite";
      } else if (mode === "thinking") {
        // High thinking reasoning for complex developmental biology & genetic mechanics
        model = "gemini-3.8-flash";
        config.thinkingConfig = {
          thinkingLevel: ThinkingLevel.HIGH,
        };
      } else if (mode === "search") {
        // Real-time scientific research grounding
        model = "gemini-3.5-flash";
        config.tools = [{ googleSearch: {} }];
      }

      // Format conversation history for generateContent
      const contents = rawMessages.map((m: { role: string; content?: string; text?: string }) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.text || m.content || "" }],
      }));

      const response = await ai.models.generateContent({
        model,
        contents,
        config,
      });

      // Extract search grounding metadata if present
      let groundingSources: Array<{ title?: string; uri?: string }> = [];
      let searchQueries: string[] = [];
      try {
        const candidate = response.candidates?.[0];
        const metadata = candidate?.groundingMetadata;
        if (metadata?.webSearchQueries) {
          searchQueries = metadata.webSearchQueries;
        }
        const searchChunks = metadata?.groundingChunks;
        if (searchChunks && Array.isArray(searchChunks)) {
          groundingSources = searchChunks
            .map((chunk) => chunk.web)
            .filter((w): w is { uri?: string; title?: string } => Boolean(w && (w.uri || w.title)))
            .map((w) => ({ title: w.title || w.uri, uri: w.uri }));
        }
      } catch (err) {
        console.error("Error parsing grounding sources:", err);
      }

      return res.json({
        text: response.text || "ไม่มีข้อความตอบกลับจากระบบ",
        modelUsed: model,
        mode,
        groundingSources,
        searchQueries,
      });
    } catch (error: unknown) {
      console.error("Gemini chat error:", error);
      const err = error as { message?: string };
      return res.status(500).json({
        error: err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับ Gemini API",
      });
    }
  });

  // 1.5. Dedicated Glossary Search Grounding Endpoint (gemini-3.5-flash with googleSearch tool)
  app.post("/api/gemini/glossary-lookup", async (req, res) => {
    try {
      const { term, termTh } = req.body;
      if (!term) {
        return res.status(400).json({ error: "Missing term" });
      }

      const ai = getGeminiClient();
      const prompt = `ทำการสืบค้นข้อมูลวิทยาศาสตร์การแพทย์ล่าสุดผ่าน Google Search เกี่ยวกับศัพท์เฉพาะทางชีววิทยาพัฒนาการ: "${term}" (${termTh || ''})
ค้นหาข้อมูลจากงานวิจัย วารสารวิทยาศาสตร์ระดับสากล (เช่น Nature, Cell, Science, PubMed) และหลักสูตรการแพทย์สมัยใหม่

โปรดสังเคราะห์ข้อมูลทางวิชาการอย่างกระชับ ชัดเจน และมีโครงสร้างดังนี้:
1. นิยามและกลไกระดับเซลล์/โมเลกุลที่ได้รับการยอมรับในปัจจุบัน (Modern Consensus & Molecular Mechanisms)
2. การค้นพบหรือความก้าวหน้าทางวิจัยล่าสุด (Recent Scientific Breakthroughs & Novel Findings)
3. ความสำคัญทางการแพทย์และเวชศาสตร์ฟื้นฟู (Clinical Significance & Therapeutic Relevance)

เขียนตอบเป็นภาษาไทยเชิงวิชาการที่กระชับ อ่านง่าย พร้อมระบุคำศัพท์ภาษาอังกฤษกำกับ`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "คุณคือนักวิทยาศาสตร์ผู้เชี่ยวชาญด้านชีววิทยาพัฒนาการและพันธุศาสตร์ระดับโมเลกุล สังเคราะห์ข้อมูลการวิจัยล่าสุดอย่างถูกต้องแม่นยำ พร้อมอ้างอิงข้อมูลจากแหล่งข้อมูล Google Search",
        },
      });

      let groundingSources: Array<{ title?: string; uri?: string }> = [];
      let searchQueries: string[] = [];
      try {
        const candidate = response.candidates?.[0];
        const metadata = candidate?.groundingMetadata;
        if (metadata?.webSearchQueries) {
          searchQueries = metadata.webSearchQueries;
        }
        if (metadata?.groundingChunks && Array.isArray(metadata.groundingChunks)) {
          groundingSources = metadata.groundingChunks
            .map((chunk) => chunk.web)
            .filter((w): w is { uri?: string; title?: string } => Boolean(w && (w.uri || w.title)))
            .map((w) => ({ title: w.title || w.uri, uri: w.uri }));
        }
      } catch (err) {
        console.error("Error parsing grounding chunks in glossary lookup:", err);
      }

      return res.json({
        term,
        text: response.text || "ไม่พบข้อมูลเพิ่มเติม",
        groundingSources,
        searchQueries,
        modelUsed: "gemini-3.5-flash (Google Search Grounded)",
      });
    } catch (error: unknown) {
      console.error("Glossary search error:", error);
      const err = error as { message?: string };
      return res.status(500).json({
        error: err.message || "เกิดข้อผิดพลาดในการค้นคว้าข้อมูลด้วย Google Search Grounding",
      });
    }
  });

  // 2. Multimodal Embryo & Histology Image Analysis
  app.post("/api/gemini/analyze-image", async (req, res) => {
    try {
      const { imageBase64, mimeType = "image/jpeg", prompt } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "Missing image data" });
      }

      const ai = getGeminiClient();
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, "");

      const analysisPrompt = prompt || `ช่วยวิเคราะห์ภาพตัวอย่างทางชีววิทยาพัฒนาการนี้อย่างละเอียด:
1. ระยะการพัฒนาการ (Developmental Stage) เช่น Zygote, Morula, Blastocyst, Gastrula, Neurula หรือ Organogenesis
2. โครงสร้างสำคัญที่ตรวจพบ (Identified Structures) และเนื้อเยื่อกำเนิด (Germ Layers: Ectoderm / Mesoderm / Endoderm)
3. กลไกเซลล์และโมเลกุลที่เกิดขึ้นในระยะนี้ (Key Cellular/Molecular Events)
4. ความสำคัญทางชีววิทยาหรือการแพทย์ที่เกี่ยวข้อง
ตอบเป็นภาษาไทยพร้อมศัพท์เทคนิคภาษาอังกฤษ`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: analysisPrompt,
            },
          ],
        },
        config: {
          systemInstruction: "คุณคือผู้เชี่ยวชาญด้านตัวอ่อนวิทยาและชีววิทยาพัฒนาการระดับสากล วิเคราะห์ภาพจุลทรรศน์ ภาพตัดขวางตัวอ่อน และโครงสร้างอวัยวะได้อย่างแม่นยำทางกายวิภาคศาสตร์",
        },
      });

      return res.json({
        analysis: response.text || "ไม่สามารถวิเคราะห์ภาพได้",
      });
    } catch (error: unknown) {
      console.error("Image analysis error:", error);
      const err = error as { message?: string };
      return res.status(500).json({
        error: err.message || "เกิดข้อผิดพลาดในการวิเคราะห์ภาพ",
      });
    }
  });

  // 3. Audio Transcription (gemini-3.5-transcribe)
  app.post("/api/gemini/transcribe", async (req, res) => {
    try {
      const { audioBase64, mimeType = "audio/webm" } = req.body;
      if (!audioBase64) {
        return res.status(400).json({ error: "Missing audio data" });
      }

      const ai = getGeminiClient();
      const cleanBase64 = audioBase64.replace(/^data:audio\/[a-zA-Z0-9+.-]+;base64,/, "");

      const response = await ai.models.generateContent({
        model: "gemini-3.5-transcribe",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: "ถอดเสียงบันทึกนี้เป็นข้อความอย่างถูกต้อง (Transcribe the spoken audio into text in Thai or English as spoken). ให้คงคำศัพท์ทางชีววิทยาไว้ถูกต้อง",
            },
          ],
        },
      });

      return res.json({
        transcript: response.text || "",
      });
    } catch (error: unknown) {
      console.error("Audio transcription error:", error);
      const err = error as { message?: string };
      return res.status(500).json({
        error: err.message || "เกิดข้อผิดพลาดในการแปลงเสียงเป็นข้อความ",
      });
    }
  });

  // 4. Generate Scientific Illustration / Diagram with Aspect Ratio Control
  app.post("/api/gemini/generate-image", async (req, res) => {
    try {
      const { prompt, aspectRatio = "16:9" } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = getGeminiClient();
      const validAspectRatios = ["1:1", "3:4", "4:3", "9:16", "16:9", "21:9"];
      const selectedAspect = validAspectRatios.includes(aspectRatio) ? aspectRatio : "16:9";

      const enhancedPrompt = `Scientific textbook medical illustration of developmental biology: ${prompt}. Clean anatomical cross-section, clear cell boundaries, scientific accuracy, educational diagram style, high clarity, labelled structures without text artifacts.`;

      // Try image generation model
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image",
        contents: {
          parts: [{ text: enhancedPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: selectedAspect,
            imageSize: "1K",
          },
        },
      });

      let imageUrl = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const mime = part.inlineData.mimeType || "image/png";
            imageUrl = `data:${mime};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (!imageUrl) {
        return res.status(500).json({
          error: "ไม่สามารถสร้างภาพได้ กรุณาลองใหม่อีกครั้ง",
        });
      }

      return res.json({
        imageUrl,
        aspectRatio: selectedAspect,
        prompt,
      });
    } catch (error: unknown) {
      console.error("Image generation error:", error);
      const err = error as { message?: string };
      return res.status(500).json({
        error: err.message || "เกิดข้อผิดพลาดในการสร้างภาพประกอบทางชีววิทยา",
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Developmental Biology Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
