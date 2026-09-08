import { StageInfo, GermLayer, SignalingPathway, CaseStudy, QuizQuestion } from '../types';

export const TEXTBOOK_CONTENT = {
  title: "ชีววิทยาพัฒนาการ: กระบวนการและกลไกการพัฒนาของสิ่งมีชีวิต",
  titleEn: "Developmental Biology: Processes and Mechanisms of Organismal Development",
  abstract: `ชีววิทยาพัฒนาการ (Developmental Biology) เป็นสาขาวิชาที่มุ่งศึกษากระบวนการและกลไกที่ควบคุมการเปลี่ยนแปลงของสิ่งมีชีวิต ตั้งแต่ระยะเซลล์เริ่มต้นไปจนถึงการก่อรูปเป็นสิ่งมีชีวิตที่มีโครงสร้างและหน้าที่ซับซ้อน กระบวนการดังกล่าวครอบคลุมการแบ่งเซลล์ การกำหนดชะตากรรมของเซลล์ การแยกความแตกต่างของเซลล์ การเคลื่อนที่และการจัดระเบียบของเซลล์ ตลอดจนการสร้างเนื้อเยื่อและอวัยวะ การพัฒนาการเหล่านี้เกิดจากปฏิสัมพันธ์ระหว่างสารพันธุกรรม การควบคุมการแสดงออกของยีน การสื่อสารระหว่างเซลล์ และปัจจัยแวดล้อม การทำความเข้าใจกลไกเหล่านี้มีความสำคัญต่อการศึกษาพื้นฐานทางชีววิทยา รวมถึงการประยุกต์ใช้ในด้านพันธุศาสตร์ การแพทย์ เวชศาสตร์ฟื้นฟู และการศึกษาความผิดปกติของพัฒนาการ`,
  keywords: [
    "ชีววิทยาพัฒนาการ (Developmental Biology)",
    "การแบ่งเซลล์ (Cell Division / Cleavage)",
    "การแยกความแตกต่างของเซลล์ (Cell Differentiation)",
    "การแสดงออกของยีน (Gene Expression)",
    "การสร้างอวัยวะ (Organogenesis)",
    "การกำหนดชะตากรรมของเซลล์ (Cell Fate Determination)",
    "มอร์โฟเจน (Morphogen Gradients)"
  ],
  sections: [
    {
      id: "sec-1",
      number: "1",
      title: "บทนำ (Introduction)",
      content: `การพัฒนาของสิ่งมีชีวิตเป็นกระบวนการทางชีววิทยาที่มีความซับซ้อนและมีการควบคุมอย่างเป็นระบบ สิ่งมีชีวิตหลายชนิดเริ่มต้นจากเซลล์เพียงเซลล์เดียว (ไซโกต - Zygote) แต่สามารถพัฒนาไปเป็นสิ่งมีชีวิตที่ประกอบด้วยเซลล์จำนวนนับล้านล้านเซลล์ ซึ่งมีรูปร่าง โครงสร้าง และหน้าที่แตกต่างกันอย่างชัดเจน ความสามารถดังกล่าวเกิดขึ้นจากกระบวนการพัฒนาการที่ควบคุมอย่างละเอียดทั้งในระดับเซลล์และระดับโมเลกุล\n\nชีววิทยาพัฒนาการจึงมีบทบาทสำคัญในการอธิบายว่า เซลล์ที่มีสารพันธุกรรมพื้นฐานเดียวกันสามารถพัฒนาไปเป็นเซลล์ชนิดต่าง ๆ ได้อย่างไร (Differential Gene Expression) รวมถึงอธิบายกลไกที่ทำให้เซลล์สามารถจัดตำแหน่งและทำงานร่วมกันเพื่อสร้างเนื้อเยื่อ อวัยวะ และระบบอวัยวะที่มีหน้าที่เฉพาะเจาะจง`
    },
    {
      id: "sec-2",
      number: "2",
      title: "กระบวนการสำคัญของการพัฒนาการ (Key Developmental Processes)",
      content: `กระบวนการพัฒนาการประกอบด้วยเหตุการณ์หลายขั้นตอนที่มีความสัมพันธ์ต่อเนื่องกันอย่างแม่นยำ:\n\n1. การแบ่งเซลล์ (Cell Division / Cleavage): ทำให้จำนวนเซลล์เพิ่มขึ้นอย่างรวดเร็วโดยยังไม่มีการเจริญเติบโตของขนาดโดยรวมในระยะแรก\n2. การกำหนดชะตากรรมของเซลล์ (Cell Fate Determination): เซลล์ได้รับสัญญาณทางชีวเคมีหรือตำแหน่งที่ระบุว่าตนเองจะเจริญไปเป็นเซลล์ประเภทใดในอนาคต แม้ว่าลักษณะภายนอกจะยังไม่เปลี่ยนแปลงก็ตาม\n3. การแยกความแตกต่างของเซลล์ (Cell Differentiation): กระบวนการที่เซลล์สังเคราะห์โปรตีนเฉพาะและเปลี่ยนแปลงโครงสร้างเพื่อทำหน้าที่เฉพาะ เช่น เซลล์ประสาท (Neuron), เซลล์กล้ามเนื้อ (Myocyte), และเซลล์เยื่อบุผิว (Epithelial cell)\n4. การเคลื่อนที่และการจัดระเบียบของเซลล์ (Morphogenesis & Cell Migration): การเคลื่อนตัวของกลุ่มเซลล์ เช่น ในระยะ Gastrulation เพื่อก่อตัวเป็นชั้นเนื้อเยื่อหลัก 3 ชั้น และขึ้นรูปทรงของร่างกาย (Body Plan)`
    },
    {
      id: "sec-3",
      number: "3",
      title: "การควบคุมระดับโมเลกุลและพันธุกรรม (Molecular & Genetic Regulation)",
      content: `การพัฒนาการของสิ่งมีชีวิตอาศัยการควบคุมการแสดงออกของยีน (Differential Gene Expression) เป็นกลไกพื้นฐาน แม้เซลล์ส่วนใหญ่ภายในสิ่งมีชีวิตเดียวกันจะมี DNA ชุดเดียวกันทั้งหมด แต่ชุดของยีนที่ถูกเปิด (Activate) หรือปิด (Repress) ในแต่ละเซลล์นั้นแตกต่างกันอย่างสิ้นเชิง\n\nกลไกหลักระดับโมเลกุลประกอบด้วย:\n• Transcription Factors (ปัจจัยควบคุมการถอดรหัส): โปรตีนที่เข้าจับกับโปรโมเตอร์หรือเอนแฮนเซอร์เพื่อสั่งการเปิด-ปิดยีน\n• Morphogen Gradients (การกระจายตัวของสารเหนี่ยวนำ): โมเลกุลส่งสัญญาณ เช่น Sonic Hedgehog (Shh), BMP, Wnt และ FGF ซึ่งมีความเข้มข้นที่แตกต่างกันตามระยะทางจากจุดกำเนิด ทำให้เซลล์ที่สัมผัสความเข้มข้นต่างกันพัฒนาไปเป็นชะตากรรมที่ต่างกัน (แบบจำลอง French Flag Model)\n• Epigenetic Regulation: การดัดแปลงฮิสโตนและ DNA Methylation ที่ทำให้เซลล์สามารถจดจำสถานะความแตกต่างของตนเองและถ่ายทอดต่อไปยังเซลล์ลูกได้`
    },
    {
      id: "sec-4",
      number: "4",
      title: "การสร้างเนื้อเยื่อและอวัยวะ (Organogenesis & Tissue Formation)",
      content: `หลังจากเซลล์จัดเรียงตัวเป็นเนื้อเยื่อปฐมภูมิ 3 ชั้น (Germ Layers) ได้แก่ เอ็กโทเดิร์ม (Ectoderm), มีโซเดิร์ม (Mesoderm) และ เอนโดเดิร์ม (Endoderm) เซลล์จะเริ่มเกิดปฏิสัมพันธ์ระหว่างชั้นเนื้อเยื่อ (Embryonic Induction) เพื่อสร้างอวัยวะเฉพาะ (Organogenesis)\n\nกระบวนการนี้ต้องอาศัยความแม่นยำสูง ทั้งในแง่ของตำแหน่ง (Spatial Coordination), จังหวะเวลา (Temporal Timing) และจำนวนเซลล์ การทำงานประสานกันของการแบ่งเซลล์ การตายของเซลล์ตามโปรแกรม (Apoptosis เช่น การแยกนิ้วมือและนิ้วเท้า) และการเชื่อมต่อของหลอดเลือด\n\nความผิดปกติในกระบวนการสร้างอวัยวะนี้จะนำไปสู่ความพิการแต่กำเนิด (Congenital Anomalies) เช่น ภาวะหลอดประสาทไม่ปิด (Neural Tube Defects) หรือความผิดปกติของโครงสร้างหัวใจและแขนขา`
    },
    {
      id: "sec-5",
      number: "5",
      title: "ความสำคัญและการประยุกต์ใช้ (Significance & Clinical Applications)",
      content: `องค์ความรู้ด้านชีววิทยาพัฒนาการมีความสำคัญอย่างยิ่งยวดต่อความก้าวหน้าทางการแพทย์และชีววิทยาสมัยใหม่:\n\n• เวชศาสตร์ฟื้นฟูสภาวะเสื่อม (Regenerative Medicine): การเลียนแบบกลไกการพัฒนาของตัวอ่อนเพื่อชักนำสเต็มเซลล์ (iPSCs) ให้เจริญเป็นเนื้อเยื่อทดแทน เช่น เซลล์กล้ามเนื้อหัวใจ เซลล์ประสาทโดปามีนสำหรับผู้ป่วยพาร์กินสัน\n• การวิจัยออร์แกนอยด์ (Organoid Technology): การสร้างอวัยวะจำลองขนาดจิ๋วในหลอดทดลอง เพื่อศึกษากลไกการเกิดโรคและทดสอบประสิทธิภาพของยา\n• เภสัชวิทยาและพิษวิทยาต่อตัวอ่อน (Teratology): การตรวจสอบสารเคมี ยา หรือเชื้อโรคที่อาจส่งผลกระทบต่อพัฒนาการของทารกในครรภ์\n• พันธุวิศวกรรมและการรักษาโรคทางพันธุกรรม: การตรวจวินิจฉัยก่อนการฝังตัว (PGD) และการทำความเข้าใจยีนควบคุมการเจริญเติบโต`
    },
    {
      id: "sec-6",
      number: "6",
      title: "สรุป (Conclusion)",
      content: `ชีววิทยาพัฒนาการเป็นศาสตร์ที่ศึกษากลไกซึ่งทำให้สิ่งมีชีวิตสามารถพัฒนาจากเซลล์เริ่มต้นไปสู่โครงสร้างที่มีความซับซ้อน กระบวนการดังกล่าวอาศัยการทำงานร่วมกันของการแบ่งเซลล์ การกำหนดชะตากรรมของเซลล์ การแยกความแตกต่าง การสื่อสารระหว่างเซลล์ และการควบคุมการแสดงออกของยีน ความเข้าใจเกี่ยวกับกระบวนการเหล่านี้ไม่เพียงช่วยอธิบายพื้นฐานของการเกิดและการเจริญเติบโตของสิ่งมีชีวิตเท่านั้น แต่ยังเป็นรากฐานสำคัญของการวิจัยทางชีวการแพทย์และการพัฒนาเทคโนโลยีทางการแพทย์ในอนาคต`
    }
  ]
};

