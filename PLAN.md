# PromptBox — Plan & Progress (สำหรับ AI/Developer ใช้ต่อ)

> ไฟล์นี้คือ timeline รวมของงาน เปิด session ใหม่หรือใช้ AI ตัวอื่นให้อ่านไฟล์นี้ก่อนแล้วทำต่อตรง "งานค้าง"
> เป้าหมาย: demo frontend ของ "PromptBox — Prompt Library & Builder" (ไม่มี auth/backend/DB/AI API)

## วิธีรัน / ตรวจงาน

```bash
npm test         # unit tests (vitest) — คาดผ่านทั้งหมด
npm run build    # angular production build
npm start        # dev server สำหรับดู UI เอง
```

## โครงสร้างโปรเจกต์

- Angular 22 (standalone components, signals, OnPush, @if/@for template syntax)
- Tailwind CSS v4 (ผ่าน `@tailwindcss/postcss`) — theme brand/lavender อยู่ใน `src/styles.css`
- Vitest + jsdom, Reactive Forms

| แนวคิด | ไฟล์ |
|---|---|
| โมเดลข้อมูล (Prompt/Variable/Variant/Example) | `src/app/models/prompt.model.ts` |
| ชื่อไอคอน + คอมโพเนนต์ไอคอน SVG | `src/app/models/icon-names.ts`, `src/app/components/icon.ts` |
| ข้อมูลพรอมต์ mock (8 ชิ้น) + หมวด + เรียงลำดับ | `src/app/data/prompts.data.ts` |
| Service โปรด/ใช้ล่าสุด (localStorage, safe) | `src/app/services/library.service.ts` |
| Service toast | `src/app/services/toast.service.ts` |
| แปลง/เรนเดอร์ template `{{token}}` | `src/app/utils/prompt-template.ts` |
| Header, Library, Card, Builder, Toast | `src/app/components/*.{ts,html}` |
| เชื่อมรวมทุกอย่าง | `src/app/app.{ts,html}` |
| สไตล์ + ธีม + animation + reduced-motion | `src/styles.css` |

## สถานะงาน

### ทำเสร็จแล้ว ✅

- [x] Refactor โค้ดเดิมจาก app.html monolith เป็น standalone components (commit `bb70ab8`)
- [x] Header sticky: logo PromptBox, เมนูไทย (คลังพรอมต์/รายการโปรด/พรอมต์ของฉัน), ปุ่ม "สร้างพรอมต์", เมนูมือถือ
  - "พรอมต์ของฉัน" + "สร้างพรอมต์" แสดง toast แจ้งว่าเดโมยังไม่รองรับ
- [x] Intro section: eyebrow "คลังพรอมต์", heading, ประโยคสนับสนุน, search field + ปุ่มล้าง
- [x] Category filters 7 หมวด (ทั้งหมด … วิเคราะห์ข้อมูล) เป็น pill เลื่อนแนวนอนได้บนมือถือ
- [x] Grid การ์ด responsive 3/2/1 คอลัมน์ + stagger animation + hover lift
- [x] การ์ด: chip หมวด + ชื่อ + คำอธิบาย + แท็ก + ปุ่มโปรด (persist localStorage) + "ลองใช้พรอมต์"
- [x] ค้นหา (ชื่อ/คำอธิบาย/หมวด/แท็ก) + filter หมวด ทำงานร่วมกัน + sort (แนะนำ/ชื่อ ก–ฮ/ใช้ล่าสุด)
- [x] "รายการโปรด" แสดงเฉพาะที่โปรด + badge จำนวน + empty state มีปุ่มล้างฟิลเตอร์
- [x] Builder panel: slide-in จากขวาบน desktop, เต็มจอบน mobile; header (ชื่อ/คำอธิบาย/หมวด/แท็ก/ปุ่มปิด)
- [x] Reactive Form สร้าง field จาก variable definitions (text/textarea/select) มี label/placeholder/helper/required(defaults ตั้งไว้แล้ว)
- [x] Variants (พื้นฐาน/มืออาชีพ/สร้างสรรค์/กระชับ) — เปลี่ยน template พรอมต์ ค่า field คงอยู่
- [x] Live preview "พรอมต์ของคุณ" — token `{{x}}` คัลเลอร์แยก filled/ไม่กรอก (amber) + นับจำนวนช่องที่ยังไม่กรอก
- [x] Copy: `navigator.clipboard` + fallback `execCommand` → toast สำเร็จ "คัดลอกแล้ว" / error บอกให้ copy เอง
- [x] ตัวอย่างการใช้งาน (collapse/expand, ใส่ค่าในฟอร์ม, แสดงพรอมต์ตามตัวอย่าง)
- [x] Animation: fade-up, การ์ด stagger, drawer in/out, pop บนโปรด, toast, `prefers-reduced-motion` ปิดหมด
- [x] Focus styles (outline purple), aria-label ครบ icon buttons, Escape ปิด builder, body scroll lock
- [x] Unit tests (25 ผ่าน): library-page, prompt-builder, prompt-card, library.service, prompt-template

