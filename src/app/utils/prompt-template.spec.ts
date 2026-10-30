import { renderPlain, toSegments } from './prompt-template';

describe('prompt-template', () => {
  const template =
    'ช่วยเขียนอีเมลถึง {{recipient}} เกี่ยวกับ {{topic}}\nใช้โทน {{tone}}';

  describe('toSegments', () => {
    it('splits text and filled tokens', () => {
      const segments = toSegments(template, {
        recipient: 'คุณสมชาย',
        topic: 'ขอเลื่อนประชุม',
        tone: 'สุภาพ',
      });
      expect(segments.some((s) => s.isToken && s.filled && s.text === 'คุณสมชาย')).toBe(true);
      expect(segments.some((s) => !s.isToken && s.text.includes('เกี่ยวกับ'))).toBe(true);
    });

    it('marks blank variables as unfilled and keeps the raw token text', () => {
      const segments = toSegments(template, { recipient: '', topic: 'งาน', tone: 'สุภาพ' });
      const recipient = segments.find((s) => s.token === 'recipient');
      expect(recipient?.filled).toBe(false);
      expect(recipient?.isToken).toBe(true);
      expect(recipient?.text).toBe('{{recipient}}');
    });

    it('keeps newline characters inside text segments', () => {
      const segments = toSegments('บรรทัดแรก\n{{v}} บรรทัดสอง', { v: 'X' });
      expect(segments.some((s) => s.text.includes('\n'))).toBe(true);
    });
  });

  describe('renderPlain', () => {
    it('replaces filled variables', () => {
      expect(renderPlain(template, { recipient: 'A', topic: 'B', tone: 'C' })).toBe(
        'ช่วยเขียนอีเมลถึง A เกี่ยวกับ B\nใช้โทน C'
      );
    });

    it('keeps unfilled tokens visible', () => {
      expect(renderPlain(template, { topic: 'B', tone: 'C' })).toBe(
        'ช่วยเขียนอีเมลถึง {{recipient}} เกี่ยวกับ B\nใช้โทน C'
      );
    });

    it('renders the required email template exactly', () => {
      const email = 'ช่วยเขียนอีเมลถึง {{recipient}} เกี่ยวกับ {{topic}}\nใช้โทน {{tone}} ภาษา {{language}} ความยาว {{length}}';
      expect(renderPlain(email, { recipient: 'R', topic: 'T', tone: 'โทน', language: 'ภาษา', length: 'ความยาว' })).toBe(
        'ช่วยเขียนอีเมลถึง R เกี่ยวกับ T\nใช้โทน โทน ภาษา ภาษา ความยาว ความยาว'
      );
    });
  });
});