export const STAGES_DATA: StageInfo[] = [
  {
    id: 'stage-1',
    nameTh: 'ระยะไซโกตและการปฏิสนธิ',
    nameEn: 'Fertilization & Zygote',
    timeframe: 'วันที่ 0 - 1',
    cellCount: '1 เซลล์',
    summary: 'การรวมตัวของอสุจิและไข่ ได้เซลล์ดิพลอยด์สมบูรณ์ที่มีความสามารถสูงสุด (Totipotent)',
    description: 'การรวมกันของสารพันธุกรรมจากบิดาและมารดา กระตุ้นการทำงานของเมแทบอลิซึมของเซลล์ไข่ และป้องกันการปฏิสนธิซ้ำซ้อน (Polyspermy block) ไซโกตที่เกิดขึ้นมีความสามารถในการพัฒนาไปเป็นทุกเซลล์ในร่างกายรวมถึงรก (Totipotency)',
    keyEvents: [
      'Cortical reaction ป้องกัน polyspermy',
      'การรวมตัวของ pronuclei ชายและหญิง',
      'การกระตุ้นการสังเคราะห์โปรตีนจาก maternal mRNA'
    ],
    molecularDrivers: ['PLC-zeta', 'Calcium wave oscillation', 'Maternal Oct4/Nanog'],
    diagramType: 'zygote',
    color: 'emerald'
  },
  {
    id: 'stage-2',
    nameTh: 'ระยะการแตกเซลล์แบบคลีเวจ',
    nameEn: 'Cleavage Divisions',
    timeframe: 'วันที่ 1 - 3',
    cellCount: '2 - 8 เซลล์',
    summary: 'การแบ่งเซลล์แบบไมโทซิสอย่างรวดเร็วโดยขนาดรวมของตัวอ่อนไม่ขยายใหญ่ขึ้น',
    description: 'เซลล์ลูกที่เกิดขึ้นเรียกว่า บลาสโตเมียร์ (Blastomere) การแบ่งเซลล์เกิดขึ้นอย่างรวดเร็วโดยข้ามระยะ G1 และ G2 ของวัฏจักรเซลล์ ตัวอ่อนยังคงอยู่ภายในเปลือกใสที่เรียกว่า Zona Pellucida',
    keyEvents: [
      'Mitotic divisions โดยไม่มี cell growth',
      'การคงสภาพ Totipotency ในระยะ 4-8 เซลล์',
      'การเคลื่อนตัวตามท่อนำไข่สู่โพรงมดลูก'
    ],
    molecularDrivers: ['Cdc25', 'Cyclin B-CDK1', 'Maternal-to-Zygotic Transition (MZT)'],
    diagramType: 'cleavage',
    color: 'teal'
  },
  {
    id: 'stage-3',
    nameTh: 'ระยะมอรูลาและการบีบแน่น',
    nameEn: 'Morula & Compaction',
    timeframe: 'วันที่ 3 - 4',
    cellCount: '16 - 32 เซลล์',
    summary: 'เซลล์เกาะกลุ่มคล้ายผลหม่อน และเกิด Compaction เพื่อแยกเซลล์ชั้นนอกและชั้นใน',
    description: 'เกิดกระบวนการ Compaction โดยเซลล์ชั้นนอกสร้าง Tight junctions และ Desmosomes แน่นหนา เริ่มเกิดการแบ่งขั้ว (Polarity) ซึ่งเป็นจุดเริ่มต้นแรกของการแยกชะตากรรมเซลล์ระหว่างเซลล์ที่จะกลายเป็นรก และเซลล์ที่จะกลายเป็นร่างกายของตัวอ่อน',
    keyEvents: [
      'Compaction อาศัย E-cadherin',
      'การสร้าง Sodium-potassium pump ที่เซลล์ชั้นนอก',
      'การกำหนดเซลล์ชั้นใน (ICM) และชั้นนอก (Trophectoderm)'
    ],
    molecularDrivers: ['E-cadherin', 'Hippo Signaling pathway', 'Yap/Taz localization'],
    diagramType: 'morula',
    color: 'cyan'
  },
  {
    id: 'stage-4',
    nameTh: 'ระยะบลาสโตซิสต์และการฝังตัว',
    nameEn: 'Blastocyst & Implantation',
    timeframe: 'วันที่ 5 - 7',
    cellCount: '64 - 128+ เซลล์',
    summary: 'เกิดโพรงน้ำบลาสโตซีล แยกชัดเจนเป็น Inner Cell Mass (Pluripotent) และ Trophoblast',
    description: 'เซลล์โทรโฟบลาสต์สูบน้ำเข้าสู่ช่องว่างกลางเกิดเป็น Blastocoel กลุ่มเซลล์ด้านใน (Inner Cell Mass หรือ ICM) มีคุณสมบัติเป็น Pluripotent Stem Cells ซึ่งสามารถเจริญเป็นเนื้อเยื่อได้ทุกชนิดของร่างกาย ตัวอ่อนฟักตัวออกจาก Zona Pellucida และฝังตัวที่เยื่อบุโพรงมดลูก',
    keyEvents: [
      'Cavitation สร้างโพรง Blastocoel',
      'Zona hatching (การฟักออกจากเปลือกหุ้ม)',
      'การฝังตัวใน Endometrium ของมดลูก'
    ],
    molecularDrivers: ['Oct4', 'Sox2', 'Nanog (รักษา ICM)', 'Cdx2 (กำหนด Trophoblast)'],
    diagramType: 'blastocyst',
    color: 'blue'
  },
  {
    id: 'stage-5',
    nameTh: 'ระยะแกสตรูเลชัน (สร้าง 3 ชั้นเนื้อเยื่อ)',
    nameEn: 'Gastrulation (Germ Layers Formation)',
    timeframe: 'วันที่ 14 - 18',
    cellCount: 'หลายพันเซลล์',
    summary: 'การเคลื่อนที่ครั้งใหญ่ของเซลล์ผ่าน Primitive Streak ก่อเกิด Ectoderm, Mesoderm และ Endoderm',
    description: 'เป็นระยะหัวใจสำคัญของการจัดระเบียบโครงสร้างร่างกาย (Body Plan) เซลล์เอพิบลาสต์เคลื่อนที่ม้วนตัวผ่านแนวร่อง Primitive streak เกิดการเปลี่ยนแปลงจากเยื่อบุผิวไปเป็นมีเซนไคม์ (Epithelial-to-Mesenchymal Transition: EMT) เพื่อสร้างชั้นเนื้อเยื่อปฐมภูมิ 3 ชั้น',
    keyEvents: [
      'การสร้าง Primitive Streak และ Primitive Node (Organizer)',
      'Epithelial-to-Mesenchymal Transition (EMT)',
      'การกำหนดแกนของร่างกาย (Anterior-Posterior, Dorsal-Ventral, Left-Right)'
    ],
    molecularDrivers: ['Nodal', 'Wnt3a', 'BMP4', 'Brachyury (T-box)', 'FGF8'],
    diagramType: 'gastrula',
    color: 'indigo'
  },
  {
    id: 'stage-6',
    nameTh: 'ระยะนิวรูเลชันและการสร้างอวัยวะ',
    nameEn: 'Neurulation & Organogenesis',
    timeframe: 'สัปดาห์ที่ 3 - 8',
    cellCount: 'นับล้านเซลล์',
    summary: 'การสร้างหลอดประสาท โซไมท์ และการเจริญเป็นอวัยวะต่างๆ อย่างสมบูรณ์',
    description: 'Notochord ส่งสัญญาณเหนี่ยวนำให้ Ectoderm ด้านบนหนาตัวเป็นแผ่นประสาท (Neural Plate) ม้วนพับปิดเป็นหลอดประสาท (Neural Tube) ซึ่งจะกลายเป็นสมองและไขสันหลัง ขณะที่ Mesoderm แบ่งตัวเป็น Somites เพื่อสร้างกล้ามเนื้อ กระดูกสันหลัง และหนังแท้',
    keyEvents: [
      'Neural tube closure (ปิดสมบูรณ์วันที่ 28)',
      'การอพยพของ Neural Crest Cells (เซลล์สารพัดประโยชน์)',
      'การเต้นของหัวใจเริ่มแรกที่สัปดาห์ที่ 4',
      'การงอกของตุ่มแขนขา (Limb bud outgrowth)'
    ],
    molecularDrivers: ['Sonic Hedgehog (Shh)', 'Pax6', 'BMP inhibitors (Chordin, Noggin)', 'Hox genes'],
    diagramType: 'neurula',
    color: 'violet'
  }
];

