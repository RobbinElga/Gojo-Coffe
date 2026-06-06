"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, type Variants } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  ChevronDown,
  Clock,
  Coffee,
  GraduationCap,
  Camera,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Sparkles,
  Star,
  Wifi,
  X,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

const navItems = ["Beranda", "Tentang", "Menu", "Promo", "Galeri", "Lokasi", "FAQ"];

const menuItems = [
  ["Coffee", "Gojo Signature Latte", "Espresso, vanilla silk, violet cream.", "Rp 32K", "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80"],
  ["Coffee", "Purple Matcha Latte", "Matcha ceremonial dengan espresso shot.", "Rp 35K", "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=900&q=80"],
  ["Coffee", "Espresso Supreme", "Double shot pekat dengan crema lembut.", "Rp 24K", "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=900&q=80"],
  ["Coffee", "Kyoto Mocha", "Dark chocolate, espresso, steamed milk.", "Rp 34K", "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=80"],
  ["Coffee", "Tokyo Americano", "Clean, bright, long black style.", "Rp 25K", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"],
  ["Non Coffee", "Sakura Milk", "Susu creamy dengan aroma sakura ringan.", "Rp 29K", "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=900&q=80"],
  ["Non Coffee", "Purple Taro", "Taro premium, milk foam, lavender dust.", "Rp 31K", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80"],
  ["Non Coffee", "Strawberry Cloud", "Strawberry, cream cloud, fresh milk.", "Rp 33K", "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=900&q=80"],
  ["Non Coffee", "Chocolate Zen", "Cokelat Belgia dengan hint sea salt.", "Rp 32K", "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80"],
  ["Tea", "Matcha Premium", "Matcha Jepang, rasa vegetal elegan.", "Rp 34K", "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80"],
  ["Tea", "Hojicha Latte", "Roasted green tea, creamy, nutty.", "Rp 33K", "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?auto=format&fit=crop&w=900&q=80"],
  ["Tea", "Genmaicha Tea", "Green tea beras panggang yang hangat.", "Rp 27K", "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80"],
  ["Dessert", "Japanese Cheesecake", "Ringan, fluffy, dengan yuzu glaze.", "Rp 38K", "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80"],
  ["Dessert", "Mochi Ice Cream", "Mochi lembut isi gelato musiman.", "Rp 30K", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80"],
  ["Dessert", "Matcha Roll Cake", "Sponge matcha, cream mascarpone.", "Rp 36K", "https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=900&q=80"],
];

const gallery = [
  ["Interior cafe", "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80", "row-span-2"],
  ["Area kerja", "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80", ""],
  ["Barista", "https://images.unsplash.com/photo-1513267048331-5611cad62e41?auto=format&fit=crop&w=900&q=80", "row-span-2"],
  ["Minuman", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80", ""],
  ["Dessert", "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80", ""],
  ["Area outdoor", "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=900&q=80", "md:col-span-2"],
];

const testimonials = [
  ["Raka Pratama", "Tempatnya terasa premium, tenang, dan kopinya serius enak. Cocok banget buat kerja malam.", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"],
  ["Maya Tanaka", "Interiornya clean seperti studio modern Jepang. Purple Matcha Latte wajib dicoba.", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"],
  ["Dimas Arya", "WiFi cepat, playlist enak, staff ramah. Rasanya seperti cafe startup di Pontianak.", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"],
];

const faqs = [
  ["Apakah tersedia WiFi?", "Ya, Gojo Coffee menyediakan WiFi cepat untuk bekerja, meeting ringan, atau belajar."],
  ["Apakah bisa reservasi tempat?", "Bisa. Hubungi 08xxxxxxxxxx untuk reservasi grup atau kebutuhan khusus."],
  ["Apakah tersedia minuman non kopi?", "Tersedia pilihan non coffee seperti Sakura Milk, Purple Taro, Strawberry Cloud, dan Chocolate Zen."],
  ["Apakah tersedia area merokok?", "Tersedia area outdoor terpisah agar pengunjung lain tetap nyaman."],
  ["Apakah menerima pembayaran cashless?", "Ya, kami menerima QRIS, kartu debit, dan metode cashless populer."],
];

const heroStats = [
  { value: "15+", label: "Menu", icon: Coffee },
  { value: "07:00-00:00", label: "Buka", icon: Clock },
  { value: "4.9", label: "Rating", icon: Star },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: smoothEase } },
};

function MagneticButton({ children, href, variant = "primary" }: { children: React.ReactNode; href: string; variant?: "primary" | "secondary" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15 });
  const sy = useSpring(y, { stiffness: 180, damping: 15 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(event) => {
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        x.set((event.clientX - box.left - box.width / 2) * 0.18);
        y.set((event.clientY - box.top - box.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`cursor-hover group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition ${variant === "primary"
        ? "bg-[#1c1e54] text-white shadow-[0_18px_45px_rgba(83,58,253,.34)] hover:bg-[#533afd] hover:shadow-[0_24px_80px_rgba(83,58,253,.42)]"
        : "border border-[#533afd]/15 bg-white/70 text-[#1c1e54] shadow-[0_12px_35px_rgba(28,30,84,.08)] backdrop-blur-xl hover:border-[#533afd]/35"
        }`}
    >
      {children}
      <ArrowRight size={16} className="transition group-hover:translate-x-1" />
    </motion.a>
  );
}

function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(timeout);
  }, []);
  if (!visible) return null;
  return (
    <motion.div className="page-gradient fixed inset-0 z-[100] grid place-items-center" exit={{ opacity: 0 }}>
      <div className="relative flex flex-col items-center">
        <div className="loader-orbit" />
        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 grid h-28 w-28 place-items-center rounded-full bg-white shadow-[0_25px_90px_rgba(83,58,253,.24)]">
          <Coffee className="text-[#1c1e54]" size={34} />
        </motion.div>
        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.28em] text-[#1c1e54]">Gojo Coffee</p>
        <div className="mt-5 h-1 w-56 overflow-hidden rounded-full bg-[#e7e0ff]">
          <motion.div className="h-full rounded-full bg-[#1c1e54]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1, ease: "easeInOut" }} />
        </div>
      </div>
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <nav className={`mx-auto flex w-[min(1200px,calc(100%-32px))] items-center justify-between rounded-full px-4 transition-all duration-500 ${scrolled ? "border border-white/70 bg-white/72 shadow-[0_16px_50px_rgba(28,30,84,.12)] backdrop-blur-2xl" : "bg-white/25 backdrop-blur-sm"}`}>
        <a href="#beranda" className="flex items-center gap-3 py-2">
          <span className={`grid place-items-center rounded-full bg-[#1c1e54] text-white transition-all ${scrolled ? "h-9 w-9" : "h-11 w-11"}`}><Coffee size={18} /></span>
          <span className="text-sm font-bold text-[#1c1e54]">Gojo Coffee</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm font-medium text-[#39506b] transition hover:bg-white/75 hover:text-[#533afd]">
              {item}
            </a>
          ))}
        </div>
        <a href="#lokasi" className="cursor-hover hidden rounded-full bg-[#1c1e54] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(28,30,84,.22)] transition hover:bg-[#533afd] md:block">Kunjungi Cafe</a>
        <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full bg-white lg:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </nav>
      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-3 grid w-[min(420px,calc(100%-32px))] gap-1 rounded-3xl border border-white/70 bg-white/90 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
          {navItems.map((item) => <a onClick={() => setOpen(false)} key={item} href={`#${item.toLowerCase()}`} className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#1c1e54] hover:bg-[#f5f2ff]">{item}</a>)}
        </motion.div>
      )}
    </motion.header>
  );
}

function Hero() {
  return (
    <section id="beranda" className="mesh relative flex min-h-screen items-center overflow-hidden px-4 pt-28">
      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-14 py-16 lg:grid-cols-[1.02fr_.98fr]">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
          <motion.h1 variants={fadeUp} className="mt-7 max-w-4xl text-balance text-5xl font-light leading-[1.04] tracking-[-0.045em] text-[#0d253d] sm:text-6xl lg:text-7xl">
            Menikmati Kopi dengan Pengalaman yang Berbeda
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-[#39506b]">Gojo Coffee menghadirkan perpaduan suasana Jepang modern, kopi berkualitas, dan ruang nyaman untuk bekerja, bersantai, maupun berkumpul bersama teman.</motion.p>
          <motion.p variants={fadeUp} className="mt-5 text-2xl font-light italic tracking-[-0.02em] text-[#533afd]">&quot;Nah, I&apos;d Win&quot;</motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#menu">Lihat Menu</MagneticButton>
            <MagneticButton href="#lokasi" variant="secondary">Lihat Lokasi</MagneticButton>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.25 }} className="relative">
          <div className="hero-image cursor-hover relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_24px_70px_rgba(28,30,84,.14)]">
            <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1100&q=85" alt="Interior premium Gojo Coffee" />
          </div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mt-5 rounded-[1.5rem] border border-white/70 bg-white/90 p-3 shadow-[0_18px_55px_rgba(83,58,253,.24)]">
            <div className="grid grid-cols-3 gap-2">
              {heroStats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="rounded-[1.15rem] bg-white/92 px-3 py-4 text-center">
                  <Icon className="mx-auto text-[#533afd]" size={17} />
                  <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[#0d253d]">{value}</p>
                  <p className="text-[11px] font-medium text-[#65758b]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#533afd]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-light tracking-[-0.045em] text-[#0d253d] sm:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-8 text-[#5b6b7f]">{text}</p>}
    </motion.div>
  );
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const numeric = Number.parseFloat(value);
  const [count, setCount] = useState(0);
  return (
    <motion.div onViewportEnter={() => {
      let frame = 0;
      const id = window.setInterval(() => {
        frame += 1;
        setCount(Math.min(numeric, (numeric / 42) * frame));
        if (frame >= 42) window.clearInterval(id);
      }, 24);
    }} className="cursor-hover rounded-3xl border border-white/80 bg-white/70 p-7 text-center shadow-[0_18px_60px_rgba(28,30,84,.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(83,58,253,.18)]">
      <div className="text-4xl font-light tracking-[-0.04em] text-[#533afd]">{value.includes(".") ? count.toFixed(1) : Math.round(count)}{value.replace(/[0-9.]/g, "")}</div>
      <p className="mt-2 text-sm font-semibold text-[#39506b]">{label}</p>
    </motion.div>
  );
}

function AboutAndStats() {
  return (
    <>
      <section id="tentang" className="page-gradient px-4 py-28">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative overflow-hidden rounded-[2rem] shadow-[0_35px_90px_rgba(28,30,84,.14)]">
            <img className="aspect-[4/3] w-full object-cover" src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1100&q=85" alt="Interior modern Gojo Coffee" />
            <div className="absolute bottom-5 right-5 max-w-[220px] rounded-2xl border border-white/60 bg-white/78 p-5 shadow-xl backdrop-blur-xl"><Sparkles className="text-[#533afd]" /><p className="mt-3 text-sm font-bold text-[#1c1e54]">Japanese calm, startup energy.</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#533afd]">Tentang Gojo Coffee</p>
            <h2 className="mt-4 text-4xl font-light tracking-[-0.045em] text-[#0d253d] sm:text-6xl">Cafe Jepang modern untuk ritme Pontianak.</h2>
            <p className="mt-6 text-lg leading-8 text-[#5b6b7f]">Kami membangun ruang yang terasa presisi, tenang, dan sedikit futuristik. Setiap detail dari bar, pencahayaan, sampai menu dirancang agar kopi terasa seperti pengalaman, bukan rutinitas.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[[Coffee, "Kopi Berkualitas"], [Wifi, "WiFi Cepat"], [Sparkles, "Suasana Nyaman"]].map(([Icon, label]) => (
                <div key={String(label)} className="cursor-hover rounded-3xl border border-[#533afd]/10 bg-[#f5f2ff] p-5 transition hover:border-[#533afd]/30 hover:bg-white hover:shadow-xl">
                  <Icon className="text-[#533afd]" size={22} />
                  <p className="mt-4 text-sm font-bold text-[#1c1e54]">{String(label)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <section className="page-gradient relative px-4 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {["15+|Menu Pilihan", "5000+|Pelanggan", "4.9|Rating", "365|Hari Melayani"].map((item) => {
            const [value, label] = item.split("|");
            return <StatCounter key={item} value={value} label={label} />;
          })}
        </div>
      </section>
    </>
  );
}

function MenuSection() {
  const [active, setActive] = useState("Coffee");
  const categories = ["Coffee", "Non Coffee", "Tea", "Dessert"];
  const filtered = useMemo(() => menuItems.filter(([category]) => category === active), [active]);

  return (
    <section id="menu" className="page-gradient px-4 py-28">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading eyebrow="Menu" title="Curated drinks, precise mood." text="Lima belas pilihan menu dengan rasa familiar, sentuhan Jepang, dan visual yang terasa premium." />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button key={category} onClick={() => setActive(category)} className={`cursor-hover rounded-full px-5 py-3 text-sm font-bold transition ${active === category ? "bg-[#1c1e54] text-white shadow-[0_16px_40px_rgba(83,58,253,.28)]" : "bg-[#f5f2ff] text-[#39506b] hover:bg-white hover:shadow-lg"}`}>{category}</button>
          ))}
        </div>
        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <motion.article layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} key={item[1]} className="menu-card cursor-hover group overflow-hidden rounded-[1.75rem] border border-[#e6edf6] bg-white shadow-[0_16px_50px_rgba(28,30,84,.08)] transition duration-500 hover:-translate-y-2 hover:border-[#533afd]/35 hover:shadow-[0_28px_90px_rgba(83,58,253,.2)]">
              <div className="aspect-[4/3] overflow-hidden"><img src={item[4]} alt={item[1]} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" /></div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#0d253d]">{item[1]}</h3>
                  <span className="price-glow rounded-full bg-[#ebe6ff] px-3 py-1 text-sm font-black text-[#533afd]">{item[3]}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#5b6b7f]">{item[2]}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PromoGalleryTestimonials() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <>
      <section id="promo" className="page-gradient px-4 py-28">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading eyebrow="Promo" title="Deals yang tetap terlihat mahal." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[[Coffee, "Beli 2 Gratis 1"], [GraduationCap, "Diskon Mahasiswa 15%"], [BadgePercent, "Happy Hour Diskon 20%"]].map(([Icon, title]) => (
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} key={String(title)} className="cursor-hover promo-card rounded-[1.75rem] p-[1px]">
                <div className="h-full rounded-[1.7rem] bg-white/75 p-8 backdrop-blur-xl">
                  <Icon className="text-[#533afd]" size={30} />
                  <h3 className="mt-8 text-2xl font-light tracking-[-0.04em] text-[#0d253d]">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5b6b7f]">Nikmati promo spesial langsung di Gojo Coffee. Berlaku untuk dine-in dan mengikuti ketersediaan harian.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="galeri" className="page-gradient px-4 py-28">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading eyebrow="Galeri" title="A place with a point of view." />
          <div className="mt-12 grid auto-rows-[230px] gap-5 md:grid-cols-3">
            {gallery.map(([label, src, span]) => (
              <button key={label} onClick={() => setLightbox(src)} className={`cursor-hover group relative overflow-hidden rounded-[1.5rem] text-left shadow-[0_18px_60px_rgba(28,30,84,.1)] ${span}`}>
                <img src={src} alt={label} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0d253d]/70 to-transparent opacity-70" />
                <span className="absolute bottom-5 left-5 text-sm font-bold text-white">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="page-gradient overflow-hidden px-4 py-24">
        <SectionHeading eyebrow="Testimonial" title="Dipercaya orang yang butuh ruang lebih baik." />
        <div className="mx-auto mt-12 max-w-[1200px] overflow-hidden">
          <motion.div className="flex gap-6" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
            {[...testimonials, ...testimonials].map(([name, text, img], index) => (
              <div key={`${name}-${index}`} className="min-w-[330px] rounded-[1.75rem] border border-white/80 bg-white/80 p-7 shadow-[0_18px_60px_rgba(28,30,84,.08)] backdrop-blur-xl sm:min-w-[420px]">
                <div className="flex items-center gap-4"><img src={img} alt={name} className="h-12 w-12 rounded-full object-cover" /><div><p className="font-bold text-[#0d253d]">{name}</p><div className="mt-1 flex text-[#533afd]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div></div></div>
                <p className="mt-5 text-sm leading-7 text-[#5b6b7f]">&quot;{text}&quot;</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      {lightbox && <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[90] grid cursor-zoom-out place-items-center bg-[#0d253d]/85 p-4 backdrop-blur-md"><img src={lightbox} alt="Preview galeri Gojo Coffee" className="max-h-[86vh] max-w-[min(100%,1100px)] rounded-3xl object-contain shadow-2xl" /></div>}
    </>
  );
}

function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let map: import("leaflet").Map | null = null;
    let disposed = false;
    import("leaflet").then((L) => {
      if (!mapRef.current || disposed) return;
      const coords: [number, number] = [-0.0279, 109.3425];
      map = L.map(mapRef.current, { zoomControl: false, scrollWheelZoom: false }).setView(coords, 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap" }).addTo(map);
      const icon = L.divIcon({ className: "gojo-marker", html: "<span></span>", iconSize: [34, 34], iconAnchor: [17, 17] });
      L.marker(coords, { icon }).addTo(map).bindPopup("<b>Gojo Coffee</b><br>Pontianak Kota, Kalimantan Barat");
    });
    return () => {
      disposed = true;
      map?.remove();
    };
  }, []);
  return <div ref={mapRef} className="h-[430px] w-full rounded-[1.75rem]" />;
}

function LocationFaqFooter() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section id="lokasi" className="page-gradient px-4 py-28">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-[1.75rem] border border-[#e8e0ff] bg-[#f5f2ff] p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#533afd]">Lokasi</p>
            <h2 className="mt-4 text-4xl font-light tracking-[-0.045em] text-[#0d253d]">Datang ke Gojo Coffee.</h2>
            <div className="mt-8 grid gap-5 text-[#39506b]">
              <p className="flex gap-3"><MapPin className="text-[#533afd]" /> Gojo Coffee, Pontianak Kota, Kalimantan Barat</p>
              <p className="flex gap-3"><Clock className="text-[#533afd]" /> 07.00 - 00.00 WIB</p>
              <p className="flex gap-3"><Phone className="text-[#533afd]" /> 08xxxxxxxxxx</p>
              <p></p>
            </div>
            <MagneticButton href="https://www.openstreetmap.org/directions?to=-0.0279%2C109.3425">Lihat Rute</MagneticButton>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="overflow-hidden rounded-[1.9rem] border border-[#e6edf6] p-2 shadow-[0_30px_90px_rgba(28,30,84,.12)]">
            <LocationMap />
          </motion.div>
        </div>
      </section>
      <section id="faq" className="page-gradient px-4 py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Pertanyaan sebelum berangkat." />
          <div className="mt-10 grid gap-4">
            {faqs.map(([q, a], index) => (
              <motion.div layout key={q} className="rounded-3xl border border-white/80 bg-white/75 shadow-[0_12px_40px_rgba(28,30,84,.07)] backdrop-blur-xl">
                <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left font-bold text-[#0d253d]">
                  {q}<motion.span animate={{ rotate: open === index ? 180 : 0 }}><ChevronDown size={18} /></motion.span>
                </button>
                <motion.div initial={false} animate={{ height: open === index ? "auto" : 0, opacity: open === index ? 1 : 0 }} className="overflow-hidden px-6">
                  <p className="pb-6 text-sm leading-7 text-[#5b6b7f]">{a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className="footer px-4 py-14 text-[#ffffff]">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-4 text-[#ffffff]">
          <div><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#1c1e54] text-white"><Coffee size={18} /></span><b>Gojo Coffee</b></div><p className="mt-4 text-sm leading-7 text-[#]">Premium startup website yang kebetulan menjual kopi.</p></div>
          <div><b>Menu</b><div className="mt-4 grid gap-2 text-sm text-[#ffffff]">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</div></div>
          <div><b>Kontak</b><div className="mt-4 grid gap-2 text-sm text-[#ffffff]"><span>08xxxxxxxxxx</span><span>Pontianak, Kalimantan Barat</span><span>07.00 - 00.00 WIB</span></div></div>
          <div><b>Media Sosial</b><div className="mt-4 flex gap-3"><a className="grid h-10 w-10 place-items-center rounded-full bg-[#533afd]/10 text-[#fffff]" href="#"><Camera size={18} /></a><a className="grid h-10 w-10 place-items-center rounded-full bg-[#533afd]/10 text-[#ffff]" href="#"><Navigation size={18} /></a></div></div>
        </div>
        <div className="mx-auto mt-12 max-w-[1200px] border-t border-[#533afd]/15 pt-6 text-sm text-[#fffff]">© 2026 Gojo Coffee by Elga Firmantara</div>
      </footer>
    </>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 24 });
  return (
    <>
      <LoadingScreen />
      <motion.div className="fixed left-0 top-0 z-[70] h-1 origin-left bg-[#533afd]" style={{ scaleX }} />
      <Navbar />
      <main>
        <Hero />
        <AboutAndStats />
        <MenuSection />
        <PromoGalleryTestimonials />
        <LocationFaqFooter />
      </main>
    </>
  );
}
