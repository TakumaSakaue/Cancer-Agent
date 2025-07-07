import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Routes>
      <Route path="/" element={
        isLoggedIn ? <ImportScreen /> : <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      } />
      <Route path="/dashboard" element={isLoggedIn ? <DashboardScreen /> : <Navigate to="/" />} />
      <Route path="/agent-comm" element={isLoggedIn ? <AgentCommScreen /> : <Navigate to="/" />} />
    </Routes>
  )
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      onLogin()
    }, 800)
  }
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])
  return (
    <div className="import-bg-root">
      <video ref={videoRef} className="import-bg-video" src="/Back.mp4" autoPlay loop muted playsInline />
      <div className="app import-glass-app">
        <motion.form
          className="container import-glass-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          onSubmit={handleSubmit}
          style={{paddingTop:'2.5rem', paddingBottom:'2.5rem', minWidth:380, minHeight:420, maxWidth:'95vw', maxHeight:'95vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}
        >
          <h1 className="title" style={{marginBottom:'1.5rem'}}>CANCER AGENT</h1>
          <div className="login-fields" style={{width:'100%', display:'flex', flexDirection:'column', gap:'1.5rem', marginBottom:'2.2rem'}}>
            <input className="login-input import-login-input center-input" type="text" placeholder="ユーザー名" autoFocus required />
            <input className="login-input import-login-input center-input" type="password" placeholder="パスワード" required />
          </div>
          <motion.button
            className="start-button"
            type="submit"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
            style={{marginTop:'0.5rem', width:'100%'}}
          >
            {loading ? 'Login...' : 'Login'}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

function WelcomeScreen() {
  return (
    <div className="app" style={{justifyContent:'center',alignItems:'center',minHeight:'100vh',background:'linear-gradient(135deg, #fff 0%, #f7fafd 100%)',position:'relative',zIndex:2000}}>
      <WelcomeEffectText text="Welcome to CANCER AGENT" />
    </div>
  )
}

function WelcomeEffectText({ text }: { text: string }) {
  // 1文字ずつフェードイン＋グラデーション＋拡大縮小エフェクト
  return (
    <h1 className="welcome-effect-title">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="welcome-fade-span"
          style={{
            animationName: 'welcome-fade',
            animationDuration: '0.7s',
            animationDelay: `${i * 0.02}s`,
            animationFillMode: 'forwards',
            animationTimingFunction: 'cubic-bezier(.4,2,.3,1)',
            display: 'inline-block',
          }}
        >{char === ' ' ? <>&nbsp;</> : char}</span>
      ))}
    </h1>
  )
}

function ImportScreen() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleStart = () => {
    if (selectedFile) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="import-bg-root">
      <video ref={videoRef} className="import-bg-video" src="/Back.mp4" autoPlay loop muted playsInline />
      <div className="app import-glass-app">
        <motion.div
          className="container import-glass-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* タイトル */}
          <motion.h1
            className="title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Cancer Agent
          </motion.h1>

          {/* ファイルアップロードエリア */}
          <motion.div
            className={`upload-area ${isDragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleUploadClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="upload-content">
              <motion.div
                className="upload-icon"
                animate={{ rotate: isDragOver ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 16L12 8M12 8L15 11M12 8L9 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 15V16C3 18.8284 3 20.2426 3.87868 21.1213C4.75736 22 6.17157 22 9 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              {selectedFile ? (
                <motion.div
                  className="file-info"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="file-name">{selectedFile.name}</p>
                  <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </motion.div>
              ) : (
                <div className="upload-text">
                  <p className="upload-main-text">
                    {isDragOver ? 'ファイルをドロップしてください' : 'ファイルを選択またはドラッグ&ドロップ'}
                  </p>
                  <p className="upload-sub-text">
                    サポート形式: JPG, PNG, DICOM, PDF
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* 隠しファイル入力 */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.dicom,.dcm,.pdf"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />

          {/* Startボタン */}
          <motion.button
            className="start-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleStart}
            disabled={!selectedFile}
          >
            Start
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

function DashboardScreen() {
  // 進行ゲージのアニメーション用
  const [progress, setProgress] = useState([0, 0, 0, 0])
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])
  useEffect(() => {
    const target = [100, 100, 100, 100]
    let frame: number
    let current = [0, 0, 0, 0]
    function animate() {
      let updated = false
      current = current.map((v, i) => {
        if (v < target[i]) {
          updated = true
          // さらに5倍遅く（0.004）
          return Math.min(v + Math.ceil((target[i] - v) * 0.004) + 1, target[i])
        }
        return v
      })
      setProgress([...current])
      if (updated) frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="dashboard-bg-root">
      <video ref={videoRef} className="import-bg-video" src="/Back.mp4" autoPlay loop muted playsInline />
      <div className="dashboard-root">
        <Sidebar progress={progress} />
        <MainPanel />
      </div>
    </div>
  )
}

function Sidebar({ progress }: { progress: number[] }) {
  const agentList = [
    { name: 'CANCER BRIDGE', color: 'pink', core: true },
    { name: '治療法エージェント', color: 'blue' },
    { name: '新薬開発エージェント', color: 'green' },
    { name: '論文分析エージェント', color: 'yellow' }
  ]
  const navigate = useNavigate()
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="ai-logo">🧬</span>
        <span className="ai-title" style={{cursor:'pointer'}} onClick={()=>navigate('/')}>Cancer Agent</span>
        <span className="ai-desc">複数のAIエージェントが同時に処理を実行します</span>
      </div>
      <div className="agent-list">
        {agentList.map((agent, i) => (
          <div key={agent.name} className={`agent-card ${agent.color} ${agent.core ? 'core' : ''}`}>
            <div className="agent-title-row">
              <span className="agent-title">{agent.name}</span>
              {agent.core && <span className="core-badge">コア機能</span>}
            </div>
            <div className="progress-bar-bg">
              <motion.div
                className="progress-bar hi-tech-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progress[i]}%` }}
                transition={{ duration: 12, delay: 0.2 * i, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: `var(--${agent.color}-gradient)` }}
              >
                <span className="bar-glow"></span>
                <span className="bar-wave"></span>
              </motion.div>
            </div>
            <div className="progress-label">タスク進行中 {progress[i]}%</div>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div>システムステータス: <span className="status-dot active"></span>アクティブ</div>
        <div>処理中タスク: 3</div>
      </div>
    </aside>
  )
}