export const GERM_LAYERS: GermLayer[] = [
  {
    id: 'ectoderm',
    nameTh: 'เนื้อเยื่อชั้นนอก (Ectoderm)',
    nameEn: 'Ectoderm',
    color: 'text-sky-700',
    borderColor: 'border-sky-500',
    bgLight: 'bg-sky-50',
    description: 'พัฒนาไปเป็นระบบประสาท อวัยวะรับสัมผัส และชั้นผิวหนังด้านนอกสุดของร่างกาย',
    signalingMolecules: ['BMP4 (Low levels for neural)', 'Chordin / Noggin', 'FGF', 'Wnt'],
    organs: [
      { nameTh: 'ระบบประสาทส่วนกลาง', nameEn: 'Brain & Spinal Cord', description: 'สมอง ซีรีบรัม ก้านสมอง และไขสันหลัง', icon: 'Brain' },
      { nameTh: 'เซลล์สันประสาท', nameEn: 'Neural Crest Cells', description: 'ปมประสาท ใบหน้า กระดูกขากรรไกร เซลล์สร้างเม็ดสีเมลานิน', icon: 'Zap' },
      { nameTh: 'ผิวหนังชั้นนอกและอนุพันธ์', nameEn: 'Epidermis, Hair, Nails', description: 'ชั้นหนังกำพร้า เส้นผม เล็บ ต่อมเหงื่อ ต่อมน้ำนม', icon: 'Shield' },
      { nameTh: 'เลนส์ตาและหูด้านใน', nameEn: 'Lens & Inner Ear', description: 'เลนส์ตา กระจกตา และเซลล์รับเสียงในหูชั้นใน', icon: 'Eye' },
      { nameTh: 'ต่อมหมวกไตชั้นใน', nameEn: 'Adrenal Medulla', description: 'สร้างฮอร์โมนอะดรีนาลีนและนอร์อะดรีนาลีน', icon: 'Flame' }
    ]
  },
  {
    id: 'mesoderm',
    nameTh: 'เนื้อเยื่อชั้นกลาง (Mesoderm)',
    nameEn: 'Mesoderm',
    color: 'text-amber-700',
    borderColor: 'border-amber-500',
    bgLight: 'bg-amber-50',
    description: 'พัฒนาไปเป็นระบบโครงร่าง กล้ามเนื้อ ระบบไหลเวียนโลหิต ระบบขับถ่าย และระบบสืบพันธุ์',
    signalingMolecules: ['BMP4', 'Brachyury (T-gene)', 'Wnt', 'VEGF', 'FGF'],
    organs: [
      { nameTh: 'ระบบหัวใจและหลอดเลือด', nameEn: 'Heart & Blood Vessels', description: 'กล้ามเนื้อหัวใจ หลอดเลือดแดง หลอดเลือดดำ เซลล์เม็ดเลือด', icon: 'Heart' },
      { nameTh: 'กล้ามเนื้อและโครงร่างกระดูก', nameEn: 'Muscles & Skeleton', description: 'กล้ามเนื้อลาย กระดูก กระดูกอ่อน เส้นเอ็น', icon: 'Activity' },
      { nameTh: 'ระบบทางเดินปัสสาวะและสืบพันธุ์', nameEn: 'Kidneys & Gonads', description: 'ไต ท่อไต รังไข่ อัณฑะ ท่อนำอสุจิ', icon: 'Cpu' },
      { nameTh: 'ผิวหนังชั้นใน', nameEn: 'Dermis', description: 'ชั้นหนังแท้และเนื้อเยื่อเกี่ยวพันใต้ผิวหนัง', icon: 'Layers' },
      { nameTh: 'ม้ามและต่อมหมวกไตชั้นนอก', nameEn: 'Spleen & Adrenal Cortex', description: 'ม้ามและต่อมหมวกไตส่วนนอกที่ผลิตคอร์ติซอล', icon: 'CircleDot' }
    ]
  },
  {
    id: 'endoderm',
    nameTh: 'เนื้อเยื่อชั้นใน (Endoderm)',
    nameEn: 'Endoderm',
    color: 'text-rose-700',
    borderColor: 'border-rose-500',
    bgLight: 'bg-rose-50',
    description: 'พัฒนาไปเป็นเยื่อบุทางเดินอาหาร เยื่อบุระบบหายใจ และต่อมที่เกี่ยวข้องกับการย่อยอาหาร',
    signalingMolecules: ['Sox17', 'FoxA2', 'Nodal', 'TGF-beta'],
    organs: [
      { nameTh: 'เยื่อบุทางเดินอาหาร', nameEn: 'GI Tract Lining', description: 'เยื่อบุหลอดอาหาร กระเพาะอาหาร ลำไส้เล็ก ลำไส้ใหญ่', icon: 'Utensils' },
      { nameTh: 'ตับและถุงน้ำดี', nameEn: 'Liver & Gallbladder', description: 'เซลล์ตับ (Hepatocytes) และท่อน้ำดี', icon: 'Droplets' },
      { nameTh: 'ตับอ่อน', nameEn: 'Pancreas', description: 'ต่อมผลิตเอนไซม์ย่อยอาหารและเกาะไอส์เลตสร้างอินซูลิน', icon: 'Sliders' },
      { nameTh: 'ระบบทางเดินหายใจ', nameEn: 'Lungs & Trachea', description: 'เยื่อบุหลอดลม หลอดลมฝอย และถุงลมปอด', icon: 'Wind' },
      { nameTh: 'ต่อมไทรอยด์และพาราไทรอยด์', nameEn: 'Thyroid & Parathyroid', description: 'ต่อมไทรอยด์สร้างฮอร์โมนควบคุมการเผาผลาญ', icon: 'Compass' }
    ]
  }
];