### งานที่เพิ่งทำ session นี้ ✅

- [x] แก้คำภาษาไทยเพี้ยนใน `prompts.data.ts` (เช่น ประสาสนกายะ → ประสานงาน, ประสาทอซัพพลายเออร์ → ประสานซัพพลายเออร์, ต้องรื้นื้นเติม → ต้องเติมข้อมูลเพิ่มเติม, แชร์ตัวเร่ง → แชร์ทำสรุป, เปลเป้า → เป้า, ไหวเชื่อถือ → อย่างเชื่อถือได้)
- [x] เพิ่ม focus trap ใน builder dialog (Tab/Shift+Tab คุม focus ภายใน panel)
- [x] แก้ heading ภาษาไทยใน library → "หาพรอมต์ที่ใช่สำหรับงานของคุณ"
- [x] **แก้ Tailwind v4 layer bug สำคัญ**: ย้ายคลาสที่แชร์ (btn-*, nav-link, input-base, filter-pill, variant-tab ฯลฯ) ใน `src/styles.css` เข้า `@layer components` — เดิม CSS นอก layer ชนะ utilities ทำให้ `md:hidden` ไม่ทำงาน (hamburger โชว์ตอน desktop) และ utility overrides (py-3.5, w-full) ถูกกลืน
- [x] สร้างไฟล์ PLAN.md

### ผลตรวจจริงด้วย headless browser (ผ่านทั้งหมด, console errors = 0) ✅

- [x] Desktop 1440px: การ์ด 8 ใบ, ค้นหา → empty state → ล้างฟิลเตอร์ OK, โปรด toggle + persist หลัง reload + badge, หน้า favorites + empty state, เปิด builder, preview อัปเดตทันที, variant 4 อันคงค่าที่กรอก, คัดลอกจริงเข้า clipboard + "คัดลอกแล้ว", Escape ปิด, ไม่มี horizontal overflow
- [x] Mobile 375px: ไม่มี horizontal overflow, เมนูมือถือ OK, builder เต็มจอ, screenshot ตรวจแล้วดูเรียบร้อย

### งานค้าง / ต้องตรวจถัดไป ⏳

- [x] Commit งานรอบนี้ (`071093e`) + push
- [ ] (Optional) เพิ่ม mock prompts เพิ่มจาก 8 ชิ้น หรือเพิ่มตัวอย่างใช้งานต่อพรอมต์
- [ ] (Optional) เชื่อม sort "ใช้ล่าสุด" กับข้อมูลเริ่มต้นจาก data (ตอนนี้ต้องเปิด builder ก่อนจึงเรียงต่างจากเดิม)

## ข้อจำกัดเดโมที่ควรรู้

- ทุกข้อมูลเป็น mock ใน `src/app/data/prompts.data.ts` — ไม่มี backend
- "พรอมต์ของฉัน"/"สร้างพรอมต์" เจตนาให้ toast บอกว่ายังไม่พร้อม (ไม่มีการบันทึกจริง)
- โปรด/last-used เก็บใน localStorage keys `promptbox.favorites`, `promptbox.last-used` — error-safe ถ้า localStorage ไม่ได้
