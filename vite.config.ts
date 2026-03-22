import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

function quizApiPlugin() {
  return {
    name: 'quiz-api',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const dataPath = path.resolve(__dirname, 'src/data/simple_sentence/quiz_data.json');
        
        if (req.url === '/api/quiz' && req.method === 'GET') {
          try {
            const data = fs.readFileSync(dataPath, 'utf-8');
            const items = JSON.parse(data);
            
            // Scrub correct answers and explanations for client
            const scrubbedItems = items.map((item: any) => {
              const { correctAnswer, explanation, ...rest } = item;
              return rest;
            });
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(scrubbedItems));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to read quiz data' }));
          }
        } else if (req.url === '/api/quiz/export' && req.method === 'GET') {
          try {
            if (fs.existsSync(dataPath)) {
              const data = fs.readFileSync(dataPath, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Content-Disposition', 'attachment; filename="quiz_data.json"');
              res.end(data);
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Data not found' }));
            }
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to export quiz data' }));
          }
        } else if (req.url === '/api/quiz/import' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', () => {
             try {
               const importedData = JSON.parse(body);
               if (!Array.isArray(importedData)) {
                 throw new Error("Invalid format: expected JSON array");
               }
               // Write completely new data
               fs.writeFileSync(dataPath, JSON.stringify(importedData, null, 2), 'utf-8');
               res.setHeader('Content-Type', 'application/json');
               res.end(JSON.stringify({ success: true, count: importedData.length }));
             } catch (e: any) {
               console.error(e);
               res.statusCode = 400;
               res.end(JSON.stringify({ error: e.message || 'Invalid JSON' }));
             }
          });
        } else if (req.url === '/api/quiz/grade' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body); 
              const userAnswers = payload.answers || {};
              
              const data = fs.readFileSync(dataPath, 'utf-8');
              const items = JSON.parse(data);
              
              let correctCount = 0;
              const gradedItems: any[] = [];
              let attemptedCount = 0;

              // Grade and update status
              const updatedItems = items.map((item: any) => {
                const userAnswer = userAnswers[item.id];
                if (userAnswer) {
                  attemptedCount++;
                  const isCorrect = userAnswer === item.correctAnswer;
                  if (isCorrect) correctCount++;
                  
                  // Update status in JSON data
                  item.status = isCorrect ? 'success' : 'fail';
                  
                  gradedItems.push({
                    id: item.id,
                    question: item.question,
                    userAnswer,
                    correctAnswer: item.correctAnswer,
                    explanation: item.explanation,
                    isCorrect
                  });
                }
                return item;
              });

              // Write back to disk
              fs.writeFileSync(dataPath, JSON.stringify(updatedItems, null, 2), 'utf-8');
              
              const score = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ score, gradedItems }));
            } catch (e) {
              console.error(e);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to grade quiz' }));
            }
          });
        } else {
          next();
        }
      });
    }
  }
}

export default defineConfig({
  plugins: [react(), quizApiPlugin()],
  server: {
    port: 5173,
    strictPort: true
  }
});