export const SIGNALING_PATHWAYS: SignalingPathway[] = [
  {
    id: 'shh',
    name: 'Sonic Hedgehog (Shh)',
    fullName: 'Sonic Hedgehog Signaling Pathway',
    roleInDevelopment: 'ควบคุมการสร้างแกนของร่างกาย การสร้างขั้วของระบบประสาท (Ventral patterning) และการกำหนดจำนวนและลักษณะของนิ้วมือ/นิ้วเท้า (ZPA organizer)',
    keyMolecules: ['Shh ligand', 'Patched (Ptch1)', 'Smoothened (Smo)', 'Gli transcription factors (Gli1, Gli2, Gli3)'],
    targetGenes: ['Pax6 (inhibition)', 'Nkx2.2', 'Olig2', 'Ptch1', 'Gli1'],
    clinicalRelevance: 'การกลายพันธุ์ทำให้เกิดภาวะตาเดียว (Cyclopia), สมองส่วนหน้าไม่แยกซีก (Holoprosencephaly), นิ้วเกิน (Polydactyly) และมะเร็ง Medulloblastoma'
  },
  {
    id: 'wnt',
    name: 'Wnt / β-catenin',
    fullName: 'Canonical Wnt Signaling Pathway',
    roleInDevelopment: 'กำหนดแกนด้านหน้า-หลัง (Anterior-Posterior axis), การสร้าง Primitive streak, การแบ่งตัวของสเต็มเซลล์ และการอพยพของ Neural crest cells',
    keyMolecules: ['Wnt ligands', 'Frizzled receptor', 'LRP5/6', 'Dishevelled (Dvl)', 'β-catenin', 'GSK3β destruction complex'],
    targetGenes: ['Axin2', 'c-Myc', 'Cyclin D1', 'Brachyury (T)'],
    clinicalRelevance: 'ความผิดปกติส่งผลต่อการสร้างแกนตัวอ่อนล้มเหลว หรือการเกิดมะเร็งลำไส้ใหญ่ (FAP/Colorectal cancer)'
  },
  {
    id: 'bmp',
    name: 'BMP / TGF-β',
    fullName: 'Bone Morphogenetic Protein Pathway',
    roleInDevelopment: 'กำหนดแกนหลัง-ท้อง (Dorsal-Ventral patterning), การพัฒนาของกระดูกและกระดูกอ่อน, และการยับยั้งการเจริญเป็นเซลล์ประสาทหากไม่มีตัวยับยั้งเช่น Noggin/Chordin',
    keyMolecules: ['BMP2/4/7 ligands', 'BMPR-I / BMPR-II receptors', 'Smad1/5/8', 'Co-Smad4'],
    targetGenes: ['Id1-4', 'Runx2 (osteogenesis)', 'Msx1/2'],
    clinicalRelevance: 'Fibrodysplasia Ossificans Progressiva (FOP - โรคกล้ามเนื้อกลายเป็นกระดูก) และภาวะปากแหว่งเพดานโหว่'
  },
  {
    id: 'notch',
    name: 'Notch Signaling',
    fullName: 'Notch Juxtacrine Pathway',
    roleInDevelopment: 'การส่งสัญญาณระหว่างเซลล์ข้างเคียงโดยตรง (Lateral inhibition) ควบคุมการกำหนดชะตากรรมของเซลล์ให้แตกต่างจากเซลล์ข้างเคียง เช่น เซลล์ประสาท vs เซลล์เกลีย และการแบ่งปล้อง Somite (Segmentation clock)',
    keyMolecules: ['Delta-like / Jagged ligands', 'Notch receptor', 'γ-secretase complex', 'NICD (Notch Intracellular Domain)'],
    targetGenes: ['Hes1', 'Hey1', 'Mash1 (Neurogenin inhibition)'],
    clinicalRelevance: 'Alagille syndrome, Spondylocostal dysostosis (กระดูกสันหลังคดและซี่โครงติดกันแต่กำเนิด)'
  },
  {
    id: 'fgf',
    name: 'FGF / RTK',
    fullName: 'Fibroblast Growth Factor Pathway',
    roleInDevelopment: 'ควบคุมการเจริญเติบโตของแขนขา (Apical Ectodermal Ridge: AER), การยืดยาวของแกนร่างกาย และการสร้างระบบหลอดเลือด (Angiogenesis)',
    keyMolecules: ['FGF8, FGF4, FGF2', 'FGFR1-4', 'Ras-Raf-MEK-ERK cascade'],
    targetGenes: ['Sprouty', 'Dusp6', 'Ets transcription factors'],
    clinicalRelevance: 'Achondroplasia (ภาวะคนแคระกระดูกไม่เจริญจากการกลายพันธุ์ที่ FGFR3), Pfeiffer syndrome'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    conditionNameTh: 'ภาวะหลอดประสาทไม่ปิด (สไปนา ไบฟิดา)',
    conditionNameEn: 'Neural Tube Defects (Spina Bifida & Anencephaly)',
    defectStage: 'สัปดาห์ที่ 3 - 4 (Neurulation)',
    molecularCause: 'ความล้มเหลวของการเชื่อมขอบแผ่นประสาท (Neural fold closure) ส่วนท้าย สัมพันธ์กับการขาดกรดโฟลิก (Folate deficiency) และยีนควบคุมกระบวนการเมทิลเลชัน',
    symptoms: [
      'ไขสันหลังและเยื่อหุ้มยื่นออกนอกกระดูกสันหลัง',
      'กล้ามเนื้อขาเป็นอัมพาตและสูญเสียความรู้สึก',
      'ระบบขับถ่ายปัสสาวะและอุจจาระทำงานผิดปกติ',
      'ภาวะโพรงสมองคั่งน้ำ (Hydrocephalus)'
    ],
    preventativeOrTherapy: 'การรับประทานกรดโฟลิก (Folic Acid 400-800 ไมโครกรัม/วัน) ตั้งแต่ช่วงก่อนตั้งครรภ์และไตรมาสแรก สามารถป้องกันได้มากกว่า 70%'
  },
  {
    id: 'case-2',
    conditionNameTh: 'ภาวะสมองส่วนหน้าไม่แยกซีกและตาเดี่ยว',
    conditionNameEn: 'Holoprosencephaly & Cyclopia',
    defectStage: 'สัปดาห์ที่ 3 (Prechordal plate signaling)',
    molecularCause: 'ความผิดปกติของการส่งสัญญาณ Sonic Hedgehog (Shh) จาก Notocord และ Prechordal plate หรือการได้รับสารยับยั้งเช่น Cyclopamine',
    symptoms: [
      'สมองส่วนหน้าไม่แบ่งออกเป็นสองซีก',
      'ความพิการรุนแรงบนใบหน้า เช่น มีเบ้าตาเดียวตรงกลาง (Cyclopia)',
      'ไม่มีจมูกหรือมีจมูกเป็นงวงเหนือตา (Proboscis)',
      'เพดานโหว่รุนแรงและการพัฒนาของต่อมใต้สมองผิดปกติ'
    ],
    preventativeOrTherapy: 'การให้คำปรึกษาทางพันธุศาสตร์และการหลีกเลี่ยงสาร Teratogen ในสิ่งแวดล้อม'
  },
  {
    id: 'case-3',
    conditionNameTh: 'ภาวะแขนขากุดจากยาทาลิโดไมด์',
    conditionNameEn: 'Thalidomide Embryopathy (Phocomelia)',
    defectStage: 'สัปดาห์ที่ 4 - 8 (Limb Bud Development)',
    molecularCause: 'สาร Thalidomide เข้าจับกับโปรตีน Cereblon (CRBN) ส่งผลให้เกิดการทำลาย Transcription factor SALL4 และยับยั้งการส่งสัญญาณ FGF/Angiogenesis ที่บริเวณยอดตุ่มแขนขา (AER)',
    symptoms: [
      'กระดูกแขนหรือขาสั้นกุด คล้ายครีบแมวน้ำ (Phocomelia)',
      'นิ้วมือนิ้วเท้าขาดหายหรือติดกัน',
      'ความพิการของหูและหัวใจร่วมด้วย'
    ],
    preventativeOrTherapy: 'ประวัติศาสตร์สำคัญที่ปฏิวัติวงการเภสัชวิทยาและระเบียบการทดสอบความปลอดภัยต่อทารกในครรภ์ของยาทุกชนิดในโลก'
  },
  {
    id: 'case-4',
    conditionNameTh: 'ภาวะปากแหว่งเพดานโหว่',
    conditionNameEn: 'Cleft Lip and Palate',
    defectStage: 'สัปดาห์ที่ 5 - 10 (Craniofacial Development)',
    molecularCause: 'ความล้มเหลวของการประสานกันระหว่างกระบวนการขากรรไกรบน (Maxillary prominence) และส่วนยื่นจมูกตรงกลาง (Medial nasal prominence) ร่วมกับความผิดปกติของ Neural Crest Cells',
    symptoms: [
      'รอยแยกที่ริมฝีปากบนด้านเดียวหรือสองด้าน',
      'รอยโหว่ที่เพดานแข็งและเพดานอ่อน',
      'ปัญหาในการดูดกลืนน้ำนม การพูด และการติดเชื้อในหูชั้นกลาง'
    ],
    preventativeOrTherapy: 'การผ่าตัดตกแต่งศัลยกรรมตกแต่ง (Cheiloplasty & Palatoplasty) การบำบัดการพูด และการเสริมกรดโฟลิก'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "เซลล์ในระยะใดของการพัฒนาที่มีคุณสมบัติเป็น Pluripotent Stem Cells (สามารถพัฒนาไปเป็นเซลล์ร่างกายได้ทุกชนิด แต่ไม่สามารถสร้างรกได้)?",
    options: [
      "Zygote",
      "Inner Cell Mass (ICM) ในระยะ Blastocyst",
      "Trophoblast ในระยะ Blastocyst",
      "Blastomere ระยะ 2 เซลล์"
    ],
    correctIndex: 1,
    explanation: "Inner Cell Mass (ICM) ในระยะบลาสโตซิสต์ มีคุณสมบัติเป็น Pluripotent Stem Cells ซึ่งจะเจริญไปเป็นเนื้อเยื่อทั้ง 3 ชั้นของตัวอ่อน ส่วน Zygote และ Blastomere ระยะ 2-8 เซลล์แรกเป็น Totipotent และ Trophoblast จะเจริญไปเป็นรก"
  },
  {
    id: 2,
    question: "กระบวนการใดที่ทำให้ตัวอ่อนเปลี่ยนจากแผ่นเซลล์ 2 มิติไปสู่โครงสร้าง 3 มิติที่มีเนื้อเยื่อ 3 ชั้น (Ectoderm, Mesoderm, Endoderm)?",
    options: [
      "Cleavage",
      "Compaction",
      "Gastrulation",
      "Neurulation"
    ],
    correctIndex: 2,
    explanation: "Gastrulation (แกสตรูเลชัน) คือกระบวนการเคลื่อนที่ของเซลล์ผ่าน Primitive Streak ทำให้เกิดเนื้อเยื่อปฐมภูมิ 3 ชั้น และกำหนดแกนของร่างกาย"
  },
  {
    id: 3,
    question: "ระบบประสาทส่วนกลาง (สมองและไขสันหลัง) มีจุดกำเนิดมาจากเนื้อเยื่อชั้นใด?",
    options: [
      "Ectoderm",
      "Mesoderm",
      "Endoderm",
      "Extraembryonic mesoderm"
    ],
    correctIndex: 0,
    explanation: "ระบบประสาททั้งหมด รวมถึงสมอง ไขสันหลัง และเซลล์สันประสาท (Neural Crest) กำเนิดมาจากเนื้อเยื่อชั้นนอก (Ectoderm) โดยได้รับการเหนี่ยวนำจาก Notochord"
  },
  {
    id: 4,
    question: "โมเลกุลส่งสัญญาณ (Morphogen) ชนิดใดที่มีบทบาทสำคัญอย่างยิ่งในการกำหนดขั้วด้านท้องของไขสันหลัง (Ventral patterning) และการกำหนดแกนนิ้วมือ/นิ้วเท้า?",
    options: [
      "Sonic Hedgehog (Shh)",
      "Hemoglobin",
      "Insulin",
      "Keratin"
    ],
    correctIndex: 0,
    explanation: "Sonic Hedgehog (Shh) หลั่งออกมาจาก Notochord และ Floor plate เพื่อกำหนดการเจริญของเซลล์ประสาทสั่งการ (Motor neurons) รวมถึงหลั่งจาก ZPA เพื่อกำหนดรูปแบบของนิ้วมือ"
  },
  {
    id: 5,
    question: "การรับประทานสารอาหารใดก่อนตั้งครรภ์และในช่วงสัปดาห์แรกของการตั้งครรภ์ ได้รับการพิสูจน์แล้วว่าช่วยลดความเสี่ยงของการเกิดภาวะหลอดประสาทไม่ปิด (Spina Bifida) ได้อย่างมีนัยสำคัญ?",
    options: [
      "วิตามินซี (Vitamin C)",
      "กรดโฟลิก (Folic Acid / Vitamin B9)",
      "แคลเซียม (Calcium)",
      "ธาตุเหล็ก (Iron)"
    ],
    correctIndex: 1,
    explanation: "กรดโฟลิก (Folic Acid หรือ Vitamin B9) จำเป็นอย่างยิ่งต่อการสังเคราะห์ DNA และกระบวนการปิดของหลอดประสาท (Neurulation) ในสัปดาห์ที่ 3-4 ช่วยลดความเสี่ยงของ Spina Bifida ได้มากกว่า 70%"
  }
];

