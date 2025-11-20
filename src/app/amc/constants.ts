export interface PrivacySection {
  title: string;
  body: string[];
}

export interface AmcFormField {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}

export const privacySections: PrivacySection[] = [
  {
    title: '1. วัตถุประสงค์',
    body: [
      'ประกาศความเป็นส่วนตัว (privacy notice) ฉบับนี้เพื่อแจ้งให้ทราบว่า SAM เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของท่านโดยจำกัดภายใต้กรอบกฎหมาย',
      'SAM อาจดำเนินการปรับปรุงหรือแก้ไขประกาศความเป็นส่วนตัวเพื่อให้สอดคล้องกับการให้บริการและหลักเกณฑ์ของกฎหมายที่มีการเปลี่ยนแปลงไป โดยจะแจ้งให้ทราบผ่านช่องทางต่าง ๆ'
    ]
  },
  {
    title: '2. ข้อมูลที่มีการเก็บรวบรวม',
    body: [
      'ข้อมูลส่วนบุคคลอาทิ ชื่อ นามสกุล วันเกิด เลขบัตรประจำตัวประชาชน หมายเลขโทรศัพท์ Line ID และอีเมล',
      'ข้อมูลด้านการเงินที่จำเป็นต่อการพิจารณาเข้าร่วมโครงการ รวมถึงข้อมูลติดต่อเพื่อประสานงาน'
    ]
  }
];

export const formFields: AmcFormField[] = [
  { id: 'firstName', label: 'ชื่อ', placeholder: 'สามารถ' },
  { id: 'lastName', label: 'นามสกุล', placeholder: 'ใจดี' },
  { id: 'birthDate', label: 'วันเกิด', placeholder: '07/02/1970', type: 'date' },
  { id: 'nationalId', label: 'เลขบัตรประชาชน', placeholder: '32334332346422' },
  { id: 'phone', label: 'โทรศัพท์มือถือ (เบอร์หลัก)', placeholder: '08X-XXX-XXXX' },
  { id: 'lineId', label: 'Line ID', placeholder: 'john77' },
  { id: 'email', label: 'Email', placeholder: 'john77@email.com', type: 'email' }
] ;

