'use client';

import { FormEvent, useMemo, useState } from 'react';
import {
  BadgeCheck,
  Ban,
  Check,
  CircleCheckBig,
  Droplets,
  FlaskConical,
  Headphones,
  Home as HomeIcon,
  Leaf,
  LockKeyhole,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  UserRound,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const heroBenefits = [
  { label: 'ترطيب عميق', icon: Droplets },
  { label: 'يحسن مرونة البشرة', icon: Sparkles },
  { label: 'يقلل التجاعيد والخطوط الدقيقة', icon: ShieldCheck },
  { label: 'مكونات طبيعية 100%', icon: Leaf },
];

const heroTrustItems = [
  { label: 'توصيل سريع لجميع المدن', icon: Truck },
  { label: 'الدفع عند الاستلام', icon: PackageCheck },
  { label: 'منتج أصلي مضمون', icon: BadgeCheck },
];

const problemCards = [
  {
    image: '/media/problem-dryness.webp',
    title: 'جفاف البشرة',
    description: 'تعانين من جفاف البشرة وشعورها بالشد بعد الغسل',
  },
  {
    image: '/media/problem-wrinkles.webp',
    title: 'التجاعيد والخطوط الدقيقة',
    description: 'تظهر الخطوط حول العينين والجبين والفم',
  },
  {
    image: '/media/problem-elasticity.webp',
    title: 'فقدان مرونة البشرة',
    description: 'تبدأ البشرة بالترهل وتفقد مظهرها المشدود',
  },
  {
    image: '/media/problem-tone.webp',
    title: 'البقع وعدم توحد اللون',
    description: 'تظهر البقع الداكنة ويصبح اللون باهتاً وغير متجانس',
  },
];

const whyBenefits = [
  'ترطيب عميق يدوم 24 ساعة',
  'يقلل ظهور التجاعيد والخطوط الدقيقة',
  'يحسن مرونة البشرة ويشدها',
  'يغذي البشرة بفيتامين E المضاد للأكسدة',
  'يجعل البشرة ناعمة، مشرقة وموحدة اللون',
  'مناسب لجميع أنواع البشرة',
];

const sideBenefits = [
  { label: 'مختبر ومختبر جلدياً', icon: FlaskConical },
  { label: 'مكونات طبيعية 100%', icon: Leaf },
  { label: 'خالي من البارابين والملونات', icon: Ban },
  { label: 'صنع في المغرب', icon: Star },
];

const offers = [
  {
    quantity: 1,
    name: 'عبوة واحدة',
    detail: '50ml',
    price: 199,
    oldPrice: 299,
    saving: 100,
    image: '/media/offer-1.webp',
  },
  {
    quantity: 2,
    name: 'عبوتين',
    detail: '50ml لكل عبوة',
    price: 299,
    oldPrice: 598,
    saving: 299,
    image: '/media/offer-2.webp',
    popular: true,
  },
  {
    quantity: 3,
    name: 'ثلاث عبوات',
    detail: '50ml لكل عبوة',
    price: 399,
    oldPrice: 897,
    saving: 498,
    image: '/media/offer-3.webp',
  },
];

const reassurance = [
  {
    title: 'توصيل سريع',
    text: 'إلى جميع المدن المغربية',
    icon: Truck,
  },
  {
    title: 'الدفع عند الاستلام',
    text: 'ادفعي بعد استلام المنتج',
    icon: PackageCheck,
  },
  {
    title: 'منتج أصلي 100%',
    text: 'جودة مضمونة',
    icon: BadgeCheck,
  },
  {
    title: 'ضمان الرضا',
    text: 'إذا لم تكوني راضية',
    icon: ShieldCheck,
  },
];

const testimonials = [
  {
    image: '/media/testimonial-1.webp',
    name: 'فاطمة م.',
    city: 'الرباط',
    text: 'من أول استعمال لاحظت بشرتي مرتبة ورطبة، والقوام لطيف.',
  },
  {
    image: '/media/testimonial-2.webp',
    name: 'نوال ع.',
    city: 'مراكش',
    text: 'البشرة أصبحت أكثر إشراقاً ونضارة، والروتين اليومي صار أبسط.',
  },
  {
    image: '/media/testimonial-3.webp',
    name: 'سارة ب.',
    city: 'فاس',
    text: 'رائحة جميلة ونتيجة مريحة، البشرة صارت أنعم مع الاستعمال.',
  },
];

const faqs = [
  {
    id: 'skin-types',
    question: 'هل المنتج مناسب لجميع أنواع البشرة؟',
    answer:
      'نعم، صُممت التركيبة لتناسب مختلف أنواع البشرة. للبشرة شديدة الحساسية، يُفضّل اختبار كمية صغيرة أولاً.',
  },
  {
    id: 'results',
    question: 'متى تظهر النتائج؟',
    answer:
      'يختلف ذلك حسب طبيعة البشرة وانتظام الاستعمال. يظهر الإحساس بالترطيب سريعاً، بينما تحتاج العناية بالمظهر العام إلى استعمال منتظم.',
  },
  {
    id: 'routine',
    question: 'هل يمكن استعماله مع مستحضرات أخرى؟',
    answer:
      'يمكن إدخاله ضمن روتين العناية المعتاد بعد تنظيف البشرة، مع ترك كل منتج يمتص قبل وضع المنتج التالي.',
  },
  {
    id: 'ingredients',
    question: 'هل يحتوي على مواد كيميائية ضارة؟',
    answer:
      'المنتج خالٍ من البارابين والملونات وفق معلومات المنتج المقدمة. راجعي دائماً لائحة المكونات على العبوة إذا كانت لديك حساسية معروفة.',
  },
];

type FormErrors = Partial<
  Record<'fullName' | 'phone' | 'city' | 'address', string>
>;

type SubmittedOrder = {
  reference: string;
  customer: string;
  quantity: number;
  price: number;
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-3 text-center">
      <span className="h-px w-9 bg-gradient-to-l from-[#c57a0a] to-transparent" />
      <h2 className="text-[1.35rem] font-black text-[#35251d] sm:text-[1.65rem]">
        {children}
      </h2>
      <span className="h-px w-9 bg-gradient-to-r from-[#c57a0a] to-transparent" />
    </div>
  );
}