export const SAMPLE_HISTOLOGY_IMAGES = [
  {
    id: 'blastocyst',
    title: 'ตัวอ่อนระยะบลาสโตซิสต์ (Human Blastocyst Stage - Day 5)',
    description: 'ภาพกำลังขยายสูงแสดง Inner Cell Mass (ICM), โพรงบลาสโตซีล (Blastocoel), และเซลล์ขอบนอกโทรโฟบลาสต์ (Trophectoderm)',
    url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    sampleQuestion: 'ช่วยระบุตำแหน่ง Inner Cell Mass และอธิบายว่าเซลล์กลุ่มนี้จะพัฒนาไปเป็นอะไร พร้อมระบุ Marker ทางพันธุกรรมสำคัญ'
  },
  {
    id: 'neural-tube',
    title: 'ภาพตัดขวางการม้วนปิดของหลอดประสาท (Neural Tube Cross-Section)',
    description: 'ภาพตัดขวางแสดง Neural plate, Notochord ด้านล่าง, Somite ทั้งสองข้าง และกลุ่มเซลล์ Neural crest',
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    sampleQuestion: 'วิเคราะห์โครงสร้างในภาพตัดขวางนี้ มีปฏิสัมพันธ์ทางเคมีระหว่าง Notochord กับ Ectoderm อย่างไร และหากปิดไม่สมบูรณ์จะเกิดอะไรขึ้น?'
  },
  {
    id: 'stem-cells',
    title: 'โคโลนีสเต็มเซลล์ตัวอ่อน (Pluripotent Embryonic Stem Cells Colony)',
    description: 'สเต็มเซลล์ตัวอ่อนเพาะเลี้ยงในห้องปฏิบัติการ แสดงการรวมกลุ่มที่หนาแน่นและแสดงผลโปรตีน Oct4/Nanog',
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
    sampleQuestion: 'อธิบายกระบวนการที่สามารถเหนี่ยวนำสเต็มเซลล์กลุ่มนี้ให้แยกความแตกต่างเป็นเซลล์ประสาทหรือเซลล์ตับอ่อนในหลอดทดลอง'
  }
];
