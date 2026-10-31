export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type Tag = "spicy" | "veg" | "signature" | "share";
export type MenuItem = { id: string; name: string; desc: string; price: number; tags?: Tag[] };
export type Offer = { id: string; name: string; desc: string; price: number; was: number; serves: number; includes: string[] };
export type Category = { id: string; name: string; note?: string; items: MenuItem[] };

export type Content = {
  dir: "rtl" | "ltr";
  meta: { title: string; description: string };
  brand: string;
  word: string; // the giant hero word
  nav: { menu: string; build: string; story: string; offers: string; reserve: string; visit: string; order: string };
  switchLabel: string;
  menuLabel: string;
  close: string;
  skip: string;
  status: { open: string; closed: string };
  hero: { tagline: string; sub: string; primary: string; secondary: string; scroll: string; sceneLabel: string };
  ribbons: { first: string[]; second: string[] };
  build: { title: string; lead: string; sceneLabel: string; steps: { title: string; detail: string }[]; done: string };
  menu: {
    title: string;
    lead: string;
    currency: string;
    tags: Record<Tag, string>;
    categories: Category[];
    search: string;
    all: string;
    noResults: string;
    results: string;
    add: string;
    added: string;
    remove: string;
    sheet: { open: string; addTo: string; pickOne: string; optional: string; qty: string; pairs: string };
  };
  story: {
    kicker: string;
    title: string;
    lead: string;
    timeline: { year: string; text: string }[];
    stats: { value: number; suffix: string; label: string }[];
    quote: string;
    quoteBy: string;
  };
  tableMenu: {
    link: string;
    title: string;
    lead: string;
    scan: string;
    back: string;
    pageTitle: string;
  };
  picks: { kicker: string; title: string; lead: string; ids: string[] };
  offers: { kicker: string; title: string; lead: string; serves: string; save: string; items: Offer[] };
  cart: {
    open: string;
    title: string;
    empty: string;
    emptyHint: string;
    dishes: string;
    subtotal: string;
    delivery: string;
    deliveryNote: string;
    total: string;
    type: string;
    types: { pickup: string; delivery: string; dinein: string };
    name: string;
    phone: string;
    address: string;
    notes: string;
    notesHint: string;
    required: string;
    send: string;
    sendNote: string;
    clear: string;
    msgHello: string;
    msgOrder: string;
    msgTotal: string;
    msgName: string;
    msgPhone: string;
    msgType: string;
    msgAddress: string;
    msgNotes: string;
  };
  reserve: {
    kicker: string;
    title: string;
    lead: string;
    date: string;
    time: string;
    guests: string;
    seating: string;
    seats: { terrace: string; indoor: string; family: string };
    name: string;
    phone: string;
    notes: string;
    send: string;
    note: string;
    required: string;
    msgHello: string;
    perks: string[];
  };
  gallery: { title: string; alts: string[] };
  visit: {
    title: string;
    lead: string;
    addressTitle: string;
    address: string;
    directions: string;
    hoursTitle: string;
    hours: string;
    hoursNote: string;
    call: string;
    whatsapp: string;
    map: string;
  };
  footer: { tagline: string; concept: string; credit: string; photos: string };
};

export const WHATSAPP_NUMBER = "9647900000000";
export const DELIVERY_FEE = 3000;
export const PHONE_DISPLAY = "+964 790 000 0000";
export const PHONE_LINK = "tel:+9647900000000";
export const WHATSAPP_LINK = "https://wa.me/9647900000000";
export const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Abu+Nuwas+Street%2C+Baghdad";

// Open every day from noon until 1 am (Baghdad time).
export const OPEN_HOUR = 12;
export const CLOSE_HOUR = 1;

