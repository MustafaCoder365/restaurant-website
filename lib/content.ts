export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type Tag = "spicy" | "veg" | "signature" | "share";
export type MenuItem = { name: string; desc: string; price: number; tags?: Tag[] };
export type Category = { id: string; name: string; note?: string; items: MenuItem[] };

export type Content = {
  dir: "rtl" | "ltr";
  meta: { title: string; description: string };
  brand: string;
  word: string; // the giant hero word
  nav: { menu: string; build: string; visit: string; order: string };
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
  nav: { menu: "المنيو", build: "لفّة الصمون", visit: "زورونا", order: "اطلب واتساب" },
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
    categories: [
      {
        id: "grill",
        name: "المشويات",
        items: [
          { name: "تكة لحم", desc: "سيخين غنم متبّل، طماطة وبصل مشوي، خبز حار.", price: 12000, tags: ["signature"] },
          { name: "كباب عراقي", desc: "لحم غنم مفروم بالشحم، على الفحم، مع سماق وبصل.", price: 10000 },
          { name: "تكة دجاج", desc: "صدر دجاج بالزبادي والليمون والثوم.", price: 9000 },
          { name: "معلاق", desc: "كبدة وقلب غنم، تنشوي على الطلب.", price: 8000, tags: ["spicy"] },
          { name: "صينية مشكّل", desc: "تكة وكباب ودجاج ومعلاق، مع رز ومقبلات.", price: 38000, tags: ["share"] },
        ],
      },
      {
        id: "masgouf",
        name: "المسگوف",
        note: "يحتاج ٤٥ دقيقة على الحطب. اطلبه أول ما توصل.",
        items: [
          { name: "مسگوف كارب", desc: "سمكة شبوط مفتوحة، تنشوي واقفة جنب الحطب. للكيلو.", price: 35000, tags: ["signature", "share"] },
          { name: "مسگوف بالعمبة والطماطة", desc: "نفس المسگوف، مغطّى بطماطة وبصل وعمبة بآخر عشر دقايق.", price: 38000, tags: ["share"] },
          { name: "سمك بُنّي مشوي", desc: "قطع سمك بُنّي على السيخ مع ليمون وكزبرة.", price: 22000 },
        ],
      },
      {
        id: "plates",
        name: "أكلات البيت",
        items: [
          { name: "قوزي على تمّن", desc: "لحم غنم مطبوخ ساعات، على رز بالشعرية والكشمش واللوز.", price: 20000, tags: ["signature"] },
          { name: "دولمة", desc: "ورق عنب وبصل وفلفل محشي بالرز واللحم، بدبس الرمان.", price: 9000 },
          { name: "تشريب لحم", desc: "خبز مقطّع منقوع بمرق اللحم والحمّص والنومي بصرة.", price: 9000 },
          { name: "باگلة بالدهن", desc: "فول أخضر بالدهن الحر والبيض، فطور بس للساعة ٢.", price: 5000, tags: ["veg"] },
        ],
      },
      {
        id: "breakfast",
        name: "فطور",
        note: "من ٧ الصبح لحد ١٢ الظهر، الجمعة والسبت.",
        items: [
          { name: "كاهي وگيمر", desc: "معجنات مقرمشة بالقيمر الطازج والدبس أو العسل.", price: 5000, tags: ["veg", "signature"] },
          { name: "مخلمة", desc: "بيض بالطماطة والبصل واللحم المثروم.", price: 5500 },
          { name: "عروك", desc: "أقراص مقلية باللحم والخضرة والبهارات.", price: 4000 },
        ],
      },
      {
        id: "sides",
        name: "مقبلات وسلطات",
        items: [
          { name: "حمّص بالطحينة", desc: "مع زيت زيتون وكمّون وخبز حار.", price: 4000, tags: ["veg"] },
          { name: "سلطة عراقية", desc: "طماطة وخيار وبصل وبقدونس بالليمون.", price: 3000, tags: ["veg"] },
          { name: "طرشي عراقي", desc: "شلغم وقرنابيط وخيار مخلّل بالعمبة.", price: 2000, tags: ["veg", "spicy"] },
          { name: "تمّن عنبر", desc: "رز عنبر عراقي بالشعرية.", price: 3000, tags: ["veg"] },
        ],
      },
      {
        id: "sweets",
        name: "حلويات ومشروبات",
        items: [
          { name: "زلابية وبقلاوة", desc: "صحن مشكّل من حلويات السوق.", price: 5000, tags: ["veg"] },
          { name: "چاي مهيّل", desc: "باستكان، مع ثاني واحد على حسابنا.", price: 1000, tags: ["veg"] },
          { name: "لبن عيران", desc: "لبن مخفوق بالملح والنعناع.", price: 1500, tags: ["veg"] },
          { name: "عصير نومي بصرة", desc: "ليمون مجفف، حامض ومنعش.", price: 2500, tags: ["veg"] },
        ],
      },
    ],
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
  nav: { menu: "Menu", build: "The samoon", visit: "Visit", order: "Order on WhatsApp" },
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
    categories: [
      {
        id: "grill",
        name: "Grill",
        items: [
          { name: "Lamb tikka", desc: "Two skewers of marinated lamb, grilled tomato and onion, hot bread.", price: 12000, tags: ["signature"] },
          { name: "Iraqi kebab", desc: "Minced lamb over charcoal, with sumac and onion.", price: 10000 },
          { name: "Chicken tikka", desc: "Chicken breast in yogurt, lemon, and garlic.", price: 9000 },
          { name: "Mi'laq", desc: "Lamb liver and heart, grilled to order.", price: 8000, tags: ["spicy"] },
          { name: "Mixed grill tray", desc: "Tikka, kebab, chicken, and mi'laq with rice and starters.", price: 38000, tags: ["share"] },
        ],
      },
      {
        id: "masgouf",
        name: "Masgouf",
        note: "Takes 45 minutes by the wood fire. Order it when you arrive.",
        items: [
          { name: "Carp masgouf", desc: "Butterflied carp, grilled upright beside the wood fire. Per kilo.", price: 35000, tags: ["signature", "share"] },
          { name: "Masgouf with amba and tomato", desc: "Topped with tomato, onion, and amba for the last ten minutes.", price: 38000, tags: ["share"] },
          { name: "Grilled bunni fish", desc: "Bunni fish on the skewer with lemon and coriander.", price: 22000 },
        ],
      },
      {
        id: "plates",
        name: "Home plates",
        items: [
          { name: "Quzi on rice", desc: "Slow-cooked lamb over vermicelli rice with raisins and almonds.", price: 20000, tags: ["signature"] },
          { name: "Dolma", desc: "Vine leaves, onions, and peppers stuffed with rice and meat, in pomegranate molasses.", price: 9000 },
          { name: "Lamb tashreeb", desc: "Torn bread soaked in lamb broth with chickpeas and dried lime.", price: 9000 },
          { name: "Bagilla bil dihin", desc: "Fava beans with ghee and egg. Breakfast, until 2 pm only.", price: 5000, tags: ["veg"] },
        ],
      },
      {
        id: "breakfast",
        name: "Breakfast",
        note: "7 am to noon, Friday and Saturday.",
        items: [
          { name: "Kahi and geymar", desc: "Flaky pastry with fresh clotted cream and date syrup or honey.", price: 5000, tags: ["veg", "signature"] },
          { name: "Makhlama", desc: "Eggs with tomato, onion, and minced lamb.", price: 5500 },
          { name: "Aroog", desc: "Fried patties of meat, herbs, and spices.", price: 4000 },
        ],
      },
      {
        id: "sides",
        name: "Starters and salads",
        items: [
          { name: "Hummus with tahini", desc: "With olive oil, cumin, and hot bread.", price: 4000, tags: ["veg"] },
          { name: "Iraqi salad", desc: "Tomato, cucumber, onion, and parsley with lemon.", price: 3000, tags: ["veg"] },
          { name: "Iraqi torshi", desc: "Turnip, cauliflower, and cucumber pickled with amba.", price: 2000, tags: ["veg", "spicy"] },
          { name: "Anber rice", desc: "Fragrant Iraqi anber rice with vermicelli.", price: 3000, tags: ["veg"] },
        ],
      },
      {
        id: "sweets",
        name: "Sweets and drinks",
        items: [
          { name: "Zalabia and baklava", desc: "A mixed plate from the market sweet shops.", price: 5000, tags: ["veg"] },
          { name: "Cardamom chai", desc: "In an istikan glass, and the second one is on us.", price: 1000, tags: ["veg"] },
          { name: "Ayran laban", desc: "Whipped yogurt with salt and mint.", price: 1500, tags: ["veg"] },
          { name: "Noomi Basra", desc: "Dried lime drink, sour and refreshing.", price: 2500, tags: ["veg"] },
        ],
      },
    ],
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
