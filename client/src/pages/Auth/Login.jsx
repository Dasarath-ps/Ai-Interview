import { useState, useEffect, useRef } from "react";
import axios from "axios";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * 4, y: dx * 4 });
    };
    const handleLeave = () => setTilt({ x: 0, y: 0 });
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${VITE_SERVER_URL}/auth/login`, {
        email,
        password,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        * { box-sizing: border-box; }

        @keyframes spinCube {
          from { transform: rotateX(12deg) rotateY(0deg); }
          to { transform: rotateX(12deg) rotateY(360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobMove1 {
          0%,100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(40px,-30px) scale(1.06); }
          70% { transform: translate(-20px,20px) scale(0.96); }
        }
        @keyframes blobMove2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(-30px,25px) scale(1.04); }
          70% { transform: translate(25px,-15px) scale(0.97); }
        }
        @keyframes btnShimmer {
          0% { left: -100%; }
          60%,100% { left: 200%; }
        }
        @keyframes successScale {
          0% { transform: scale(1); }
          35% { transform: scale(0.97); }
          65% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        @keyframes inputPing {
          0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.25); }
          100% { box-shadow: 0 0 0 6px rgba(99,102,241,0); }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg, #f0f2ff 0%, #faf0ff 50%, #f0f5ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Background gradient blobs — clean, no particles */}
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(90px)",
            pointerEvents: "none",
            width: 560,
            height: 560,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)",
            top: -140,
            left: -120,
            animation: "blobMove1 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(90px)",
            pointerEvents: "none",
            width: 440,
            height: 440,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 70%)",
            bottom: -100,
            right: -100,
            animation: "blobMove2 25s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(70px)",
            pointerEvents: "none",
            width: 280,
            height: 280,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            top: "50%",
            right: "12%",
            animation: "blobMove1 18s ease-in-out 5s infinite",
          }}
        />

        {/* Card */}
        <div
          ref={cardRef}
          style={{
            background: "#ffffff",
            borderRadius: 24,
            width: "100%",
            maxWidth: 420,
            margin: "0 16px",
            padding: "44px 40px",
            position: "relative",
            boxShadow:
              "0 0 0 1px rgba(99,102,241,0.07), 0 4px 6px -2px rgba(0,0,0,0.04), 0 20px 60px -10px rgba(99,102,241,0.14), 0 40px 80px -20px rgba(168,85,247,0.07)",
            animation: "fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
            overflow: "hidden",
            transform: `perspective(1200px) rotateX(${-tilt.x * 0.35}deg) rotateY(${tilt.y * 0.35}deg)`,
            transition: "transform 0.1s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Top gradient bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* Subtle corner glow inside card */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Brand pill */}
          <div
            style={{
              animation:
                "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #eef0ff, #f5f0ff)",
                border: "1px solid rgba(99,102,241,0.18)",
                borderRadius: 100,
                padding: "6px 14px 6px 10px",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  boxShadow: "0 0 6px rgba(99,102,241,0.7)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6366f1",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Secure Portal
              </span>
            </div>
          </div>

          {/* Heading */}
          <div
            style={{
              animation:
                "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.18s both",
              marginBottom: 32,
            }}
          >
            <h1
              style={{
                margin: "0 0 6px",
                fontSize: 26,
                fontWeight: 700,
                color: "#0f0f1a",
                letterSpacing: "-0.4px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Sign in to your account
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
              Welcome back — enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div
              style={{
                marginBottom: 16,
                animation:
                  "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.26s both",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: 7,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 16px",
                    borderRadius: 12,
                    border:
                      focused === "email"
                        ? "1.5px solid #6366f1"
                        : "1.5px solid #e5e7eb",
                    background: focused === "email" ? "#fff" : "#fafafa",
                    fontSize: 14,
                    color: "#111827",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    boxShadow:
                      focused === "email"
                        ? "0 0 0 4px rgba(99,102,241,0.1)"
                        : "none",
                    transition:
                      "border-color 0.2s, box-shadow 0.2s, background 0.2s",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 13,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: focused === "email" ? "#6366f1" : "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.2s",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div
              style={{
                marginBottom: 16,
                animation:
                  "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.33s both",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: 7,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 16px",
                    borderRadius: 12,
                    border:
                      focused === "password"
                        ? "1.5px solid #6366f1"
                        : "1.5px solid #e5e7eb",
                    background: focused === "password" ? "#fff" : "#fafafa",
                    fontSize: 14,
                    color: "#111827",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    boxShadow:
                      focused === "password"
                        ? "0 0 0 4px rgba(99,102,241,0.1)"
                        : "none",
                    transition:
                      "border-color 0.2s, box-shadow 0.2s, background 0.2s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 13,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: focused === "password" ? "#6366f1" : "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                >
                  {showPass ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
                animation:
                  "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.4s both",
              }}
            >
              <div
                onClick={() => setRemember(!remember)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: remember
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : "transparent",
                    border: remember ? "none" : "1.5px solid #d1d5db",
                    boxShadow: remember
                      ? "0 2px 8px rgba(99,102,241,0.35)"
                      : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {remember && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5 4-4"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: "#6b7280",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Keep me signed in
                </span>
              </div>
              <a
                href="#"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#6366f1",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <div
              style={{
                animation:
                  "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.46s both",
              }}
            >
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: 12,
                  border: "none",
                  background: submitted
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  letterSpacing: "0.01em",
                  boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                  transition:
                    "background 0.3s, transform 0.15s, box-shadow 0.2s",
                  animation: submitted ? "successScale 0.4s ease" : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(99,102,241,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(99,102,241,0.35)";
                }}
              >
                {submitted ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Signed in successfully
                  </span>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    Continue
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              margin: "24px 0",
              animation:
                "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.52s both",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
            <span
              style={{
                fontSize: 12,
                color: "#9ca3af",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              or continue with
            </span>
            <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
          </div>

          {/* Social buttons */}
          <div
            style={{
              display: "flex",
              gap: 10,
              animation:
                "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.56s both",
            }}
          >
            {[
              {
                name: "Google",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                ),
              },
              {
                name: "GitHub",
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#24292e"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <button
                key={s.name}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "11px 16px",
                  borderRadius: 10,
                  border: "1.5px solid #e5e7eb",
                  background: "#fff",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  transition:
                    "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.background = "#f9fafb";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {s.icon}
                {s.name}
              </button>
            ))}
          </div>

          {/* Sign up */}
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#6b7280",
              marginTop: 24,
              marginBottom: 0,
              fontFamily: "'Inter', sans-serif",
              animation:
                "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.62s both",
            }}
          >
            Don't have an account?{" "}
            <a
              href="#"
              style={{
                color: "#6366f1",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Create one free
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
