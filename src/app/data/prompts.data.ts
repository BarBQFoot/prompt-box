import {
  CategoryDef,
  Prompt,
  SortOption,
} from '../models/prompt.model';

export const CATEGORIES: CategoryDef[] = [
  { id: 'all', label: 'ทั้งหมด', icon: 'sparkle' },
  { id: 'writing', label: 'การเขียน', icon: 'pencil' },
  { id: 'coding', label: 'เขียนโค้ด', icon: 'code' },
  { id: 'learning', label: 'การเรียนรู้', icon: 'school' },
  { id: 'business', label: 'ธุรกิจ', icon: 'briefcase' },
  { id: 'marketing', label: 'การตลาด', icon: 'megaphone' },
  { id: 'data', label: 'วิเคราะห์ข้อมูล', icon: 'chart' },
];

export const SORT_OPTIONS: SortOption[] = [
  { key: 'recommended', label: 'แนะนำ' },
  { key: 'name', label: 'ชื่อ ก–ฮ' },
  { key: 'recent', label: 'ใช้ล่าสุด' },
];

export const PROMPTS: Prompt[] = [
  {
    id: 'p-email',
    slug: 'email-writer',
    title: 'ผู้ช่วยเขียนอีเมล',
    description: 'เขียนอีเมลสุภาพ ตรงประเด็น กำหนดโทนและความยาวได้ตามต้องการ',
    category: 'writing',
    tags: ['อีเมล', 'การสื่อสาร', 'งานสำนักงาน'],
    template:
      'ช่วยเขียนอีเมลถึง {{recipient}} เกี่ยวกับ {{topic}}\nใช้โทน {{tone}} ภาษา {{language}} ความยาว {{length}}',
    variables: [
      {
        key: 'recipient',
        label: 'ชื่อผู้รับ',
        type: 'text',
        placeholder: 'เช่น คุณอรวี หรือ ทีมการตลาด',
        required: true,
        defaultValue: 'คุณสมชาย',
      },
      {
        key: 'topic',
        label: 'เรื่องที่ต้องการสื่อสาร',
        type: 'text',
        placeholder: 'เช่น ขอเลื่อนการประชุมรีวิวงาน',
        required: true,
        defaultValue: 'ขอเลื่อนการประชุมสัปดาห์หน้า',
      },
      {
        key: 'tone',
        label: 'โทนการเขียน',
        type: 'select',
        options: ['สุภาพและเป็นทางการ', 'เป็นมืออาชีพ', 'เป็นกันเอง', 'เร่งด่วน'],
        defaultValue: 'สุภาพและเป็นทางการ',
      },
      {
        key: 'language',
        label: 'ภาษา',
        type: 'select',
        options: ['ภาษาไทย', 'ภาษาอังกฤษ', 'สองภาษา'],
        defaultValue: 'ภาษาไทย',
      },
      {
        key: 'length',
        label: 'ความยาว',
        type: 'select',
        options: ['สั้นกระชับ', 'ปานกลาง', 'ละเอียด'],
        defaultValue: 'ปานกลาง',
      },
    ],
    variants: [
      {
        id: 'basic',
        label: 'พื้นฐาน',
        template:
          'ช่วยเขียนอีเมลถึง {{recipient}} เกี่ยวกับ {{topic}}\nใช้โทน {{tone}} ภาษา {{language}} ความยาว {{length}}',
      },
      {
        id: 'professional',
        label: 'มืออาชีพ',
        template:
          'ช่วยเขียนอีเมลถึง {{recipient}} เกี่ยวกับ {{topic}}\nใช้โทน {{tone}} ภาษา {{language}} ความยาว {{length}}\nเริ่มด้วยหัวเรื่อง (Subject) ที่ชัดเจน สรุปประเด็นเป็นโครงสร้างที่อ่านง่าย และปิดท้ายด้วยสิ่งที่ผู้รับควรทำต่อไปอย่างชัดเจน',
      },
      {
        id: 'creative',
        label: 'สร้างสรรค์',
        template:
          'ช่วยเขียนอีเมลถึง {{recipient}} เกี่ยวกับ {{topic}}\nใช้โทน {{tone}} ภาษา {{language}} เปิดด้วยประโยคที่ดึงความสนใจ มีบุคลิกเป็นมิตร แต่ยังสุภาพและเหมาะกับการทำงาน',
      },
      {
        id: 'concise',
        label: 'กระชับ',
        template:
          'ช่วยเขียนอีเมลถึง {{recipient}} เกี่ยวกับ {{topic}}\nภาษา {{language}} เขียนให้กระชับและตรงประเด็นที่สุด ไม่เกิน 80 คำ',
      },
    ],
    examples: [
      {
        title: 'ขอเลื่อนการประชุมกับหัวหน้า',
        useCase: 'ใช้เมื่อต้องขอเลื่อนนัดอย่างสุภาพโดยไม่เสียมารยาท',
        inputs: {
          recipient: 'คุณพิมพ์ชนก (หัวหน้าทีม)',
          topic: 'ขอเลื่อนการประชุมรีวิวงานจากวันศุกร์ไปเป็นวันจันทร์',
          tone: 'สุภาพและเป็นทางการ',
          language: 'ภาษาไทย',
          length: 'สั้นกระชับ',
        },
      },
    ],
  },
  {
    id: 'p-summary',
    slug: 'article-summarizer',
    title: 'สรุปบทความ',
    description: 'ย่อบทความยาวเป็นประเด็นสำคัญ อ่านจบในหนึ่งนาที',
    category: 'learning',
    tags: ['สรุปเนื้อหา', 'บทความ', 'ประหยัดเวลา'],
    template:
      'ช่วยสรุปเนื้อหาจากบทความเรื่อง {{subject}}\nสรุปเป็น {{points}} ประเด็นสำคัญ สำหรับ{{audience}} อ่านง่าย เข้าใจได้ภายใน 1 นาที',
    variables: [
      {
        key: 'subject',
        label: 'ชื่อบทความหรือหัวข้อ',
        type: 'text',
        placeholder: 'เช่น แนวโน้ม AI ในปี 2569',
        required: true,
        defaultValue: 'แนวโน้มการใช้ AI ในที่ทำงาน',
      },
      {
        key: 'points',
        label: 'จำนวนประเด็นหลัก',
        type: 'select',
        options: ['3', '5', '7'],
        defaultValue: '5',
      },
      {
        key: 'audience',
        label: 'ผู้อ่าน',
        type: 'select',
        options: ['ผู้อ่านทั่วไป', 'นักศึกษา', 'มืออาชีพ'],
        defaultValue: 'ผู้อ่านทั่วไป',
        helper: 'ระดับภาษาและรายละเอียดจะปรับตามกลุ่มผู้อ่าน',
      },
    ],
    variants: [
      {
        id: 'basic',
        label: 'พื้นฐาน',
        template:
          'ช่วยสรุปเนื้อหาจากบทความเรื่อง {{subject}}\nสรุปเป็น {{points}} ประเด็นสำคัญ สำหรับ{{audience}} อ่านง่าย เข้าใจได้ภายใน 1 นาที',
      },
      {
        id: 'professional',
        label: 'มืออาชีพ',
        template:
          'ช่วยสรุปเนื้อหาจากบทความเรื่อง {{subject}}\nสรุปเป็น {{points}} ประเด็นสำคัญ สำหรับ{{audience}} พร้อมแนบ "สิ่งที่นำไปใช้ต่อได้ทันที" 1 ข้อจากเนื้อหา',
      },
      {
        id: 'concise',
        label: 'กระชับ',
        template:
          'สรุปบทความเรื่อง {{subject}} สำหรับ{{audience}} ให้เหลือ 3 บรรทัดเสมอ โดยเก็บเฉพาะประเด็นสำคัญที่สุด',
      },
    ],
    examples: [
      {
        title: 'สรุปบทความเทคโนโลยีก่อนประชุมทีม',
        useCase: 'แชร์ประเด็นสำคัญให้ทีมได้อ่านเร็ว ๆ ก่อนประชุมสัปดาห์นี้',
        inputs: {
          subject: 'รายงานแนวโน้ม AI ในองค์กร ประจำไตรมาสนี้',
          points: '3',
          audience: 'มืออาชีพ',
        },
      },
    ],
  },
  {
    id: 'p-code-explain',
    slug: 'code-explainer',
    title: 'อธิบายโค้ด',
    description: 'อธิบายโค้ดที่ไม่คุ้นเคยให้เข้าใจตามระดับของผู้อ่าน พร้อมชี้จุดที่ปรับปรุงได้',
    category: 'coding',
    tags: ['โค้ด', 'อธิบาย', 'ทีมพัฒนา'],
    template:
      'โค้ดที่ต้องการอธิบาย:\n```\n{{code}}\n```\nช่วยอธิบายโค้ดนี้สำหรับ{{level}} เน้นเรื่อง{{goal}}',
    variables: [
      {
        key: 'code',
        label: 'โค้ดที่ต้องการอธิบาย',
        type: 'textarea',
        placeholder: 'วางโค้ดของคุณที่นี่ (ไม่จำเป็นต้องเกิน 100 บรรทัด)',
        required: true,
        defaultValue: 'const debounce = (fn, delay = 300) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};',
        helper: 'โค้ดจะถูกแนบในพรอมต์โดยตรง อย่าวางข้อมูลลับของบริษัท',
      },
      {
        key: 'level',
        label: 'ระดับผู้อ่าน',
        type: 'select',
        options: ['ผู้เริ่มต้น', 'ระดับกลาง', 'ผู้เชี่ยวชาญ'],
        defaultValue: 'ผู้เริ่มต้น',
      },
      {
        key: 'goal',
        label: 'เป้าหมายที่ต้องการเน้น',
        type: 'text',
        placeholder: 'เช่น เข้าใจการทำงานทีละขั้น หรือหาจุดผิดพลาด',
        defaultValue: 'เข้าใจการทำงานทีละขั้น',
      },
    ],
    variants: [
      {
        id: 'basic',
        label: 'พื้นฐาน',
        template:
          'โค้ดที่ต้องการอธิบาย:\n```\n{{code}}\n```\nช่วยอธิบายโค้ดนี้สำหรับ{{level}} เน้นเรื่อง{{goal}}',
      },
      {
        id: 'professional',
        label: 'มืออาชีพ',
        template:
          'โค้ดที่ต้องการอธิบาย:\n```\n{{code}}\n```\nช่วยอธิบายสำหรับ{{level}} เน้นเรื่อง{{goal}} พร้อมชี้จุดที่ปรับปรุงได้ (edge case, การตั้งชื่อ, ประสิทธิภาพ) และแนะนำแนวทาง refactor อย่างสั้น ๆ',
      },
      {
        id: 'concise',
        label: 'กระชับ',
        template:
          'โค้ด:\n```\n{{code}}\n```\nสรุปการทำงานของโค้ดนี้สำหรับ{{level}} ด้วยหัวข้อย่อยไม่เกิน 5 ข้อ',
      },
    ],
    examples: [
      {
        title: 'เอาโค้ดคนเก่ามาอ่านให้ทีมใหม่',
        useCase: 'ช่วยสมาชิกใหม่ของทีมเข้าใจฟังก์ชันที่คนอื่นเคยเขียนไว้',
        inputs: {
          code: 'const debounce = (fn, delay = 300) => { … };',
          level: 'ผู้เริ่มต้น',
          goal: 'เข้าใจการทำงานทีละขั้น',
        },
      },
    ],
  },
  {
    id: 'p-study-plan',
    slug: 'study-planner',
    title: 'วางแผนการเรียน',
    description: 'จัดแผนเรียนทักษะใหม่เป็นรายสัปดาห์ พร้อมเป้าหมายย่อย',
    category: 'learning',
    tags: ['พัฒนาตนเอง', 'แผนการเรียน', 'ตารางเวลา'],
    template:
      'ช่วยวางแผนการเรียน {{subject}} เพื่อให้บรรลุเป้าหมาย {{goal}}\nระยะเวลา {{weeks}} เวลาเรียน {{hours}}\nจัดทำเป็นแผนรายสัปดาห์ พร้อมเป้าหมายย่อยและแหล่งเรียนรู้ที่แนะนำ',
    variables: [
      {
        key: 'subject',
        label: 'วิชาหรือทักษะที่อยากเรียน',
        type: 'text',
        placeholder: 'เช่น SQL สำหรับวิเคราะห์ข้อมูล',
        required: true,
        defaultValue: 'SQL สำหรับวิเคราะห์ข้อมูล',
      },
      {
        key: 'goal',
        label: 'เป้าหมายที่ต้องการบรรลุ',
        type: 'text',
        placeholder: 'เช่น วิเคราะห์ยอดขายได้ด้วยตัวเอง',
        required: true,
        defaultValue: 'เขียนคิวรีวิเคราะห์ยอดขายด้วยตัวเองได้',
      },
      {
        key: 'weeks',
        label: 'ระยะเวลา',
        type: 'select',
        options: ['2 สัปดาห์', '4 สัปดาห์', '8 สัปดาห์'],
        defaultValue: '4 สัปดาห์',
      },
      {
        key: 'hours',
        label: 'เวลาเรียนต่อสัปดาห์',
        type: 'select',
        options: ['3 ชั่วโมงต่อสัปดาห์', '5 ชั่วโมงต่อสัปดาห์', '10 ชั่วโมงต่อสัปดาห์'],
        defaultValue: '5 ชั่วโมงต่อสัปดาห์',
      },
    ],
    variants: [
      {
        id: 'basic',
        label: 'พื้นฐาน',
        template:
          'ช่วยวางแผนการเรียน {{subject}} เพื่อให้บรรลุเป้าหมาย {{goal}}\nระยะเวลา {{weeks}} เวลาเรียน {{hours}}\nจัดทำเป็นแผนรายสัปดาห์ พร้อมเป้าหมายย่อยและแหล่งเรียนรู้ที่แนะนำ',
      },
      {
        id: 'professional',
        label: 'มืออาชีพ',
        template:
          'ช่วยวางแผนการเรียน {{subject}} เพื่อให้บรรลุเป้าหมาย {{goal}}\nระยะเวลา {{weeks}} เวลาเรียน {{hours}}\nออกแบบให้ท้ายแผนมีโปรเจกต์จริง 1 ชิ้นเป็นผลงาน พร้อมเกณฑ์ตรวจความคืบหน้ารายสัปดาห์ที่วัดได้',
      },
      {
        id: 'concise',
        label: 'กระชับ',
        template:
          'วางแผนเรียน {{subject}} เพื่อ {{goal}} ภายใน {{weeks}} (เวลา {{hours}}) สรุปแผนให้เหลือ 5 บรรทัดที่เอาไปวางในปฏิทินได้เลย',
      },
    ],
    examples: [
      {
        title: 'อัปสกิล SQL ใน 4 สัปดาห์',
        useCase: 'ใช้เมื่อมีเวลาหลังเลิกงานจำกัด แต่อยากได้แผนที่ทำได้จริง',
        inputs: {
          subject: 'SQL เบื้องต้นสำหรับคนทำการตลาด',
          goal: 'ดึงข้อมูลลูกค้าจากฐานข้อมูลได้เอง',
          weeks: '4 สัปดาห์',
          hours: '3 ชั่วโมงต่อสัปดาห์',
        },
      },
    ],
  },
  {
    id: 'p-social-ideas',
    slug: 'social-post-ideas',
    title: 'คิดไอเดียโพสต์โซเชียล',
    description: 'ได้ลิสต์ไอเดียโพสต์พร้อม hook เปิดโพสต์ ต่อยอดได้ทันที',
    category: 'marketing',
    tags: ['โซเชียลมีเดีย', 'ไอเดีย', 'คอนเทนต์'],
    template:
      'ช่วยคิดไอเดียโพสต์{{platform}} เกี่ยวกับ {{topic}}\nจำนวน {{count}} เรียงเป็นลิสต์ พร้อม hook เปิดโพสต์ 1 ประโยคต่อไอเดีย',
    variables: [
      {
        key: 'topic',
        label: 'หัวข้อหรือธุรกิจ',
        type: 'text',
        placeholder: 'เช่น คาเฟ่กาแฟคั่วเองแห่งใหม่',
        required: true,
        defaultValue: 'คาเฟ่กาแฟคั่วเองแห่งใหม่ย่านอารีย์',
      },
      {
        key: 'platform',
        label: 'แพลตฟอร์ม',
        type: 'select',
        options: ['Instagram', 'TikTok', 'Facebook', 'LinkedIn'],
        defaultValue: 'Instagram',
      },
      {
        key: 'count',
        label: 'จำนวนไอเดีย',
        type: 'select',
        options: ['5', '10'],
        defaultValue: '5',
      },
    ],
    variants: [
      {
        id: 'basic',
        label: 'พื้นฐาน',
        template:
          'ช่วยคิดไอเดียโพสต์{{platform}} เกี่ยวกับ {{topic}}\nจำนวน {{count}} เรียงเป็นลิสต์ พร้อม hook เปิดโพสต์ 1 ประโยคต่อไอเดีย',
      },
      {
        id: 'creative',
        label: 'สร้างสรรค์',
        template:
          'ช่วยคิดไอเดียโพสต์{{platform}} เกี่ยวกับ {{topic}} จำนวน {{count}}\nโทนเล่นคำ ใช้เทรนด์ล่าสุด และเสนอภาพหรือเสียงประกอบที่ควรใช้สำหรับแต่ละไอเดีย',
      },
      {
        id: 'professional',
        label: 'มืออาชีพ',
        template:
          'ช่วยคิดไอเดียโพสต์{{platform}} เกี่ยวกับ {{topic}} จำนวน {{count}}\nแต่ละไอเดียระบุ hook, CTA และวิธีวัดผลแบบง่าย ๆ อย่างละ 1 ข้อ',
      },
    ],
    examples: [
      {
        title: 'เปิดตัวคาเฟ่ใหม่บน Instagram',
        useCase: 'รวบรวมไอเดียโพสต์สัปดาห์แรกของการเปิดร้าน',
        inputs: {
          topic: 'คาเฟ่กาแฟคั่วเองแห่งใหม่ย่านอารีย์',
          platform: 'Instagram',
          count: '5',
        },
      },
    ],
  },
  {
    id: 'p-data-analysis',
    slug: 'data-analysis-guide',
    title: 'ช่วยวิเคราะห์ข้อมูลเบื้องต้น',
    description: 'แนะนำมุมมองและขั้นตอนวิเคราะห์ข้อมูลก่อนลงมือดับเบิลเช็ก',
    category: 'data',
    tags: ['ข้อมูล', 'วิเคราะห์', 'เริ่มต้นใช้งาน'],
    template:
      'ฉันมีข้อมูล: {{dataset}}\nอยากตอบคำถามว่า {{question}}\nช่วยแนะนำวิธีวิเคราะห์แบบ {{approach}} ระบุ 1) ตัวชี้วัดหรือมิติที่ควรดู 2) ขั้นตอนสั้น ๆ 3) ข้อควรระวังของข้อมูลชุดนี้',
    variables: [
      {
        key: 'dataset',
        label: 'ข้อมูลที่มี',
        type: 'textarea',
        placeholder: 'เช่น ยอดขายรายวัน 1 ปี ของร้านออนไลน์ (ไฟล์ CSV)',
        required: true,
        defaultValue: 'ยอดขายรายวัน 1 ปี ของร้านออนไลน์ (ไฟล์ CSV)',
      },
      {
        key: 'question',
        label: 'คำถามที่อยากตอบ',
        type: 'text',
        placeholder: 'เช่น วันไหนขายดีที่สุด และปัจจัยอะไรมีผล',
        required: true,
        defaultValue: 'วันไหนขายดีที่สุด และปัจจัยอะไรมีผล',
      },
      {
        key: 'approach',
        label: 'แนวทางการวิเคราะห์',
        type: 'select',
        options: ['สถิติเบื้องต้น', 'ดูแนวโน้มและฤดูกาล', 'แบ่งกลุ่มลูกค้า'],
        defaultValue: 'ดูแนวโน้มและฤดูกาล',
      },
    ],
    variants: [
      {
        id: 'basic',
        label: 'พื้นฐาน',
        template:
          'ฉันมีข้อมูล: {{dataset}}\nอยากตอบคำถามว่า {{question}}\nช่วยแนะนำวิธีวิเคราะห์แบบ {{approach}} ระบุ 1) ตัวชี้วัดหรือมิติที่ควรดู 2) ขั้นตอนสั้น ๆ 3) ข้อควรระวังของข้อมูลชุดนี้',
      },
      {
        id: 'professional',
        label: 'มืออาชีพ',
        template:
          'ฉันมีข้อมูล: {{dataset}}\nอยากตอบคำถามว่า {{question}}\nรูปแบบ {{approach}} — เริ่มจากตรวจคุณภาพข้อมูลและตั้งสมมติฐานก่อน แล้วระบุตัวชี้วัด ขั้นตอน และข้อจำกัดแบบวิเคราะห์เทียบเคียง',
      },
      {
        id: 'concise',
        label: 'กระชับ',
        template:
          'ข้อมูล: {{dataset}}\nคำถาม: {{question}}\nแนะนำวิธี {{approach}} แบบสั้นที่สุด: ตัวชี้วัด 3 ตัว ขั้นตอน 3 ขั้น ข้อควรระวัง 1 ข้อ',
      },
    ],
    examples: [
      {
        title: 'ทำความเข้าใจยอดขายกับหัวหน้าแผนก',
        useCase: 'เตรียมคำตอบก่อนคุยเรื่องแนวโน้มยอดขาย ให้อธิบายได้อย่างเชื่อถือได้',
        inputs: {
          dataset: 'ยอดขายรายเดือน 2 ปี แยกตามสาขา (ฝากไว้บนไดรฟ์)',
          question: 'เดือนไหนขายดีที่สุด และสาขาไหนโตเร็วที่สุด',
          approach: 'ดูแนวโน้มและฤดูกาล',
        },
      },
    ],
  },
  {
    id: 'p-product-copy',
    slug: 'product-description',
    title: 'เขียนคำอธิบายสินค้า',
    description: 'คำอธิบายสินค้าที่อ่านสนุก แนะนำจุดเด่น ชวนกดสั่ง',
    category: 'marketing',
    tags: ['อีคอมเมิร์ซ', 'คอนเทนต์', 'ขายของ'],
    template:
      'ช่วยเขียนคำอธิบายสินค้า {{product}} สำหรับลงบน {{channel}}\nโทน{{tone}} เน้นจุดเด่น: {{highlights}}\nความยาวไม่เกิน 120 คำ อ่านสนุก ชวนให้อยากกดสั่ง',
    variables: [
      {
        key: 'product',
        label: 'ชื่อสินค้า',
        type: 'text',
        placeholder: 'เช่น แก้วเก็บอุณหภูมิสแตนเลส 450 มล.',
        required: true,
        defaultValue: 'แก้วเก็บอุณหภูมิสแตนเลส 450 มล.',
      },
      {
        key: 'highlights',
        label: 'จุดเด่นของสินค้า',
        type: 'textarea',
        placeholder: 'เช่น เก็บร้อน 6 ชม. เก็บเย็น 12 ชม. กันรั่ว พกพาได้',
        required: true,
        defaultValue: 'เก็บร้อน 6 ชม. เก็บเย็น 12 ชม. กันรั่ว พกพาได้ทุกถุง',
        helper: 'คั่นแต่ละจุดเด่นด้วย เครื่องหมายจุดหรือคอมมา',
      },
      {
        key: 'tone',
        label: 'โทนของคำอธิบาย',
        type: 'select',
        options: ['ตรงไปตรงมา', 'อบอุ่น', 'หรูหรา', 'สนุก'],
        defaultValue: 'อบอุ่น',
      },
      {
        key: 'channel',
        label: 'แพลตฟอร์มที่ลงขาย',
        type: 'select',
        options: ['เว็บไซต์ร้านค้า', 'Shopee', 'Lazada', 'Instagram Shopping'],
        defaultValue: 'Shopee',
      },
    ],
    variants: [
      {
        id: 'basic',
        label: 'พื้นฐาน',
        template:
          'ช่วยเขียนคำอธิบายสินค้า {{product}} สำหรับลงบน {{channel}}\nโทน{{tone}} เน้นจุดเด่น: {{highlights}}\nความยาวไม่เกิน 120 คำ อ่านสนุก ชวนให้อยากกดสั่ง',
      },
      {
        id: 'creative',
        label: 'สร้างสรรค์',
        template:
          'เขียนคำอธิบายสินค้า {{product}} เวอร์ชันลง {{channel}} โทน{{tone}}\nเปิดด้วยภาพจินตนาการว่าวันหนึ่งใช้สินค้านี้ทำอะไรได้ แล้วตามด้วยจุดเด่น {{highlights}}',
      },
      {
        id: 'concise',
        label: 'กระชับ',
        template:
          'คำอธิบายสินค้า {{product}} สำหรับ {{channel}} โทน{{tone}}\nไม่เกิน 60 คำ เรียงจุดเด่น {{highlights}} เป็น bullet 3 ข้อ แล้วปิดด้วยประโยคชวนสั่งซื้อ',
      },
    ],
    examples: [
      {
        title: 'ลงขายแก้วเก็บอุณหภูมิบน Shopee',
        useCase: 'เน้นจุดเด่นพร้อมวิธีใช้ 1 บรรทัด เพื่อให้ผู้ซื้อเชื่อมโยงประโยชน์กับรายละเอียดสินค้าได้เร็ว',
        inputs: {
          product: 'แก้วเก็บอุณหภูมิสแตนเลส 450 มล.',
          highlights: 'เก็บร้อน 6 ชม. เก็บเย็น 12 ชม. กันรั่ว',
          tone: 'ตรงไปตรงมา',
          channel: 'Shopee',
        },
      },
    ],
  },
  {
    id: 'p-meeting-notes',
    slug: 'meeting-notes-summary',
    title: 'สรุปบันทึกการประชุม',
    description: 'ย่อบันทึกการประชุมให้เหลือเฉพาะสิ่งที่ต้องทำและผู้รับผิดชอบ',
    category: 'business',
    tags: ['การประชุม', 'สรุปงาน', 'ประสานงาน'],
    template:
      'นี่คือบันทึกการประชุม:\n---\n{{notes}}\n---\nช่วยสรุปออกมาเป็น{{format}} ครบถ้วน อ่านง่าย และไม่ตกหล่นข้อมูลสำคัญ',
    variables: [
      {
        key: 'notes',
        label: 'บันทึกการประชุม',
        type: 'textarea',
        placeholder: 'วางบันทึกการประชุมของคุณที่นี่ (ต้นฉบับดิบ ไม่ต้องจัดรูปแบบ)',
        required: true,
        defaultValue:
          'เราทบทวนเป้าขายไตรมาสนี้ว่าหลุดเป้า 12% เพราะสินค้านำเข้ามาช้า\nสรุป: 1) ทอดจะเร่งประสานซัพพลายเออร์ตัวใหม่ 2) มายด์อยากให้ทีมโฆษณาจัดกิจกรรมเดือนหน้า 3) การตัดโบนัสสายล่าง — ต้องรีวิวก่อน',
        helper: 'วางแบบดิบได้เลย เราจะช่วยจัดรูปแบบให้',
      },
      {
        key: 'format',
        label: 'รูปแบบที่ต้องการ',
        type: 'select',
        options: [
          'รายการสิ่งที่ต้องทำพร้อมผู้รับผิดชอบ',
          'รายการตัดสินใจเท่านั้น',
          'เอกสารสรุปมาตรฐานที่อ่านง่าย',
        ],
        defaultValue: 'รายการสิ่งที่ต้องทำพร้อมผู้รับผิดชอบ',
      },
    ],
    variants: [
      {
        id: 'basic',
        label: 'พื้นฐาน',
        template:
          'นี่คือบันทึกการประชุม:\n---\n{{notes}}\n---\nช่วยสรุปออกมาเป็น{{format}} ครบถ้วน อ่านง่าย และไม่ตกหล่นข้อมูลสำคัญ',
      },
      {
        id: 'professional',
        label: 'มืออาชีพ',
        template:
          'บันทึกการประชุม:\n---\n{{notes}}\n---\nสรุปแยกหมวด การตัดสินใจ / สิ่งที่ต้องทำ / ประเด็นที่ยังไม่ชัด หากรายการใดในบันทึกไม่มีข้อมูลเพียงพอ ให้แยกไว้ในหมวด "ต้องเติมข้อมูลเพิ่มเติม" อย่างชัดเจน',
      },
      {
        id: 'concise',
        label: 'กระชับ',
        template:
          'จากบันทึกการประชุมด้านล่าง สรุปเฉพาะ 5 เรื่องสำคัญที่สุด ทุกเรื่องต้องมีผู้รับผิดชอบและกำหนดส่งที่ชัดเจน:\n---\n{{notes}}',
      },
    ],
    examples: [
      {
        title: 'แชร์ทำสรุปหลังประชุมทีม',
        useCase: 'แปลงบันทึกสั้น ๆ ให้เป็นรายการที่ต้องทำ แชร์ในแชททีมได้ทันที',
        inputs: {
          notes: 'เราทบทวนเป้าขายว่าหลุดเป้า 12%… (บันทึกในที่ประชุม)',
          format: 'รายการสิ่งที่ต้องทำพร้อมผู้รับผิดชอบ',
        },
      },
    ],
  },
];