const ar: Content = {
  dir: "rtl",
  meta: {
    title: "شوّاية دجلة — مشويات ومسگوف على أبو نواس، بغداد",
    description:
      "تكة وكباب ومسگوف على الفحم، وفطور عراقي من الصبح. منيو كامل بالأسعار، مفتوحين كل يوم من الظهر لساعة وحدة بالليل.",
  },
  brand: "شوّاية دجلة",
  word: "دجلة",
  nav: { menu: "المنيو", build: "لفّة الصمون", story: "قصتنا", offers: "العروض", reserve: "احجز", visit: "زورونا", order: "اطلب واتساب" },
  switchLabel: "English",
  menuLabel: "القائمة",
  close: "إغلاق",
  skip: "انتقل إلى المحتوى",
  status: { open: "مفتوح هسه، لحد ١ بالليل", closed: "مسدود هسه، نفتح ١٢ الظهر" },
  hero: {
    tagline: "فحم، دخان، وريحة أبو نواس",
    sub: "تكة وكباب ومسگوف على الفحم، من ١٩٩٨ على شط دجلة.",
    primary: "شوف المنيو",
    secondary: "اطلب واتساب",
    scroll: "انزل",
    sceneLabel: "تكة وطماطة وبصل وليمون وصمون تطفر حول اسم المطعم",
  },
  ribbons: {
    first: ["تكة", "كباب", "مسگوف", "قوزي", "دولمة", "تشريب", "كاهي وگيمر"],
    second: ["من الفحم للصحن", "خبز حار من التنور", "عمبة على كيفك", "چاي مهيّل على حسابنا"],
  },
  build: {
    title: "لفّة الصمون، طبقة طبقة",
    lead: "انزل وشوف شلون نبنيها. نفس الطريقة كل مرة، من ١٩٩٨.",
    sceneLabel: "لفّة صمون تنبني طبقة طبقة مع النزول",
    steps: [
      { title: "صمون حار", detail: "من التنور مباشرة، مقرمش من برّه وطري من جوّه." },
      { title: "عمبة", detail: "صلصة المانگو الحامضة، على كيفك: خفيفة أو حارة." },
      { title: "تكة لحم", detail: "قطع غنم متبّلة من الليل، على الفحم لحد ما تتفحّم الحواف." },
      { title: "طماطة مشوية", detail: "تنشوي على نفس السيخ، وتطلع حلوة ومدخّنة." },
      { title: "بصل وسماق", detail: "بصل أحمر مقصوص رفيع، مخلوط بالسماق والبقدونس." },
      { title: "الغطا", detail: "نصّ الصمون الثاني، ونلفّها بالورق. بالعافية." },
    ],
    done: "جاهزة",
  },
  menu: {
    title: "المنيو",
    lead: "الأسعار بالدينار العراقي، وتشمل الخبز والطرشي والمخلل.",
    currency: "د.ع",
    tags: { spicy: "حار", veg: "نباتي", signature: "طبق البيت", share: "يكفي اثنين" },
    search: "دوّر على أكلة…",
    all: "الكل",
    noResults: "ما لگينا شي بهالاسم. جرّب كلمة ثانية.",
    results: "نتيجة",
    add: "أضف",
    added: "انضافت للسلة",
    remove: "شيل",
    sheet: { open: "التفاصيل", addTo: "أضف للطلب", pickOne: "اختار واحد", optional: "اختياري", qty: "الكمية", pairs: "يمشي وياها" },
    categories: [
      {
        id: "grill",
        name: "المشويات",
        items: [
          { id: "tikka", name: "تكة لحم", desc: "سيخين غنم متبّل، طماطة وبصل مشوي، خبز حار.", price: 12000, tags: ["signature"] },
          { id: "kebab", name: "كباب عراقي", desc: "لحم غنم مفروم بالشحم، على الفحم، مع سماق وبصل.", price: 10000 },
          { id: "chicken", name: "تكة دجاج", desc: "صدر دجاج بالزبادي والليمون والثوم.", price: 9000 },
          { id: "milaq", name: "معلاق", desc: "كبدة وقلب غنم، تنشوي على الطلب.", price: 8000, tags: ["spicy"] },
          { id: "mixed", name: "صينية مشكّل", desc: "تكة وكباب ودجاج ومعلاق، مع رز ومقبلات.", price: 38000, tags: ["share"] },
        ],
      },
      {
        id: "masgouf",
        name: "المسگوف",
        note: "يحتاج ٤٥ دقيقة على الحطب. اطلبه أول ما توصل.",
        items: [
          { id: "masgouf", name: "مسگوف كارب", desc: "سمكة شبوط مفتوحة، تنشوي واقفة جنب الحطب. للكيلو.", price: 35000, tags: ["signature", "share"] },
          { id: "masgouf-amba", name: "مسگوف بالعمبة والطماطة", desc: "نفس المسگوف، مغطّى بطماطة وبصل وعمبة بآخر عشر دقايق.", price: 38000, tags: ["share"] },
          { id: "bunni", name: "سمك بُنّي مشوي", desc: "قطع سمك بُنّي على السيخ مع ليمون وكزبرة.", price: 22000 },
        ],
      },
      {
        id: "plates",
        name: "أكلات البيت",
        items: [
          { id: "quzi", name: "قوزي على تمّن", desc: "لحم غنم مطبوخ ساعات، على رز بالشعرية والكشمش واللوز.", price: 20000, tags: ["signature"] },
          { id: "dolma", name: "دولمة", desc: "ورق عنب وبصل وفلفل محشي بالرز واللحم، بدبس الرمان.", price: 9000 },
          { id: "tashreeb", name: "تشريب لحم", desc: "خبز مقطّع منقوع بمرق اللحم والحمّص والنومي بصرة.", price: 9000 },
          { id: "bagilla", name: "باگلة بالدهن", desc: "فول أخضر بالدهن الحر والبيض، فطور بس للساعة ٢.", price: 5000, tags: ["veg"] },
        ],
      },
      {
        id: "breakfast",
        name: "فطور",
        note: "من ٧ الصبح لحد ١٢ الظهر، الجمعة والسبت.",
        items: [
          { id: "kahi", name: "كاهي وگيمر", desc: "معجنات مقرمشة بالقيمر الطازج والدبس أو العسل.", price: 5000, tags: ["veg", "signature"] },
          { id: "makhlama", name: "مخلمة", desc: "بيض بالطماطة والبصل واللحم المثروم.", price: 5500 },
          { id: "aroog", name: "عروك", desc: "أقراص مقلية باللحم والخضرة والبهارات.", price: 4000 },
        ],
      },
      {
        id: "sides",
        name: "مقبلات وسلطات",
        items: [
          { id: "hummus", name: "حمّص بالطحينة", desc: "مع زيت زيتون وكمّون وخبز حار.", price: 4000, tags: ["veg"] },
          { id: "salad", name: "سلطة عراقية", desc: "طماطة وخيار وبصل وبقدونس بالليمون.", price: 3000, tags: ["veg"] },
          { id: "torshi", name: "طرشي عراقي", desc: "شلغم وقرنابيط وخيار مخلّل بالعمبة.", price: 2000, tags: ["veg", "spicy"] },
          { id: "rice", name: "تمّن عنبر", desc: "رز عنبر عراقي بالشعرية.", price: 3000, tags: ["veg"] },
        ],
      },
      {
        id: "sweets",
        name: "حلويات ومشروبات",
        items: [
          { id: "baklava", name: "زلابية وبقلاوة", desc: "صحن مشكّل من حلويات السوق.", price: 5000, tags: ["veg"] },
          { id: "chai", name: "چاي مهيّل", desc: "باستكان، مع ثاني واحد على حسابنا.", price: 1000, tags: ["veg"] },
          { id: "ayran", name: "لبن عيران", desc: "لبن مخفوق بالملح والنعناع.", price: 1500, tags: ["veg"] },
          { id: "noomi", name: "عصير نومي بصرة", desc: "ليمون مجفف، حامض ومنعش.", price: 2500, tags: ["veg"] },
        ],
      },
    ],
  },
  story: {
    kicker: "قصتنا",
    title: "من منقلة على الرصيف، لأشهر شوّاية على الشط",
    lead: "بديناها بمنقلة وحدة وصندوق فحم. نفس التتبيلة، ونفس الفحم، ونفس الناس يرجعون كل خميس.",
    timeline: [
      { year: "١٩٩٨", text: "أبو علي يفتح منقلة صغيرة على رصيف أبو نواس: تكة وكباب وبس." },
      { year: "٢٠٠٦", text: "أول مسگوف على الحطب، والطابور يوصل للجسر كل جمعة." },
      { year: "٢٠١٥", text: "نفتح الطابق الثاني للعوائل، والتراس على الشط." },
      { year: "٢٠٢٤", text: "الجيل الثاني يستلم المنقلة، والطلب صار من الموبايل." },
    ],
    stats: [
      { value: 28, suffix: "", label: "سنة على نفس الفحم" },
      { value: 1200, suffix: "+", label: "سيخ نشويه كل يوم" },
      { value: 45, suffix: "", label: "دقيقة لكل مسگوف" },
      { value: 4, suffix: "", label: "أجيال من الزبائن" },
    ],
    quote: "السر مو بالتتبيلة. السر إنك تصبر على الفحم لحد ما يبيّض.",
    quoteBy: "أبو علي، مؤسس الشوّاية",
  },
  tableMenu: {
    link: "افتح المنيو الكامل",
    title: "منيو الطاولة",
    lead: "امسح الكود من طاولتك، اختار، واطلب. بدون انتظار النادل.",
    scan: "امسح بكاميرا الموبايل",
    back: "الرئيسية",
    pageTitle: "منيو شوّاية دجلة",
  },
  picks: {
    kicker: "الأكثر طلباً",
    title: "ثلاث أطباق، ما تطلع بدونها",
    lead: "اللي يرجعون عليها الناس من ١٩٩٨. اضغط أضف وكمّل طلبك.",
    ids: ["masgouf", "tikka", "quzi"],
  },
  offers: {
    kicker: "عروض البيت",
    title: "صواني للعزايم",
    lead: "جايين جماعة؟ هاي الصواني محسوبة على عددكم، وأرخص من الطلب بالمفرد.",
    serves: "تكفي",
    save: "توفّر",
    items: [
      {
        id: "offer-family",
        name: "صينية العيلة",
        desc: "مشويات مشكّلة، تمّن عنبر، سلطة، حمّص، وخبز حار من التنور.",
        price: 65000,
        was: 78000,
        serves: 4,
        includes: ["٨ أسياخ مشكّل", "تمّن عنبر", "سلطة وحمّص", "٤ چاي"],
      },
      {
        id: "offer-masgouf",
        name: "ليلة المسگوف",
        desc: "مسگوف كيلو ونص على الحطب، مع العمبة والطماطة والطرشي.",
        price: 58000,
        was: 66000,
        serves: 3,
        includes: ["مسگوف ١.٥ كيلو", "تمّن عنبر", "طرشي وسلطة", "عصير نومي"],
      },
      {
        id: "offer-breakfast",
        name: "فطور الجمعة لاثنين",
        desc: "كاهي وگيمر، باگلة بالدهن، مخلمة، وچاي مهيّل لحد ما تكتفون.",
        price: 15000,
        was: 18500,
        serves: 2,
        includes: ["كاهي وگيمر", "باگلة بالدهن", "مخلمة", "چاي مفتوح"],
      },
    ],
  },
  cart: {
    open: "سلّتك",
    title: "طلبك",
    empty: "السلة فارغة",
    emptyHint: "اختار من المنيو واضغط «أضف».",
    dishes: "طبق",
    subtotal: "المجموع",
    delivery: "التوصيل",
    deliveryNote: "داخل بغداد، خلال ٤٥ دقيقة تقريباً.",
    total: "الكلّي",
    type: "شلون تريد طلبك؟",
    types: { pickup: "استلام من المطعم", delivery: "توصيل", dinein: "آكل بالمطعم" },
    name: "الاسم",
    phone: "رقم الموبايل",
    address: "العنوان",
    notes: "ملاحظات",
    notesHint: "مثلاً: بدون بصل، العمبة حارة",
    required: "مطلوب",
    send: "ارسل الطلب على واتساب",
    sendNote: "راح ينفتح واتساب ورسالة الطلب جاهزة، بس دوس إرسال.",
    clear: "فرّغ السلة",
    msgHello: "هلا شوّاية دجلة، أريد أطلب:",
    msgOrder: "الطلب",
    msgTotal: "المجموع",
    msgName: "الاسم",
    msgPhone: "الموبايل",
    msgType: "النوع",
    msgAddress: "العنوان",
    msgNotes: "ملاحظات",
  },
  reserve: {
    kicker: "احجز طاولة",
    title: "على الشط، والطاولة محجوزة باسمك",
    lead: "اختار اليوم والساعة وكم نفر، ونأكد لك الحجز على واتساب خلال دقايق.",
    date: "اليوم",
    time: "الساعة",
    guests: "عدد الأشخاص",
    seating: "وين تحب تگعد؟",
    seats: { terrace: "التراس على الشط", indoor: "الصالة", family: "قسم العوائل" },
    name: "الاسم",
    phone: "رقم الموبايل",
    notes: "مناسبة أو طلب خاص؟",
    send: "احجز على واتساب",
    note: "الحجز مجاني، ونمسك الطاولة ٢٠ دقيقة بعد الموعد.",
    required: "مطلوب",
    msgHello: "هلا شوّاية دجلة، أريد أحجز طاولة:",
    perks: ["المسگوف يجهز وقت ما توصل إذا ذكرته بالحجز", "كيكة عيد الميلاد على حسابنا", "موقف سيارات خلفي مجاني"],
  },
  gallery: {
    title: "من الفحم للصحن",
    alts: [
      "أسياخ لحم مشوية مع طماطة وبصل وخبز",
      "لحم يتشوّى على فحم أحمر",
      "أسياخ مشوية مع خبز وخضرة مشوية",
      "صحن حمّص بزيت الزيتون مع خبز",
    ],
  },
  visit: {
    title: "زورونا على أبو نواس",
    lead: "على الشط، مقابل الحدائق. اگعد برّه بالليل، والمسگوف يتشوّى گدامك.",
    addressTitle: "العنوان",
    address: "شارع أبو نواس، قرب جسر الجمهورية، بغداد",
    directions: "موقف سيارات بالشارع الخلفي، ومكان للعوائل بالطابق الثاني.",
    hoursTitle: "الدوام",
    hours: "كل يوم، ١٢ الظهر – ١ بالليل",
    hoursNote: "الفطور الجمعة والسبت من ٧ الصبح.",
    call: "اتصل",
    whatsapp: "اطلب واتساب",
    map: "افتح بالخريطة",
  },
  footer: {
    tagline: "مشويات بغدادية على الفحم، من ١٩٩٨.",
    concept: "شوّاية دجلة مطعم خيالي. هذا الموقع مشروع تصميم وتطوير تجريبي، والأسعار للعرض فقط.",
    credit: "تصميم وتطوير مصطفى شاكر",
    photos: "الصور من Unsplash",
  },
};

