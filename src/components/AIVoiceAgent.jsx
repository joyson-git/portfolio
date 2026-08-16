import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUICK_PROMPTS = [
  'Who is Joyson Pinto?',
  'Show featured projects',
  'What is his tech stack?',
  'Tell me about his experience',
  'What is his education?',
  'Any achievements or hackathons?',
  'How to contact Joyson?'
]

// -----------------------------------------------------------------------
// Pretrained knowledge base — sourced from Joyson Pinto's resume.
// Each entry: id, an array of trigger keywords/phrases, the section to
// scroll to (or null), and the spoken/displayed reply.
// Matching picks the entry whose matched keyword is the longest/most
// specific, so "spring boot" beats a generic "skill" match, etc.
// -----------------------------------------------------------------------
const KNOWLEDGE_BASE = [
  {
    id: 'about',
    keywords: ['who is joyson', 'who are you', 'about joyson', 'about you', 'who', 'introduce'],
    section: 'about',
    reply:
      "Joyson Pinto is a Full Stack Developer based in Bangalore, India. He builds healthcare web applications using Angular, Node.js, Express dot js, and MongoDB, with strong backend fundamentals in Java and Spring Boot, plus experience in test automation and performance testing."
  },
  {
    id: 'current-role',
    keywords: ['current job', 'current role', 'where does he work', 'current company', 'teslon', 'present job'],
    section: 'experience',
    reply:
      "Since June 2025, Joyson has been working as a Full Stack Developer at Teslon Technology in Bangalore, building healthcare web applications end to end."
  },
  {
    id: 'experience',
    keywords: ['experience', 'work history', 'career', 'job history', 'employment'],
    section: 'experience',
    reply:
      "Joyson has about a year of professional experience. He's currently a Full Stack Developer at Teslon Technology since June 2025, building healthcare apps with Angular, Node.js, and MongoDB, plus test automation with Playwright and WebdriverIO. Before that, he interned as a Software Engineer at Ekathva Innovations from August to December 2022, where he built a Student Result Management System with Java and improved performance by 30 percent."
  },
  {
    id: 'internship',
    keywords: ['intern', 'ekathva', 'first job'],
    section: 'experience',
    reply:
      "Joyson interned as a Software Engineer at Ekathva Innovations from August to December 2022. He built a Student Result Management System using Java Servlets, JSP, JDBC, and MySQL, deployed it on AWS, and improved system performance by 30 percent through query optimization."
  },
  {
    id: 'healthcare',
    keywords: ['healthcare', 'hospital', 'patient'],
    section: 'experience',
    reply:
      "At Teslon Technology, Joyson develops healthcare web applications for hospitals and patients — building dynamic Angular UIs and RESTful APIs with Node dot js, Express, and MongoDB to handle patient data and hospital workflows."
  },
  {
    id: 'ai-llm',
    keywords: ['rag', 'llm', 'ollama', 'ai pipeline', 'artificial intelligence', 'ragas', 'mcp', 'model context protocol', 'ai-assisted'],
    section: 'experience',
    reply:
      "Joyson has hands-on AI experience: he implemented Retrieval-Augmented Generation pipelines using Ollama for local LLM interactions, added speech-to-text for accessibility, and evaluated LLM performance with the Ragas framework. He also uses MCP, the Model Context Protocol, for AI-assisted development to speed up automation script generation."
  },
  {
    id: 'testing',
    keywords: ['test automation', 'testing', 'playwright', 'webdriverio', 'artillery', 'load testing', 'qa', 'quality assurance'],
    section: 'skills',
    reply:
      "Joyson builds end-to-end test automation suites with Playwright and WebdriverIO to catch regressions in critical flows, and runs load and performance testing with Artillery to identify API bottlenecks and ensure stability under high concurrency."
  },
  {
    id: 'projects',
    keywords: ['project', 'portfolio', 'repo', 'built', 'ecommerce', 'e-commerce'],
    section: 'projects',
    reply:
      "One of Joyson's key projects is an E-Commerce application built with Java, Spring Boot, and a microservices architecture — including Product, Category, Cart, Order, Payment, and Search services, JWT-based authentication, and role-based authorization using Spring Security, Eureka Server, and an API Gateway. It's on his GitHub. Let me take you to the projects section."
  },
  {
    id: 'skills',
    keywords: ['skill', 'stack', 'language', 'tech', 'technologies', 'tools'],
    section: 'skills',
    reply:
      "Joyson's core stack spans Java and JavaScript for languages; Spring Boot, Node dot js, Express dot js, and microservices for backend; Angular, HTML, and CSS for frontend; MongoDB and MySQL for databases; Playwright, WebdriverIO, and Artillery for testing; and Git, Postman, Swagger, AWS, and MCP for tooling."
  },
  {
    id: 'education',
    keywords: ['education', 'college', 'degree', 'university', 'study', 'diploma', 'cgpa'],
    section: 'about',
    reply:
      "Joyson holds a Bachelor of Engineering in Information Science and Engineering from Jawaharlal Nehru New College of Engineering, VTU, with a CGPA of 7.5 out of 10, completed in 2023. Before that, he earned a Diploma in Computer Science from M.E.S.R.N. Shetty Polytechnic in Sirsi, Karnataka, in 2020."
  },
  {
    id: 'achievements',
    keywords: ['achievement', 'hackathon', 'leetcode', 'coding ninjas', 'dpdzero', 'leucine', 'award'],
    section: 'about',
    reply:
      "Joyson has solved over 500 problems on LeetCode and 200-plus on Coding Ninjas. He built an analytics dashboard with Python, Pandas, and scikit-learn for the DPDZero Data Analyst Hackathon, and contributed to a smart manufacturing project at the Leucine Hackathon."
  },
  {
    id: 'contact',
    keywords: ['contact', 'hire', 'email', 'reach', 'phone', 'number', 'linkedin', 'github', 'connect'],
    section: 'contact',
    reply:
      "You can reach Joyson at joysonpinto77@gmail.com."
  },
  {
    id: 'freelance-remote',
    keywords: ['freelance', 'remote', 'free', 'trial', 'contract', 'collaboration', 'part time', 'probation', 'pro bono'],
    section: 'contact',
    reply:
      "Yes! Joyson is open to freelance projects and remote full-time roles worldwide. He is also open to working on an initial trial or pro-bono basis for the first few months to prove engineering excellence and deliver value first."
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'download resume', 'curriculum vitae', 'pdf'],
    section: null,
    reply:
      "You can download Joyson's full PDF resume directly from the top navigation bar, the hero section, or by pressing Command K on your keyboard."
  },
  {
    id: 'location',
    keywords: ['location', 'where is he based', 'based in', 'city', 'bangalore'],
    section: 'about',
    reply: "Joyson is based in Bangalore, India."
  }
]

