import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  {
    id: 1,
    number: "01",
    title: "Периферийные устройства",
    subtitle: "История и эволюция",
    type: "cover",
    definition: "Периферийные устройства — это аппаратные компоненты, которые подключаются к компьютеру и расширяют его возможности для ввода, вывода и хранения данных.",
    categories: ["Устройства ввода", "Устройства вывода", "Устройства хранения", "Коммуникационные"],
  },
  {
    id: 2,
    number: "02",
    title: "История развития",
    subtitle: "Эволюция периферии по десятилетиям",
    type: "timeline",
    events: [
      { year: "1950-е", text: "Перфокарты и перфоленты — первые носители данных" },
      { year: "1960-е", text: "Появление дисплеев на электронно-лучевых трубках" },
      { year: "1970-е", text: "Первые персональные компьютеры с клавиатурами" },
      { year: "1980-е", text: "Массовое распространение мышей и матричных принтеров" },
      { year: "1990-е", text: "CD-ROM, сканеры, струйные принтеры в каждом доме" },
      { year: "2000-е", text: "USB-стандарт, веб-камеры, беспроводные устройства" },
      { year: "2010-е", text: "Сенсорные экраны, VR-шлемы, 3D-принтеры" },
      { year: "2020-е", text: "Нейроинтерфейсы, голосовые ассистенты, IoT" },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Клавиатуры и ввод",
    subtitle: "От пишущей машинки до нейроинтерфейса",
    type: "evolution",
    items: [
      { era: "1868", name: "Механическая машинка", desc: "Кристофер Шоулз изобрёл раскладку QWERTY" },
      { era: "1970", name: "Клавиатура для ПК", desc: "IBM представила стандартную клавиатуру с 83 клавишами" },
      { era: "1986", name: "IBM Model M", desc: "Легендарная механическая клавиатура с тактильным откликом" },
      { era: "1999", name: "Беспроводные", desc: "Bluetooth и RF-соединение — работа без проводов" },
      { era: "2007", name: "Виртуальная", desc: "Сенсорный ввод на iPhone меняет парадигму" },
      { era: "2024", name: "Нейроинтерфейс", desc: "Управление мыслью — Neuralink и аналоги" },
    ],
  },
  {
    id: 4,
    number: "04",
    title: "Компьютерная мышь",
    subtitle: "От деревянного прототипа до воздушного жеста",
    type: "mouse",
    milestones: [
      { year: "1964", icon: "Mouse", title: "Первый прототип", desc: "Дуглас Энгельбарт создал деревянную мышь с двумя дисками" },
      { year: "1981", icon: "Cpu", title: "Оптико-механическая", desc: "Xerox Alto — первый коммерческий компьютер с мышью" },
      { year: "1991", icon: "Zap", title: "Оптическая мышь", desc: "Отказ от шарика в пользу оптического сенсора" },
      { year: "1999", icon: "Wifi", title: "Беспроводная", desc: "Logitech выпускает первую беспроводную мышь" },
      { year: "2009", icon: "Hand", title: "Мультитач", desc: "Apple Magic Mouse — жесты вместо кнопок" },
      { year: "2020", icon: "ScanLine", title: "3D-трекинг", desc: "Бесконтактное управление жестами в пространстве" },
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Мониторы и дисплеи",
    subtitle: "Эволюция визуального интерфейса",
    type: "displays",
    generations: [
      { name: "ЭЛТ", period: "1960–2000", detail: "Электронно-лучевая трубка. Тяжёлые, глубокие, энергозатратные", color: "#8B7355" },
      { name: "LCD", period: "1990–2010", detail: "Жидкокристаллические матрицы. Тонкие и лёгкие", color: "#4A6741" },
      { name: "LED", period: "2000–н.в.", detail: "Светодиодная подсветка. Яркость и контрастность", color: "#3D5A7A" },
      { name: "OLED", period: "2010–н.в.", detail: "Органические светодиоды. Истинный чёрный цвет", color: "#2C3E50" },
      { name: "MicroLED", period: "2020–н.в.", detail: "Пиксели сами светятся. Будущее дисплеев", color: "#1A1A2E" },
    ],
  },
  {
    id: 6,
    number: "06",
    title: "Печатающие устройства",
    subtitle: "От механизмов к молекулярной печати",
    type: "printers",
    types: [
      { name: "Матричный принтер", year: "1970", icon: "Grid3x3", desc: "Иглы бьют по ленте, формируя символы" },
      { name: "Лазерный принтер", year: "1975", icon: "ScanLine", desc: "Xerox представил технологию сухой печати" },
      { name: "Струйный принтер", year: "1984", icon: "Droplets", desc: "HP ThinkJet — тихая и качественная печать" },
      { name: "Фотопринтер", year: "1995", icon: "Image", desc: "Сублимационная печать фотографий дома" },
      { name: "3D-принтер", year: "2010", icon: "Box", desc: "Послойное создание физических объектов" },
      { name: "Биопринтер", year: "2020", icon: "Dna", desc: "Печать живых тканей клетками" },
    ],
  },
  {
    id: 7,
    number: "07",
    title: "Тенденции и будущее",
    subtitle: "Куда движется периферия",
    type: "future",
    trends: [
      { icon: "Brain", title: "Нейроинтерфейсы", desc: "Прямое подключение мозга к компьютеру без физических устройств" },
      { icon: "Eye", title: "XR и дополненная реальность", desc: "Дисплеи исчезнут — информация в поле зрения" },
      { icon: "Mic", title: "Голосовое управление", desc: "ИИ-ассистенты заменят большинство устройств ввода" },
      { icon: "Fingerprint", title: "Биометрика", desc: "Отпечатки, лицо, сетчатка — тело становится паролем" },
      { icon: "Zap", title: "Беспроводная зарядка", desc: "Провода исчезнут — энергия передаётся по воздуху" },
      { icon: "Globe", title: "Периферия как сервис", desc: "Устройства по подписке с автообновлением прошивок" },
    ],
  },
];

const staggerDelays = ["0.05s", "0.15s", "0.25s", "0.35s", "0.45s", "0.55s", "0.65s", "0.75s"];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (index < 0 || index >= slides.length) return;
      setDirection(dir);
      setAnimKey((k) => k + 1);
      setCurrent(index);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1, "next"), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, "prev"), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FAFAF8] font-ibm flex flex-col select-none">
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes itemFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-enter-next { animation: slideInRight 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .slide-enter-prev { animation: slideInLeft 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .item-in { opacity: 0; animation: itemFadeUp 0.5s ease-out forwards; }
      `}</style>

      {/* Top bar */}
      <div className="flex items-center justify-between px-10 py-4 border-b border-[#E8E5DF] bg-[#FAFAF8]">
        <span className="text-xs tracking-[0.35em] uppercase text-[#B0ADA8] font-ibm font-light">
          Периферийные устройства
        </span>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-7 h-1.5 bg-[#1A1A1A]"
                  : "w-1.5 h-1.5 bg-[#D0CDC7] hover:bg-[#9A9590]"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-[#B0ADA8] font-ibm tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Main slide area */}
      <div className="flex-1 overflow-hidden relative">
        <div
          key={animKey}
          className={`absolute inset-0 ${direction === "next" ? "slide-enter-next" : "slide-enter-prev"}`}
        >
          {slide.type === "cover" && <CoverSlide slide={slide} />}
          {slide.type === "timeline" && <TimelineSlide slide={slide} />}
          {slide.type === "evolution" && <EvolutionSlide slide={slide} />}
          {slide.type === "mouse" && <MouseSlide slide={slide} />}
          {slide.type === "displays" && <DisplaysSlide slide={slide} />}
          {slide.type === "printers" && <PrintersSlide slide={slide} />}
          {slide.type === "future" && <FutureSlide slide={slide} />}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-10 py-4 border-t border-[#E8E5DF] bg-[#FAFAF8]">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 text-sm text-[#9A9590] hover:text-[#1A1A1A] disabled:opacity-25 transition-colors duration-200"
        >
          <Icon name="ArrowLeft" size={15} />
          Назад
        </button>
        <span className="text-xs text-[#D0CDC7] tracking-widest hidden md:block">
          ← → для навигации
        </span>
        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 text-sm text-[#9A9590] hover:text-[#1A1A1A] disabled:opacity-25 transition-colors duration-200"
        >
          Далее
          <Icon name="ArrowRight" size={15} />
        </button>
      </div>
    </div>
  );
}

function SlideHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="mb-7">
      <div className="flex items-baseline gap-4 mb-1">
        <span className="font-cormorant text-6xl font-light text-[#ECEAE6] leading-none">{number}</span>
        <div>
          <h1 className="font-cormorant text-[2rem] font-semibold text-[#1A1A1A] leading-tight">{title}</h1>
          <p className="text-xs text-[#9A9590] font-ibm font-light mt-0.5 tracking-wide">{subtitle}</p>
        </div>
      </div>
      <div className="h-px bg-[#1A1A1A] w-14 mt-3" />
    </div>
  );
}

function CoverSlide({ slide }: { slide: (typeof slides)[0] }) {
  return (
    <div className="h-full flex">
      <div className="flex-1 flex flex-col justify-center px-16 py-14">
        <div className="item-in" style={{ animationDelay: staggerDelays[0] }}>
          <span className="text-xs tracking-[0.4em] uppercase text-[#B0ADA8] font-ibm font-light">Презентация</span>
        </div>
        <div className="item-in mt-5" style={{ animationDelay: staggerDelays[1] }}>
          <h1 className="font-cormorant text-[5rem] font-light text-[#1A1A1A] leading-none">
            {slide.title}
          </h1>
        </div>
        <div className="item-in mt-2" style={{ animationDelay: staggerDelays[2] }}>
          <p className="font-cormorant text-3xl italic font-light text-[#B0ADA8]">
            {slide.subtitle}
          </p>
        </div>
        <div className="item-in mt-8 max-w-lg" style={{ animationDelay: staggerDelays[3] }}>
          <p className="text-sm text-[#6B6560] leading-[1.8] font-ibm font-light">
            {slide.definition}
          </p>
        </div>
        <div className="item-in mt-7 flex flex-wrap gap-2" style={{ animationDelay: staggerDelays[4] }}>
          {slide.categories?.map((cat, i) => (
            <span key={i} className="px-3 py-1 text-xs border border-[#D8D5CF] text-[#6B6560] font-ibm">
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="w-64 flex items-end justify-end p-10 opacity-40">
        <span className="font-cormorant text-[200px] font-light text-[#D8D5CF] leading-none select-none">I</span>
      </div>
    </div>
  );
}

function TimelineSlide({ slide }: { slide: (typeof slides)[0] }) {
  return (
    <div className="h-full flex flex-col px-16 py-10">
      <SlideHeader number={slide.number} title={slide.title} subtitle={slide.subtitle} />
      <div className="flex-1 grid grid-cols-2 gap-x-14 gap-y-4 content-start">
        {slide.events?.map((ev, i) => (
          <div
            key={i}
            className="item-in flex items-start gap-5 group cursor-default"
            style={{ animationDelay: staggerDelays[i] || "0.6s" }}
          >
            <span className="font-cormorant text-xl font-semibold text-[#1A1A1A] w-16 flex-shrink-0 pt-px">
              {ev.year}
            </span>
            <div className="flex-1 border-l border-[#E0DDD7] pl-4 py-1 group-hover:border-[#1A1A1A] transition-colors duration-300">
              <p className="text-sm text-[#6B6560] font-ibm font-light leading-relaxed">{ev.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvolutionSlide({ slide }: { slide: (typeof slides)[0] }) {
  return (
    <div className="h-full flex flex-col px-16 py-10">
      <SlideHeader number={slide.number} title={slide.title} subtitle={slide.subtitle} />
      <div className="flex-1 flex gap-3">
        {slide.items?.map((item, i) => (
          <div
            key={i}
            className="item-in flex-1 flex flex-col justify-between border border-[#E8E5DF] p-4 hover:border-[#1A1A1A] transition-all duration-300 cursor-default group"
            style={{ animationDelay: staggerDelays[i] || "0.6s" }}
          >
            <span className="font-cormorant text-4xl font-light text-[#ECEAE6] group-hover:text-[#D0CDC7] transition-colors duration-300 leading-none">
              {item.era}
            </span>
            <div>
              <h3 className="font-ibm text-xs font-medium text-[#1A1A1A] mb-1">{item.name}</h3>
              <p className="font-ibm text-xs text-[#9A9590] font-light leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MouseSlide({ slide }: { slide: (typeof slides)[0] }) {
  return (
    <div className="h-full flex flex-col px-16 py-10">
      <SlideHeader number={slide.number} title={slide.title} subtitle={slide.subtitle} />
      <div className="flex-1 grid grid-cols-3 gap-4 content-start">
        {slide.milestones?.map((m, i) => (
          <div
            key={i}
            className="item-in flex gap-4 items-start group cursor-default p-4 border border-transparent hover:border-[#E8E5DF] transition-all duration-300"
            style={{ animationDelay: staggerDelays[i] || "0.6s" }}
          >
            <div className="flex-shrink-0 w-9 h-9 border border-[#E0DDD7] flex items-center justify-center group-hover:border-[#1A1A1A] transition-colors duration-300">
              <Icon name={m.icon} fallback="Circle" size={16} className="text-[#B0ADA8] group-hover:text-[#1A1A1A] transition-colors duration-300" />
            </div>
            <div>
              <span className="font-cormorant text-sm font-light text-[#B0ADA8]">{m.year}</span>
              <h3 className="font-ibm text-sm font-medium text-[#1A1A1A]">{m.title}</h3>
              <p className="font-ibm text-xs text-[#9A9590] font-light leading-relaxed mt-0.5">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DisplaysSlide({ slide }: { slide: (typeof slides)[0] }) {
  return (
    <div className="h-full flex flex-col px-16 py-10">
      <SlideHeader number={slide.number} title={slide.title} subtitle={slide.subtitle} />
      <div className="flex-1 flex flex-col justify-center gap-5">
        {slide.generations?.map((gen, i) => (
          <div
            key={i}
            className="item-in flex items-center gap-6 group cursor-default"
            style={{ animationDelay: staggerDelays[i] || "0.6s" }}
          >
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: gen.color }} />
            <span className="font-cormorant text-2xl font-semibold text-[#1A1A1A] w-24 flex-shrink-0">{gen.name}</span>
            <span className="text-xs text-[#B0ADA8] font-ibm w-24 flex-shrink-0">{gen.period}</span>
            <div className="flex-1 h-px bg-[#E8E5DF] group-hover:bg-[#1A1A1A] transition-colors duration-500" />
            <span className="text-sm text-[#6B6560] font-ibm font-light text-right max-w-xs">{gen.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrintersSlide({ slide }: { slide: (typeof slides)[0] }) {
  return (
    <div className="h-full flex flex-col px-16 py-10">
      <SlideHeader number={slide.number} title={slide.title} subtitle={slide.subtitle} />
      <div className="flex-1 grid grid-cols-3 gap-4 content-start">
        {slide.types?.map((t, i) => (
          <div
            key={i}
            className="item-in border border-[#E8E5DF] p-5 hover:border-[#1A1A1A] hover:shadow-sm transition-all duration-300 cursor-default group flex flex-col gap-3"
            style={{ animationDelay: staggerDelays[i] || "0.6s" }}
          >
            <div className="flex items-center justify-between">
              <Icon name={t.icon} fallback="Printer" size={18} className="text-[#C8C5BF] group-hover:text-[#1A1A1A] transition-colors duration-300" />
              <span className="font-cormorant text-2xl font-light text-[#ECEAE6]">{t.year}</span>
            </div>
            <div>
              <h3 className="font-ibm text-sm font-medium text-[#1A1A1A]">{t.name}</h3>
              <p className="font-ibm text-xs text-[#9A9590] font-light leading-relaxed mt-1">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FutureSlide({ slide }: { slide: (typeof slides)[0] }) {
  return (
    <div className="h-full flex flex-col px-16 py-10">
      <SlideHeader number={slide.number} title={slide.title} subtitle={slide.subtitle} />
      <div className="flex-1 grid grid-cols-2 gap-4 content-start">
        {slide.trends?.map((t, i) => (
          <div
            key={i}
            className="item-in flex items-start gap-4 p-5 border border-[#E8E5DF] hover:border-[#1A1A1A] transition-all duration-300 cursor-default group"
            style={{ animationDelay: staggerDelays[i] || "0.6s" }}
          >
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-[#F5F2EE] group-hover:bg-[#1A1A1A] transition-colors duration-300">
              <Icon name={t.icon} fallback="Circle" size={16} className="text-[#9A9590] group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
              <h3 className="font-ibm text-sm font-medium text-[#1A1A1A]">{t.title}</h3>
              <p className="font-ibm text-xs text-[#9A9590] font-light leading-relaxed mt-0.5">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}