const en: Content = {
  dir: "ltr",
  meta: {
    title: "Dijla Grill — Charcoal grill and masgouf on Abu Nuwas, Baghdad",
    description:
      "Tikka, kebab, and masgouf over charcoal, plus Iraqi breakfast. Full menu with prices. Open every day from noon to 1 am.",
  },
  brand: "Dijla Grill",
  word: "DIJLA",
  nav: { menu: "Menu", build: "The samoon", story: "Story", offers: "Deals", reserve: "Book", visit: "Visit", order: "Order on WhatsApp" },
  switchLabel: "العربية",
  menuLabel: "Menu",
  close: "Close",
  skip: "Skip to content",
  status: { open: "Open now, until 1 am", closed: "Closed now, opens at noon" },
  hero: {
    tagline: "Charcoal, smoke, and the smell of Abu Nuwas",
    sub: "Tikka, kebab, and masgouf over charcoal, on the bank of the Tigris since 1998.",
    primary: "See the menu",
    secondary: "Order on WhatsApp",
    scroll: "Scroll",
    sceneLabel: "Tikka, tomato, onion, lemon, and bread floating around the restaurant's name",
  },
  ribbons: {
    first: ["Tikka", "Kebab", "Masgouf", "Quzi", "Dolma", "Tashreeb", "Kahi & geymar"],
    second: ["From charcoal to plate", "Hot bread from the tannour", "Amba your way", "Cardamom chai on us"],
  },
  build: {
    title: "The samoon, layer by layer",
    lead: "Scroll to watch us build it. The same way every time, since 1998.",
    sceneLabel: "A samoon sandwich assembling layer by layer as you scroll",
    steps: [
      { title: "Hot samoon", detail: "Straight from the tannour, crisp outside and soft inside." },
      { title: "Amba", detail: "Tangy mango pickle sauce, mild or hot, your call." },
      { title: "Lamb tikka", detail: "Marinated overnight, grilled over charcoal until the edges char." },
      { title: "Grilled tomato", detail: "Charred on the same skewer, sweet and smoky." },
      { title: "Onion and sumac", detail: "Thin-sliced red onion tossed with sumac and parsley." },
      { title: "The lid", detail: "The other half of the samoon, wrapped in paper. Enjoy." },
    ],
    done: "Ready",
  },
  menu: {
    title: "Menu",
    lead: "Prices in Iraqi dinar, including bread, pickles, and torshi.",
    currency: "IQD",
    tags: { spicy: "Spicy", veg: "Vegetarian", signature: "House favorite", share: "Serves two" },
    search: "Search the menu…",
    all: "All",
    noResults: "Nothing matches that. Try another word.",
    results: "results",
    add: "Add",
    added: "Added to your order",
    remove: "Remove",
    sheet: { open: "Details", addTo: "Add to order", pickOne: "Pick one", optional: "Optional", qty: "Quantity", pairs: "Goes well with" },
    categories: [
      {
        id: "grill",
        name: "Grill",
        items: [
          { id: "tikka", name: "Lamb tikka", desc: "Two skewers of marinated lamb, grilled tomato and onion, hot bread.", price: 12000, tags: ["signature"] },
          { id: "kebab", name: "Iraqi kebab", desc: "Minced lamb over charcoal, with sumac and onion.", price: 10000 },
          { id: "chicken", name: "Chicken tikka", desc: "Chicken breast in yogurt, lemon, and garlic.", price: 9000 },
          { id: "milaq", name: "Mi'laq", desc: "Lamb liver and heart, grilled to order.", price: 8000, tags: ["spicy"] },
          { id: "mixed", name: "Mixed grill tray", desc: "Tikka, kebab, chicken, and mi'laq with rice and starters.", price: 38000, tags: ["share"] },
        ],
      },
      {
        id: "masgouf",
        name: "Masgouf",
        note: "Takes 45 minutes by the wood fire. Order it when you arrive.",
        items: [
          { id: "masgouf", name: "Carp masgouf", desc: "Butterflied carp, grilled upright beside the wood fire. Per kilo.", price: 35000, tags: ["signature", "share"] },
          { id: "masgouf-amba", name: "Masgouf with amba and tomato", desc: "Topped with tomato, onion, and amba for the last ten minutes.", price: 38000, tags: ["share"] },
          { id: "bunni", name: "Grilled bunni fish", desc: "Bunni fish on the skewer with lemon and coriander.", price: 22000 },
        ],
      },
      {
        id: "plates",
        name: "Home plates",
        items: [
          { id: "quzi", name: "Quzi on rice", desc: "Slow-cooked lamb over vermicelli rice with raisins and almonds.", price: 20000, tags: ["signature"] },
          { id: "dolma", name: "Dolma", desc: "Vine leaves, onions, and peppers stuffed with rice and meat, in pomegranate molasses.", price: 9000 },
          { id: "tashreeb", name: "Lamb tashreeb", desc: "Torn bread soaked in lamb broth with chickpeas and dried lime.", price: 9000 },
          { id: "bagilla", name: "Bagilla bil dihin", desc: "Fava beans with ghee and egg. Breakfast, until 2 pm only.", price: 5000, tags: ["veg"] },
        ],
      },
      {
        id: "breakfast",
        name: "Breakfast",
        note: "7 am to noon, Friday and Saturday.",
        items: [
          { id: "kahi", name: "Kahi and geymar", desc: "Flaky pastry with fresh clotted cream and date syrup or honey.", price: 5000, tags: ["veg", "signature"] },
          { id: "makhlama", name: "Makhlama", desc: "Eggs with tomato, onion, and minced lamb.", price: 5500 },
          { id: "aroog", name: "Aroog", desc: "Fried patties of meat, herbs, and spices.", price: 4000 },
        ],
      },
      {
        id: "sides",
        name: "Starters and salads",
        items: [
          { id: "hummus", name: "Hummus with tahini", desc: "With olive oil, cumin, and hot bread.", price: 4000, tags: ["veg"] },
          { id: "salad", name: "Iraqi salad", desc: "Tomato, cucumber, onion, and parsley with lemon.", price: 3000, tags: ["veg"] },
          { id: "torshi", name: "Iraqi torshi", desc: "Turnip, cauliflower, and cucumber pickled with amba.", price: 2000, tags: ["veg", "spicy"] },
          { id: "rice", name: "Anber rice", desc: "Fragrant Iraqi anber rice with vermicelli.", price: 3000, tags: ["veg"] },
        ],
      },
      {
        id: "sweets",
        name: "Sweets and drinks",
        items: [
          { id: "baklava", name: "Zalabia and baklava", desc: "A mixed plate from the market sweet shops.", price: 5000, tags: ["veg"] },
          { id: "chai", name: "Cardamom chai", desc: "In an istikan glass, and the second one is on us.", price: 1000, tags: ["veg"] },
          { id: "ayran", name: "Ayran laban", desc: "Whipped yogurt with salt and mint.", price: 1500, tags: ["veg"] },
          { id: "noomi", name: "Noomi Basra", desc: "Dried lime drink, sour and refreshing.", price: 2500, tags: ["veg"] },
        ],
      },
    ],
  },
  story: {
    kicker: "Our story",
    title: "From a sidewalk grill to the river's favorite",
    lead: "We started with one grill and a box of charcoal. Same marinade, same charcoal, and the same people coming back every Thursday.",
    timeline: [
      { year: "1998", text: "Abu Ali sets up a small grill on the Abu Nuwas sidewalk: tikka and kebab, nothing else." },
      { year: "2006", text: "The first wood-fire masgouf. The Friday queue reaches the bridge." },
      { year: "2015", text: "We open the family floor upstairs and the river terrace." },
      { year: "2024", text: "The second generation takes over the grill, and ordering moves to your phone." },
    ],
    stats: [
      { value: 28, suffix: "", label: "years on the same charcoal" },
      { value: 1200, suffix: "+", label: "skewers grilled every day" },
      { value: 45, suffix: "", label: "minutes for every masgouf" },
      { value: 4, suffix: "", label: "generations of regulars" },
    ],
    quote: "The secret isn't the marinade. It's waiting until the charcoal turns white.",
    quoteBy: "Abu Ali, founder",
  },
  tableMenu: {
    link: "Open the full menu",
    title: "Table menu",
    lead: "Scan the code at your table, pick, and order. No waiting for a waiter.",
    scan: "Scan with your phone camera",
    back: "Home",
    pageTitle: "Dijla Grill menu",
  },
  picks: {
    kicker: "Most ordered",
    title: "Three plates you shouldn't leave without",
    lead: "The ones people keep coming back for since 1998. Tap Add and keep building your order.",
    ids: ["masgouf", "tikka", "quzi"],
  },
  offers: {
    kicker: "House deals",
    title: "Trays for the whole table",
    lead: "Coming as a group? These trays are sized for you, and cost less than ordering one by one.",
    serves: "Serves",
    save: "Save",
    items: [
      {
        id: "offer-family",
        name: "Family tray",
        desc: "Mixed grill, anber rice, salad, hummus, and hot tannour bread.",
        price: 65000,
        was: 78000,
        serves: 4,
        includes: ["8 mixed skewers", "Anber rice", "Salad and hummus", "4 chai"],
      },
      {
        id: "offer-masgouf",
        name: "Masgouf night",
        desc: "1.5 kg masgouf over the wood fire, with amba, tomato, and torshi.",
        price: 58000,
        was: 66000,
        serves: 3,
        includes: ["1.5 kg masgouf", "Anber rice", "Torshi and salad", "Noomi Basra"],
      },
      {
        id: "offer-breakfast",
        name: "Friday breakfast for two",
        desc: "Kahi and geymar, bagilla, makhlama, and cardamom chai until you're done.",
        price: 15000,
        was: 18500,
        serves: 2,
        includes: ["Kahi and geymar", "Bagilla bil dihin", "Makhlama", "Bottomless chai"],
      },
    ],
  },
  cart: {
    open: "Your order",
    title: "Your order",
    empty: "Your order is empty",
    emptyHint: "Pick something from the menu and tap Add.",
    dishes: "items",
    subtotal: "Subtotal",
    delivery: "Delivery",
    deliveryNote: "Within Baghdad, in about 45 minutes.",
    total: "Total",
    type: "How do you want it?",
    types: { pickup: "Pick up", delivery: "Delivery", dinein: "Dine in" },
    name: "Name",
    phone: "Mobile number",
    address: "Address",
    notes: "Notes",
    notesHint: "e.g. no onion, hot amba",
    required: "Required",
    send: "Send order on WhatsApp",
    sendNote: "WhatsApp opens with your order written out. Just tap send.",
    clear: "Clear order",
    msgHello: "Hi Dijla Grill, I'd like to order:",
    msgOrder: "Order",
    msgTotal: "Total",
    msgName: "Name",
    msgPhone: "Mobile",
    msgType: "Type",
    msgAddress: "Address",
    msgNotes: "Notes",
  },
  reserve: {
    kicker: "Book a table",
    title: "By the river, with your name on the table",
    lead: "Pick the day, time, and party size, and we'll confirm on WhatsApp within minutes.",
    date: "Day",
    time: "Time",
    guests: "Guests",
    seating: "Where would you like to sit?",
    seats: { terrace: "River terrace", indoor: "Main hall", family: "Family section" },
    name: "Name",
    phone: "Mobile number",
    notes: "Occasion or special request?",
    send: "Book on WhatsApp",
    note: "Booking is free. We hold the table for 20 minutes.",
    required: "Required",
    msgHello: "Hi Dijla Grill, I'd like to book a table:",
    perks: ["Mention masgouf when booking and it's ready when you arrive", "Birthday cake on us", "Free parking out back"],
  },
  gallery: {
    title: "From charcoal to plate",
    alts: [
      "Grilled meat skewers with tomato, onion, and bread",
      "Meat grilling over glowing charcoal",
      "Grilled skewers with flatbread and grilled vegetables",
      "A plate of hummus with olive oil and bread",
    ],
  },
  visit: {
    title: "Find us on Abu Nuwas",
    lead: "On the riverbank, across from the gardens. Sit outside at night and watch the masgouf grill in front of you.",
    addressTitle: "Address",
    address: "Abu Nuwas Street, near Al-Jumhuriya Bridge, Baghdad",
    directions: "Parking on the back street, and a family seating area upstairs.",
    hoursTitle: "Hours",
    hours: "Every day, noon – 1 am",
    hoursNote: "Breakfast Friday and Saturday from 7 am.",
    call: "Call",
    whatsapp: "Order on WhatsApp",
    map: "Open in Maps",
  },
  footer: {
    tagline: "Baghdadi charcoal grill, since 1998.",
    concept: "Dijla Grill is a fictional restaurant. This site is a design and development concept, and prices are for display only.",
    credit: "Designed and built by Mustafa Shakir",
    photos: "Photos from Unsplash",
  },
};

export const content: Record<Locale, Content> = { ar, en };
