"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoongchiContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen py-20 px-6" style={{ backgroundColor: "var(--lc-bg)" }}>
      <div className="mx-auto max-w-5xl">
        <h1
          className="mb-2 text-4xl font-light"
          style={{ color: "var(--lc-text)" }}
        >
          聯絡我們
        </h1>
        <p className="mb-16 text-sm" style={{ color: "var(--lc-muted)" }}>
          歡迎預約設計諮詢或詢問產品資訊
        </p>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Form */}
          <div>
            {submitted ? (
              <div
                className="rounded-none border p-8 text-center"
                style={{ borderColor: "var(--lc-border)", backgroundColor: "var(--lc-surface)" }}
              >
                <p
                  className="mb-2 text-lg font-medium"
                  style={{ color: "var(--lc-accent)" }}
                >
                  感謝您的來訊！
                </p>
                <p className="text-sm" style={{ color: "var(--lc-muted)" }}>
                  我們將於 1 個工作日內與您聯繫。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name" style={{ color: "var(--lc-text)" }}>
                    姓名 *
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="王小明"
                    className="rounded-none border-0 border-b focus-visible:ring-0"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "var(--lc-border)",
                      color: "var(--lc-text)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" style={{ color: "var(--lc-text)" }}>
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="example@email.com"
                    className="rounded-none border-0 border-b focus-visible:ring-0"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "var(--lc-border)",
                      color: "var(--lc-text)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" style={{ color: "var(--lc-text)" }}>
                    聯絡電話
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0912-345-678"
                    className="rounded-none border-0 border-b focus-visible:ring-0"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "var(--lc-border)",
                      color: "var(--lc-text)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" style={{ color: "var(--lc-text)" }}>
                    訊息內容 *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="請描述您的需求（空間大小、風格偏好、預算等）"
                    className="rounded-none border focus-visible:ring-0 resize-none"
                    style={{
                      backgroundColor: "var(--lc-surface)",
                      borderColor: "var(--lc-border)",
                      color: "var(--lc-text)",
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-none py-5 text-sm tracking-widest"
                  style={{
                    backgroundColor: "var(--lc-accent)",
                    color: "#fff",
                  }}
                >
                  送出訊息
                </Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <h2
                className="mb-4 text-sm font-medium uppercase tracking-[0.2em]"
                style={{ color: "var(--lc-accent)" }}
              >
                展示中心
              </h2>
              <ul className="space-y-2 text-sm" style={{ color: "var(--lc-muted)" }}>
                <li>台北市中山區建國北路一段 88 號</li>
                <li>Tel: (02) 2555-8888</li>
                <li>Fax: (02) 2555-8889</li>
                <li>service@loongchi.example.com</li>
              </ul>
            </div>
            <div>
              <h2
                className="mb-4 text-sm font-medium uppercase tracking-[0.2em]"
                style={{ color: "var(--lc-accent)" }}
              >
                營業時間
              </h2>
              <ul className="space-y-1 text-sm" style={{ color: "var(--lc-muted)" }}>
                <li>週一至週五　09:00 – 18:00</li>
                <li>週六　　　　10:00 – 17:00</li>
                <li>週日及國定假日　休館</li>
              </ul>
            </div>

            {/* Map placeholder */}
            <div
              className="flex aspect-video items-center justify-center"
              style={{
                backgroundColor: "var(--lc-surface)",
                border: "1px solid var(--lc-border)",
              }}
            >
              <p className="text-sm" style={{ color: "var(--lc-muted)" }}>
                地圖預留位置
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
