# 🧠 Cortexa

### **The AI-Powered Interview Intelligence & Career Coaching Platform**

Cortexa is a cutting-edge platform designed to help candidates master the art of interviewing and landing their dream jobs. By merging advanced Generative AI with real-time vocal expression analysis, Cortexa provides an immersive, data-driven preparation experience that goes far beyond static question lists.

---

## ✨ Key Features

### 🎙️ **AI Mock Interviews (Technical & Behavioral)**
Experience realistic interview simulations powered by **Google Gemini** and the **Vercel AI SDK**. The platform generates context-aware questions based on your target job description and provides instant, constructive feedback on your answers.

### 🎭 **Real-time Vocal & Emotional Analysis**
Leveraging **Hume AI (EVI)**, Cortexa analyzes your vocal tone, sentiment, and emotional impact during voice-based sessions. Get insights into your confidence, engagement, and communication clarity to refine your presence.

### 📄 **ATS-Optimization Engine**
Don't let your resume get lost in the "black hole." Our resume architect analyzes your profile against specific job postings to identify keyword gaps, suggest impact-driven bullet points, and ensure you pass through Applicant Tracking Systems.

### 🔍 **Job Description Deep Dive**
Extract hidden requirements and prioritized skill sets from any job posting. Contextualize your preparation by understanding exactly what hiring managers are looking for.

### 💎 **Premium Experience**
A meticulously designed interface using **Framer Motion**, **GSAP**, and **Three.js** to provide a smooth, high-end user experience that feels as professional as the roles you are applying for.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js 15+](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/), [Google Gemini Pro](https://deepmind.google/technologies/gemini/), [Hume AI (EVI)](https://hume.ai/)
- **Database & Auth:** [PostgreSQL](https://www.postgresql.org/), [Drizzle ORM](https://orm.drizzle.team/), [Clerk Auth](https://clerk.com/)
- **Security:** [Arcjet](https://arcjet.com/) (Rate limiting & Bot protection)
- **Animations:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [Shadcn UI](https://ui.shadcn.com/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Bun, NPM, or PNPM
- A PostgreSQL database (e.g., Neon.tech)
- API Keys for: Clerk, Google AI (Gemini), Hume AI, and Arcjet.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cortexa.git
   cd cortexa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your credentials (see `.env.example` for reference).

4. **Initialize the Database:**
   ```bash
   npm run db:push
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛡️ Security & Performance

- **Edge Ready:** Optimized for Vercel Edge Functions to ensure low latency globally.
- **Bot Protection:** Integrated with Arcjet to prevent automated scraping and AI API abuse.
- **Type Safety:** End-to-end type safety with TypeScript and Zod validation.

---

## 📜 License

This project is licensed under the MIT License.

---

*Built with ❤️ by the Cortexa Team*