function MainPanel() {
  // 画像の右側の治療レコメンデーション画面を再現
  return (
    <main className="main-panel" style={{display:'flex', flexDirection:'column', height:'100vh'}}>
      <div className="main-header">
        <h2><span role="img" aria-label="dashboard">📊</span> ダッシュボード</h2>
        <div className="main-header-actions">
          <button className="agent-comm-aurora-btn">エージェント連携</button>
        </div>
      </div>
      <div className="recommendation-block" style={{flex:1, display:'flex', flexDirection:'column', minHeight:0, overflowY:'auto'}}>
        <div className="recommendation-header-area">
          <h3 className="recommendation-title">治療法レコメンデーション</h3>
          <div className="patient-info-area">
            <div className="patient-id">患者ID: PT-20240615-001</div>
            <div className="patient-diagnosis">診断名: 非小細胞肺がん（NSCLC）Stage IIIB</div>
          </div>
        </div>
        <div className="recommendation-text">
{`
遺伝子プロファイリングの結果、EGFR変異陽性（エクソン19欠失）が確認されました。また、PD-L1発現率は60%です。最新の臨床試験データと患者の臨床情報に基づき、以下の治療法を推奨します：

1. 第一選択薬: オシメルチニブ 80mg 1日1回 経口投与
・投与期間: 病勢進行または許容できない毒性が発現するまで継続
・投与スケジュール: 28日を1サイクルとし、継続投与
・治療効果判定は8週間ごとにCTスキャンを実施し、腫瘍縮小率を評価
・副作用発現時は速やかに減量または休薬を検討

2. モニタリングプラン:
・2週間ごとの血液検査（CBC、肝機能、腎機能、電解質、腫瘍マーカー）
・8週間ごとのCTスキャン（胸部、腹部、骨盤、リンパ節）
・12週間ごとの脳MRI、PET-CTによる全身評価
・治療開始後1ヶ月目と3ヶ月目に心電図検査、心機能評価
・必要に応じて呼吸機能検査、骨密度測定も追加

3. 副作用管理:
・皮膚障害/発疹: グレード1-2の場合、ステロイド外用薬（0.1%ヒドロコルチゾン）を1日2回塗布し、保湿剤併用
・下痢: グレード1-2の場合、ロペラミド 2mg を必要に応じて（最大8mg/日）、水分補給を徹底
・間質性肺疾患の兆候（咳、呼吸困難、発熱）が見られた場合は直ちに治療を中断し、評価を行う
・重篤な副作用（グレード3以上）が発現した場合は、専門医と連携し治療方針を再検討

4. 追加治療・臨床試験:
・標準治療に加え、PD-1/PD-L1阻害薬の併用や新規分子標的薬の臨床試験参加も検討
・患者の希望や全身状態に応じて、緩和ケアチームと連携しQOL向上を図る
・最新の国際ガイドラインや多施設共同研究の結果も随時参照し、最適な治療戦略を提案

5. フォローアップ・教育:
・治療経過中は定期的に患者教育を実施し、副作用や生活指導、服薬アドヒアランスをサポート
・家族や多職種チームと連携し、心理的・社会的支援も強化
・治療終了後も長期的な経過観察を行い、再発・転移の早期発見に努める
`}
        </div>
      </div>
    </main>
  )
}

function AgentCommScreen() {
  // 通信ログのサンプルデータ
  const flows = [
    { from: '治療法エージェント', to: '新薬開発エージェント', msg: 'データ分析結果を共有' },
    { from: '論文分析エージェント', to: '治療法エージェント', msg: '治療法の提案を送信' },
    { from: '治療法エージェント', to: '論文分析エージェント', msg: '新薬情報を更新' },
  ]
  const [activeIdx, setActiveIdx] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(idx => (idx + 1) % flows.length)
    }, 1800)
    return () => clearInterval(timer)
  }, [flows.length])

  return (
    <div className="app" style={{background:'linear-gradient(135deg, #fff 0%, #f7fafd 100%)'}}>
      <div className="agent-comm-glass-card">
        <div className="agent-comm-header">
          <span className="agent-comm-title">エージェント間通信</span>
        </div>
        <div className="agent-comm-list">
          {flows.map((f, i) => (
            <div key={i} className={`agent-comm-row${i === activeIdx ? ' active' : ''}`}>
              <span className="agent-comm-from">{f.from}</span>
              <span className="agent-comm-arrow">→</span>
              <span className="agent-comm-to">{f.to}</span>
              <span className="agent-comm-msg">：{f.msg}</span>
              {i === activeIdx && <span className="agent-comm-dot"></span>}
            </div>
          ))}
        </div>
        <div className="agent-comm-section">
          <div className="agent-comm-subtitle">タスク詳細</div>
          <div className="agent-comm-task">臨床試験データ収集</div>
          <button className="agent-comm-btn">
            <span className="agent-comm-btn-icon">&#8767;</span> 有効性評価
          </button>
        </div>
      </div>
    </div>
  )
}

export default App 