function matchQuery(query) {
  const q = query.toLowerCase()
  let best = null
  let bestLen = 0
  for(const entry of KNOWLEDGE_BASE) {
    for(const kw of entry.keywords) {
      if(q.includes(kw) && kw.length > bestLen) {
        best = entry
        bestLen = kw.length
      }
    }
  }
  return best
}

export default function AIVoiceAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [inputText, setInputText] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [agentResponse, setAgentResponse] = useState(
    'Hello! I am Joyson\u2019s AI Voice Assistant.'
  )
  const recognitionRef = useRef(null)

  const handleTextSubmit = (e) => {
    e.preventDefault()
    if(!inputText.trim()) return
    setTranscript(inputText)
    handleUserQuery(inputText)
    setInputText('')
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if(SpeechRecognition) {
      const rec = new SpeechRecognition()
      rec.continuous = false
      rec.interimResults = false
      rec.lang = 'en-US'

      rec.onresult = (event) => {
        const text = event.results[0][0].transcript
        setTranscript(text)
        setIsListening(false)
        handleUserQuery(text)
      }

      rec.onerror = () => setIsListening(false)
      rec.onend = () => setIsListening(false)

      recognitionRef.current = rec
    }
  }, [])

  const speakText = (text, onEndCallback) => {
    if(!('speechSynthesis' in window)) {
      if(onEndCallback) onEndCallback()
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.05

    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    )
    if(preferredVoice) utterance.voice = preferredVoice

    utterance.onstart = () => {
      setIsSpeaking(true)
      setIsPaused(false)
    }
    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
      if(onEndCallback) onEndCallback()
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
      if(onEndCallback) onEndCallback()
    }

    window.speechSynthesis.speak(utterance)
  }

  const togglePauseSpeech = () => {
    if(!('speechSynthesis' in window)) return
    if(window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    } else if(window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    }
  }

  const stopSpeech = () => {
    if(!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  const handleUserQuery = (query) => {
    const raw = (query || '').trim()
    if(!raw || !raw.replace(/[^a-zA-Z0-9]/g, '').length) {
      const reply = "I didn't catch a question there. Try asking something like \"Who is Joyson Pinto?\" or tap one of the quick questions below."
      setIsInvalid(true)
      setAgentResponse(reply)
      speakText(reply)
      return
    }

    const match = matchQuery(raw)

    if(!match) {
      const reply = `That's outside what I know about Joyson — I can answer questions about his experience, projects, skills, education, achievements, or contact info. Try rephrasing or tap a quick question below.`
      setIsInvalid(true)
      setAgentResponse(reply)
      speakText(reply)
      return
    }

    setIsInvalid(false)
    setAgentResponse(match.reply)
    speakText(match.reply, () => {
      if(match.section) {
        const el = document.getElementById(match.section)
        if(el) el.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  const startVoiceInput = () => {
    if(recognitionRef.current) {
      try {
        setIsListening(true)
        setTranscript('')
        recognitionRef.current.start()
      } catch {
        setIsListening(false)
      }
    } else {
      setAgentResponse('Speech recognition is not supported in this browser. Try clicking the quick prompts below!')
    }
  }

  const toggleAgent = () => {
    const nextState = !isOpen
    setIsOpen(nextState)
    if(nextState) {
      speakText('Hello! I am Joyson\u2019s AI Voice Assistant. How can I help you today?')
    } else {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsPaused(false)
    }
  }

  return (
    <div className="ai-voice-widget">
      <button className="ai-voice-orb-btn" onClick={toggleAgent} title="AI Voice Assistant">
        <span className="ai-voice-pulse" />
        <div className="ai-voice-orb-icon">
          {isSpeaking ? (
            <div className="ai-voice-wave">
              <span /><span /><span />
            </div>
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 100 100"
              style={{ filter: 'drop-shadow(0 0 8px #e63946) drop-shadow(0 0 16px rgba(168, 222, 222, 0.6))' }}
            >
              <path d="M50 5 C28 5 12 25 12 50 C12 75 32 95 50 95 C68 95 88 75 88 50 C88 25 72 5 50 5 Z" fill="#e63946" />
              <path d="M22 45 C30 32 44 36 47 48 C41 62 28 65 22 45 Z" fill="#a8dede" stroke="#030406" strokeWidth="3.5" />
              <path d="M78 45 C70 32 56 36 53 48 C59 62 72 65 78 45 Z" fill="#a8dede" stroke="#030406" strokeWidth="3.5" />
            </svg>
          )}
        </div>
        <span className="ai-voice-orb-badge mono">AI AGENT</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-voice-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ai-voice-card-header">
              <div className="ai-voice-header-left">
                <span className="ai-voice-status-dot" />
                <span className="ai-voice-title mono">JOYSON AI VOICE AGENT</span>
              </div>
              <button className="ai-voice-close" onClick={toggleAgent}>✕</button>
            </div>

            <div className="ai-voice-card-body">
              <div className="ai-voice-visualizer-row">
                <div className={`ai-voice-visualizer ${isSpeaking && !isPaused ? 'ai-voice-visualizer--speaking' : ''}`}>
                  <span className="v-bar v1" />
                  <span className="v-bar v2" />
                  <span className="v-bar v3" />
                  <span className="v-bar v4" />
                  <span className="v-bar v5" />
                </div>

                {/* Audio Controls: Pause/Resume + Stop */}
                <div className="ai-voice-audio-controls">
                  <button
                    type="button"
                    className="ai-voice-pause-btn"
                    onClick={togglePauseSpeech}
                    disabled={!isSpeaking && !isPaused}
                    title={isPaused ? 'Resume speaking' : 'Pause speaking'}
                  >
                    {isPaused ? '▶ Resume' : '⏸ Pause'}
                  </button>
                  <button
                    type="button"
                    className="ai-voice-stop-btn"
                    onClick={stopSpeech}
                    disabled={!isSpeaking && !isPaused}
                    title="Stop speaking"
                  >
                    ⏹ Stop
                  </button>
                </div>
              </div>

              <div className={`ai-voice-response-box ${isInvalid ? 'ai-voice-response-box--invalid' : ''}`}>
                <p className="ai-voice-text">{agentResponse}</p>
                {isInvalid && (
                  <p className="ai-voice-invalid-tag mono">⚠ No matching answer found</p>
                )}
                {transcript && (
                  <p className="ai-voice-transcript mono">You asked: "{transcript}"</p>
                )}
              </div>

              <form className="ai-voice-input-row" onSubmit={handleTextSubmit}>
                <input
                  type="text"
                  className="ai-voice-text-input mono"
                  placeholder="Ask a question or type here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit" className="ai-voice-send-btn" title="Send Question">
                  Send
                </button>
                <button
                  type="button"
                  className={`ai-voice-mic-icon-btn ${isListening ? 'ai-voice-mic-icon-btn--active' : ''}`}
                  onClick={startVoiceInput}
                  title="Voice Command Input"
                >
                  {isListening ? '🎙️' : '🎤'}
                </button>
              </form>

              <div className="ai-voice-prompts">
                <span className="ai-voice-prompts-label mono">&gt; QUICK QUESTIONS:</span>
                <div className="ai-voice-chips">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      className="ai-voice-chip mono"
                      onClick={() => handleUserQuery(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}