export default function Home() {
  const [selectedQuantity, setSelectedQuantity] = useState(2);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(
    null,
  );

  const selectedOffer = useMemo(
    () => offers.find((offer) => offer.quantity === selectedQuantity)!,
    [selectedQuantity],
  );

  const scrollToOrder = () => {
    document.getElementById('commande')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const clearError = (field: keyof FormErrors) => {
    setFormErrors((current) => ({ ...current, [field]: undefined }));
    setSubmittedOrder(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get('fullName') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const city = String(data.get('city') ?? '').trim();
    const address = String(data.get('address') ?? '').trim();
    const normalizedPhone = phone.replace(/[\s()-]/g, '');
    const errors: FormErrors = {};

    if (fullName.length < 2) {
      errors.fullName = 'يرجى إدخال الاسم الكامل.';
    }
    if (!/^(?:\+212|212|0)[67]\d{8}$/.test(normalizedPhone)) {
      errors.phone = 'أدخلي رقم هاتف مغربي صحيحاً مثل 06XXXXXXXX.';
    }
    if (city.length < 2) {
      errors.city = 'يرجى إدخال المدينة.';
    }
    if (address.length < 6) {
      errors.address = 'يرجى كتابة عنوان واضح لتسهيل التوصيل.';
    }

    setFormErrors(errors);
    const firstInvalidField = Object.keys(errors)[0];
    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus();
      return;
    }

    setSubmittedOrder({
      reference: `AH-${Date.now().toString().slice(-6)}`,
      customer: fullName,
      quantity: selectedOffer.quantity,
      price: selectedOffer.price,
    });

    requestAnimationFrame(() => {
      document.getElementById('order-confirmation')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  };

  return (
    <main className="overflow-x-clip pb-20 md:pb-0">
      <section className="relative isolate overflow-hidden border-b border-[#eedcc6] bg-[#fffefa]">
        <div className="absolute inset-x-0 top-0 -z-10 h-52 bg-[radial-gradient(circle_at_78%_20%,rgba(221,166,77,.15),transparent_56%)]" />

        <div className="mx-auto grid min-h-[650px] max-w-[1180px] items-center gap-6 px-4 py-8 md:min-h-[625px] md:grid-cols-[1.08fr_.92fr] md:px-8 md:py-10">
          <div className="relative order-1 flex min-h-[320px] items-center justify-center md:order-2 md:min-h-[560px]">
            <div className="absolute inset-x-[8%] bottom-[4%] h-[27%] rounded-[50%] bg-[#d9b98b]/35 blur-2xl" />
            <img
              src="/media/product-open.webp"
              alt="كريم AL HURRA بالأركان وفيتامين E مع الغطاء الذهبي وزهور بيضاء"
              className="relative z-10 h-auto w-[92%] max-w-[680px] object-contain drop-shadow-[0_24px_24px_rgba(80,44,8,.16)] sm:w-full"
              width="1536"
              height="1024"
              fetchPriority="high"
            />

            <div className="absolute bottom-[5%] right-[2%] z-20 flex size-[96px] rotate-[-7deg] flex-col items-center justify-center rounded-full border-[5px] border-[#e7a42c] bg-[#f6c65a] text-center shadow-[0_8px_24px_rgba(104,61,7,.22)] before:absolute before:inset-1 before:rounded-full before:border before:border-[#9b5b05] sm:right-[8%] sm:size-[116px]">
              <span className="relative text-[12px] font-bold text-[#5e3909] sm:text-sm">
                ضمان الرضا
              </span>
              <strong
                className="relative text-2xl font-black leading-none text-[#261508] sm:text-3xl"
                dir="ltr"
              >
                100%
              </strong>
            </div>
          </div>

          <div className="order-2 text-center md:order-1 md:text-right">
            <img
              src="/media/logo-alhurra.webp"
              alt="شعار AL HURRA"
              className="mx-auto mb-3 h-[105px] w-[175px] object-contain md:mx-0 md:mb-4 md:mr-4"
              width="1536"
              height="1024"
            />

            <p className="text-xl font-bold text-[#33241c] sm:text-2xl">
              سر الجمال الطبيعي
            </p>
            <h1 className="mt-2 text-[2.3rem] font-black leading-[1.22] tracking-[-.035em] text-[#bd7007] sm:text-[3.25rem] lg:text-[3.55rem]">
              لبشرة مشرقة وشابة
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-lg font-semibold text-[#30221b] lg:justify-start">
              <span>كريم الأركان وفيتامين E</span>
              <span
                className="rounded-md bg-gradient-to-b from-[#da9429] to-[#b96d05] px-2.5 py-1 text-sm font-extrabold tracking-wide text-white"
                dir="ltr"
              >
                ANTI-AGE
              </span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-x-2 gap-y-5 sm:grid-cols-4">
              {heroBenefits.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-w-0 flex-col items-center gap-2 border-[#ead9c2] px-1 sm:not-last:border-l"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-8 stroke-[1.35] text-[#cb7b0a]"
                  />
                  <span className="max-w-[9rem] text-[12px] font-semibold leading-5 text-[#49372d] sm:text-[13px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <Button
              type="button"
              onClick={scrollToOrder}
              className="mt-7 h-14 w-full max-w-[390px] rounded-lg bg-gradient-to-b from-[#dfa03b] via-[#ca800f] to-[#b96b04] px-8 text-xl font-black text-white shadow-[0_10px_24px_rgba(176,100,4,.2)] transition hover:brightness-105 sm:text-2xl"
            >
              <ShoppingCart className="size-6" aria-hidden="true" />
              اطلب الآن
            </Button>

            <div className="mx-auto mt-5 flex max-w-[540px] flex-wrap justify-center gap-x-5 gap-y-3 lg:mx-0 lg:justify-start">
              {heroTrustItems.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-[11px] font-semibold text-[#4d4037] sm:text-xs"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-5 stroke-[1.5] text-[#cb7b0a]"
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-7 lg:px-6">
        <div className="conversion-grid mx-auto max-w-[1180px]">
          <section className="problems-panel rounded-xl border border-[#eedcc6] bg-white p-3 sm:p-4">
            <SectionHeading>هل تعانين من هذه المشاكل ؟</SectionHeading>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {problemCards.map((problem) => (
                <article
                  key={problem.title}
                  className="overflow-hidden rounded-lg border border-[#ead8c0] bg-[#fffefa]"
                >
                  <img
                    src={problem.image}
                    alt={problem.title}
                    className="aspect-[1.28/1] w-full object-cover"
                    width="1440"
                    height="960"
                    loading="lazy"
                  />
                  <div className="p-3 text-center">
                    <h3 className="text-[13px] font-black text-[#3c2b22] sm:text-sm">
                      {problem.title}
                    </h3>
                    <p className="mt-1 text-[10px] leading-5 text-[#67584e] sm:text-[11px]">
                      {problem.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="why-panel overflow-hidden rounded-xl border border-[#eedcc6] bg-white">
            <div className="grid h-full sm:grid-cols-[1fr_130px]">
              <div className="flex min-h-0 flex-col p-4 sm:p-5">
                <SectionHeading>
                  لماذا تختارين كريم{' '}
                  <span className="text-[#bd7007]" dir="ltr">
                    AL HURRA
                  </span>{' '}
                  ؟
                </SectionHeading>
                <ul className="space-y-2.5">
                  {whyBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-[12px] font-semibold leading-5 text-[#3d3028] sm:text-[13px]"
                    >
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#c77a09] text-white">
                        <Check className="size-2.5 stroke-[3]" aria-hidden="true" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <img
                  src="/media/product-open.webp"
                  alt="عبوة كريم AL HURRA المفتوحة"
                  className="mt-auto max-h-[260px] w-full object-contain pt-4"
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
              </div>

              <aside className="grid grid-cols-2 border-t border-[#eedcc6] bg-[#fffdf9] p-3 sm:grid-cols-1 sm:border-t-0 sm:border-r">
                {sideBenefits.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 border-[#ead9c2] px-2 py-3 sm:flex-col sm:justify-center sm:not-last:border-b sm:text-center"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#d79029] text-[#c67809]">
                      <Icon className="size-6 stroke-[1.35]" aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-bold leading-4 text-[#49372d] sm:text-[11px]">
                      {label}
                    </span>
                  </div>
                ))}
              </aside>
            </div>
          </section>

          <section className="offer-panel rounded-xl border border-[#ecd7bc] bg-[linear-gradient(135deg,#fffdf8_0%,#fff8ec_100%)] p-5 shadow-[0_8px_26px_rgba(100,61,15,.04)]">
            <div className="grid items-center gap-5 sm:grid-cols-[.8fr_1.3fr]">
              <div className="grid grid-cols-2 gap-4 border-[#ead7be] sm:border-l sm:pl-5">
                <div className="flex items-center gap-2">
                  <Truck className="size-8 stroke-[1.35] text-[#ca7b0a]" />
                  <span className="text-[11px] font-bold leading-5">
                    توصيل سريع
                    <small className="block font-normal text-[#75675e]">
                      لجميع المدن
                    </small>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PackageCheck className="size-8 stroke-[1.35] text-[#ca7b0a]" />
                  <span className="text-[11px] font-bold leading-5">
                    الدفع عند الاستلام
                    <small className="block font-normal text-[#75675e]">
                      بدون دفع مسبق
                    </small>
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-black text-[#bd7007] sm:text-2xl">
                  عرض خاص لفترة محدودة
                </h2>
                <div className="mt-3 flex items-end justify-center gap-8">
                  <div>
                    <span className="block text-xs font-bold">الآن فقط</span>
                    <strong
                      className="text-4xl font-black leading-none text-[#2d1e17]"
                      dir="ltr"
                    >
                      199 <small className="text-sm">DH</small>
                    </strong>
                  </div>
                  <div>
                    <span className="block text-xs">بدلاً من</span>
                    <b
                      className="text-2xl font-black line-through decoration-2 decoration-[#87382c]"
                      dir="ltr"
                    >
                      299 <small className="text-xs">DH</small>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="commande" className="scroll-mt-5 px-4 pb-7 lg:px-6">
        <div
          className="order-grid mx-auto grid max-w-[1180px] gap-4 lg:grid-cols-[.86fr_1.3fr]"
          dir="ltr"
        >
          <section
            className="offers-column rounded-xl border border-[#ecd9c2] bg-white p-4 sm:p-5 lg:col-start-2 lg:row-start-1"
            dir="rtl"
          >
            <SectionHeading>اختيار عدد العبوات</SectionHeading>
            <p className="-mt-3 mb-5 text-center text-xs text-[#74665c]">
              اختاري العرض المناسب لك واستفيدي من التخفيض
            </p>

            <div
              className="grid gap-3 sm:grid-cols-3"
              role="radiogroup"
              aria-label="اختيار عدد العبوات"
            >
              {offers.map((offer) => (
                <label
                  key={offer.quantity}
                  className="relative block min-h-[340px] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="offer-selection"
                    value={offer.quantity}
                    checked={selectedQuantity === offer.quantity}
                    onChange={() => {
                      setSelectedQuantity(offer.quantity);
                      setSubmittedOrder(null);
                    }}
                    aria-label={`${offer.name} بسعر ${offer.price} درهم`}
                    className="peer absolute inset-0 z-20 h-full w-full cursor-pointer rounded-xl opacity-0"
                  />
                  <div className="relative flex h-full flex-col items-center rounded-xl border border-[#e8d6bf] bg-[#fffefa] p-4 text-center transition duration-200 peer-checked:-translate-y-1 peer-checked:border-[#c67809] peer-checked:bg-white peer-checked:shadow-[0_14px_30px_rgba(167,99,8,.12)] peer-focus-visible:ring-3 peer-focus-visible:ring-[#c67809]/25">
                    {offer.popular && (
                      <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-b from-[#d99b32] to-[#b86a03] px-5 py-1 text-[11px] font-black text-white shadow-sm">
                        الأكثر طلباً
                      </span>
                    )}

                    <h3 className="mt-1 text-base font-black text-[#35251d]">
                      {offer.name}
                    </h3>
                    <p className="text-[11px] text-[#6f6158]" dir="ltr">
                      {offer.detail}
                    </p>
                    <img
                      src={offer.image}
                      alt={offer.name}
                      className="my-2 h-[150px] w-full object-contain"
                      width="1536"
                      height="1024"
                      loading="lazy"
                    />
                    <strong
                      className="mt-auto text-[2.1rem] font-black leading-none text-[#2d1e17]"
                      dir="ltr"
                    >
                      {offer.price}{' '}
                      <small className="text-[11px] font-extrabold">DH</small>
                    </strong>
                    <p className="mt-2 text-[10px] text-[#6f5c50]">
                      بدلاً من{' '}
                      <span
                        className="font-bold line-through decoration-[#963a2f]"
                        dir="ltr"
                      >
                        {offer.oldPrice} DH
                      </span>
                    </p>
                    {offer.quantity > 1 && (
                      <span className="mt-3 rounded-md bg-gradient-to-b from-[#d99b32] to-[#b86a03] px-4 py-2 text-[11px] font-black text-white">
                        وفر {offer.saving} DH
                      </span>
                    )}
                    {selectedQuantity === offer.quantity && (
                      <span className="mt-2 flex items-center gap-1 text-[10px] font-black text-[#a76106]">
                        <CircleCheckBig className="size-4" /> تم الاختيار
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section
            className="form-column rounded-xl border border-[#ecd9c2] bg-white p-4 sm:p-5 lg:col-start-1 lg:row-start-1"
            dir="rtl"
          >
            <h2 className="text-center text-[1.45rem] font-black text-[#35251d]">
              اطلبي الآن واستلمي طلبك بسرعة
            </h2>
            <p className="mt-1 text-center text-xs text-[#74665c]">
              يرجى ملء الاستمارة التالية بدقة
            </p>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-[#fcf4e8] px-4 py-3">
              <div>
                <span className="block text-[10px] font-bold text-[#78501f]">
                  العرض المختار
                </span>
                <strong className="text-sm text-[#3a291f]">
                  {selectedOffer.name}
                </strong>
              </div>
              <strong className="text-xl font-black text-[#b96c05]" dir="ltr">
                {selectedOffer.price} DH
              </strong>
            </div>

            <form className="mt-5" onSubmit={handleSubmit} noValidate>
              <input
                type="hidden"
                name="quantity"
                value={selectedOffer.quantity}
                readOnly
              />
              <input
                type="hidden"
                name="price"
                value={selectedOffer.price}
                readOnly
              />

              <FieldGroup className="gap-3.5">
                <Field data-invalid={Boolean(formErrors.fullName)}>
                  <FieldLabel htmlFor="fullName" className="text-xs font-bold">
                    الاسم الكامل
                  </FieldLabel>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6e5e53]" />
                    <Input
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      placeholder="اكتبي اسمك الكامل"
                      aria-invalid={Boolean(formErrors.fullName)}
                      aria-describedby={
                        formErrors.fullName ? 'fullName-error' : undefined
                      }
                      onInput={() => clearError('fullName')}
                      className="h-12 rounded-lg border-[#e4d2bb] bg-[#fffefa] pr-10 text-base placeholder:text-xs"
                    />
                  </div>
                  <FieldError id="fullName-error">
                    {formErrors.fullName}
                  </FieldError>
                </Field>

                <Field data-invalid={Boolean(formErrors.phone)}>
                  <FieldLabel htmlFor="phone" className="text-xs font-bold">
                    رقم الهاتف
                  </FieldLabel>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6e5e53]" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="06 XX XX XX XX"
                      dir="ltr"
                      aria-invalid={Boolean(formErrors.phone)}
                      aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                      onInput={() => clearError('phone')}
                      className="h-12 rounded-lg border-[#e4d2bb] bg-[#fffefa] px-10 text-left text-base placeholder:text-xs"
                    />
                  </div>
                  <FieldError id="phone-error">{formErrors.phone}</FieldError>
                </Field>

                <Field data-invalid={Boolean(formErrors.city)}>
                  <FieldLabel htmlFor="city" className="text-xs font-bold">
                    المدينة
                  </FieldLabel>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6e5e53]" />
                    <Input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      placeholder="مثال: الدار البيضاء"
                      aria-invalid={Boolean(formErrors.city)}
                      aria-describedby={formErrors.city ? 'city-error' : undefined}
                      onInput={() => clearError('city')}
                      className="h-12 rounded-lg border-[#e4d2bb] bg-[#fffefa] pr-10 text-base placeholder:text-xs"
                    />
                  </div>
                  <FieldError id="city-error">{formErrors.city}</FieldError>
                </Field>

                <Field data-invalid={Boolean(formErrors.address)}>
                  <FieldLabel htmlFor="address" className="text-xs font-bold">
                    العنوان الكامل
                  </FieldLabel>
                  <div className="relative">
                    <HomeIcon className="pointer-events-none absolute right-3 top-4 size-4 text-[#6e5e53]" />
                    <textarea
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      rows={2}
                      placeholder="اكتبي عنوانك بالتفصيل (الزنقة، الحي، رقم المنزل...)"
                      aria-invalid={Boolean(formErrors.address)}
                      aria-describedby={
                        formErrors.address ? 'address-error' : undefined
                      }
                      onInput={() => clearError('address')}
                      className="min-h-20 w-full resize-none rounded-lg border border-[#e4d2bb] bg-[#fffefa] py-3 pl-3 pr-10 text-base outline-none transition placeholder:text-xs focus-visible:border-[#c47a0a] focus-visible:ring-3 focus-visible:ring-[#c47a0a]/20 aria-invalid:border-[#b42318]"
                    />
                  </div>
                  <FieldError id="address-error">
                    {formErrors.address}
                  </FieldError>
                </Field>
              </FieldGroup>

              {submittedOrder && (
                <div
                  id="order-confirmation"
                  role="status"
                  aria-live="polite"
                  className="mt-4 rounded-lg border border-[#91d69c] bg-[#effbf1] p-4 text-sm text-[#205c2b]"
                >
                  <div className="flex items-start gap-2">
                    <CircleCheckBig className="mt-0.5 size-5 shrink-0" />
                    <div>
                      <strong className="block">تم تسجيل طلبك بنجاح</strong>
                      <span className="mt-1 block text-xs leading-5">
                        شكراً {submittedOrder.customer}. طلبك{' '}
                        <span dir="ltr">{submittedOrder.reference}</span> يتضمن{' '}
                        {submittedOrder.quantity} عبوة بقيمة{' '}
                        <span dir="ltr">{submittedOrder.price} DH</span>. سيتم التواصل
                        معك لتأكيد التوصيل.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="mt-5 h-14 w-full rounded-lg bg-gradient-to-b from-[#49bc57] to-[#29983a] text-xl font-black text-white shadow-[0_9px_22px_rgba(40,147,56,.18)] hover:brightness-105"
              >
                <LockKeyhole className="size-5" aria-hidden="true" />
                تأكيد الطلب —{' '}
                <span dir="ltr">{selectedOffer.price} DH</span>
              </Button>
              <FieldDescription className="mt-2 text-center text-[10px] text-[#665950]">
                لن يتم استخدام معلوماتك إلا لتأكيد الطلب والتوصيل
              </FieldDescription>
            </form>
          </section>
        </div>
      </section>

      <section className="px-4 pb-7 lg:px-6">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 rounded-xl border border-[#ecd9c2] bg-white px-3 py-4 sm:grid-cols-4">
          {reassurance.map(({ title, text, icon: Icon }) => (
            <div
              key={title}
              className="flex items-center gap-3 border-[#ead9c2] px-2 py-3 sm:justify-center sm:not-last:border-l"
            >
              <Icon
                className="size-9 shrink-0 stroke-[1.35] text-[#c77909]"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-xs font-black text-[#3a2a22] sm:text-sm">
                  {title}
                </h3>
                <p className="mt-0.5 text-[9px] text-[#776960] sm:text-[10px]">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-7 lg:px-6">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading>ماذا تقول زبوناتنا</SectionHeading>
          <div className="mx-auto -mt-2 mb-4 w-fit rounded-full border border-[#e0b76f] bg-[#fff7e8] px-3 py-1 text-[9px] font-bold text-[#875312]">
            نماذج توضيحية — تُستبدل بآراء حقيقية موثقة قبل النشر التجاري
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="relative rounded-xl border border-[#ecd9c2] bg-white p-5 shadow-[0_7px_24px_rgba(88,52,13,.04)]"
              >
                <span className="absolute left-3 top-3 rounded-full bg-[#fbf0dc] px-2 py-0.5 text-[8px] font-bold text-[#8e590f]">
                  نموذج
                </span>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt="صورة توضيحية لزبونة"
                    className="size-[72px] rounded-full border-2 border-[#e6c792] object-cover object-top"
                    width="160"
                    height="160"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-black text-[#382820]">
                      {testimonial.name}
                    </h3>
                    <p className="text-[10px] text-[#75675d]">
                      {testimonial.city}
                    </p>
                    <div
                      className="mt-1 flex gap-0.5 text-[#c97a08]"
                      aria-label="خمس نجوم"
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="size-4 fill-current"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[12px] leading-6 text-[#51433a]">
                  {testimonial.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-9 lg:px-6">
        <div className="mx-auto max-w-[650px]">
          <SectionHeading>الأسئلة الشائعة</SectionHeading>
          <Accordion
            defaultValue={['skin-types']}
            className="gap-2"
            aria-label="الأسئلة الشائعة"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="overflow-hidden rounded-lg border border-[#ead9c2] bg-white px-4"
              >
                <AccordionTrigger className="min-h-11 w-full py-2.5 text-right text-xs font-bold hover:no-underline sm:text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-right text-[11px] leading-6 text-[#66584f] sm:text-xs">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="bg-[#302219] text-[#f8eee4]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <img
              src="/media/logo-alhurra.webp"
              alt="شعار AL HURRA"
              className="-my-7 h-32 w-56 object-contain"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <p className="max-w-xs text-[11px] leading-6 text-[#d7c8bc]">
              نؤمن أن الجمال الطبيعي يبدأ من العناية. منتجاتنا مصممة بعناية
              لترافق روتينك اليومي.
            </p>
          </div>

          <div>
            <h2 className="font-black text-white">روابط سريعة</h2>
            <nav className="mt-4 grid gap-2 text-xs text-[#d7c8bc]">
              <a href="#" className="w-fit transition hover:text-[#e3aa51]">
                الرئيسية
              </a>
              <a href="#commande" className="w-fit transition hover:text-[#e3aa51]">
                المنتجات
              </a>
              <a href="#" className="w-fit transition hover:text-[#e3aa51]">
                من نحن
              </a>
              <a href="#contact" className="w-fit transition hover:text-[#e3aa51]">
                اتصل بنا
              </a>
            </nav>
          </div>

          <div id="contact">
            <h2 className="font-black text-white">تواصل معنا</h2>
            <div className="mt-4 grid gap-3 text-xs text-[#d7c8bc]">
              <a href="tel:+212600000000" className="flex items-center gap-2 hover:text-[#e3aa51]">
                <Phone className="size-4 text-[#d99834]" />
                <span dir="ltr">+212 6 00 00 00 00</span>
              </a>
              <a href="mailto:support@alhurra.ma" className="flex items-center gap-2 hover:text-[#e3aa51]">
                <Headphones className="size-4 text-[#d99834]" />
                <span dir="ltr">support@alhurra.ma</span>
              </a>
              <span className="text-[9px] text-[#9f8f83]">
                بيانات مؤقتة قابلة للتعديل
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-black text-white">معلومات</h2>
            <nav className="mt-4 grid gap-2 text-xs text-[#d7c8bc]">
              <a href="#" className="w-fit transition hover:text-[#e3aa51]">
                سياسة الخصوصية
              </a>
              <a href="#" className="w-fit transition hover:text-[#e3aa51]">
                شروط الاستخدام
              </a>
              <a href="#" className="w-fit transition hover:text-[#e3aa51]">
                سياسة الإرجاع والاستبدال
              </a>
            </nav>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-3 text-center text-[10px] text-[#a9988a]">
          © 2026 AL HURRA — جميع الحقوق محفوظة
        </div>
      </footer>

      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e2c18f] bg-white/95 p-3 shadow-[0_-8px_24px_rgba(81,47,10,.12)] backdrop-blur-md md:hidden"
        style={{ paddingBottom: 'calc(.75rem + env(safe-area-inset-bottom))' }}
      >
        <Button
          type="button"
          onClick={scrollToOrder}
          className="h-12 w-full rounded-lg bg-gradient-to-b from-[#d99b32] to-[#b86a03] text-base font-black text-white"
        >
          <ShoppingCart className="size-5" aria-hidden="true" />
          اطلب الآن — <span dir="ltr">{selectedOffer.price} DH</span>
        </Button>
      </div>
    </main>
  );
}
