
import React from 'react';

export const CATEGORIES = [
  { id: 'chairs', name: 'Стулья', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', alt: 'Премиальный стул в современном интерьере' },
  { id: 'semibar', name: 'Полубарные стулья', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800', alt: 'Полубарный стул из массива' },
  { id: 'bar', name: 'Барные стулья', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800', alt: 'Дизайнерский барный стул' },
  { id: 'armchairs', name: 'Кресла', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800', alt: 'Мягкое кресло премиум-класса' },
  { id: 'sofas', name: 'Диваны', imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800', alt: 'Минималистичный диван в гостиной' },
  { id: 'poufs', name: 'Пуфы и обувницы', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800', alt: 'Компактный пуф для прихожей' },
];

export const PROCESS_STEPS = [
  { 
    num: '01', 
    title: 'КОНСУЛЬТАЦИЯ', 
    desc: 'Обсуждаем ваши пожелания и подбираем материалы.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600',
    alt: 'Обсуждение проекта с дизайнером'
  },
  { 
    num: '02', 
    title: 'ЧЕРТЕЖ', 
    desc: 'Создаем детальный эскиз и утверждаем размеры.',
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=600',
    alt: 'Проекпирование мебели на чертеже'
  },
  { 
    num: '03', 
    title: 'ПРОИЗВОДСТВО', 
    desc: 'Ручная работа мастеров с контролем качества.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600',
    alt: 'Процесс сборки мебели в мастерской'
  },
  { 
    num: '04', 
    title: 'ДОСТАВКА', 
    desc: 'Бережно привозим и устанавливаем мебель.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    alt: 'Упакованная мебель готова к доставке'
  },
];

const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800'
];

export const PRODUCTS = [
  { id: 'ch1', category: 'chairs', name: 'Стул CAPRI', price: '9200 ₽', images: [PRODUCT_IMAGES[0], PRODUCT_IMAGES[1], PRODUCT_IMAGES[2]], alt: 'Стул CAPRI из массива бука' },
  { id: 'ch2', category: 'chairs', name: 'Стул KRIS', price: '7800 ₽', images: [PRODUCT_IMAGES[1], PRODUCT_IMAGES[2], PRODUCT_IMAGES[0]], alt: 'Стул KRIS в велюре' },
  { id: 'ch3', category: 'chairs', name: 'Стул POLO', price: '7300 ₽', images: [PRODUCT_IMAGES[2], PRODUCT_IMAGES[0], PRODUCT_IMAGES[1]], alt: 'Стул POLO обеденный' },
  { id: 'ch4', category: 'chairs', name: 'Стул MARSEL', price: '7700 ₽', images: [PRODUCT_IMAGES[0], PRODUCT_IMAGES[1], PRODUCT_IMAGES[2]], alt: 'Стул MARSEL дизайнерский' },
  { id: 'ch5', category: 'chairs', name: 'Стул OSLO', price: '7800 ₽', images: [PRODUCT_IMAGES[1], PRODUCT_IMAGES[2], PRODUCT_IMAGES[0]], alt: 'Стул OSLO скандинавский стиль' },
  { id: 'ch6', category: 'chairs', name: 'Стул SHELL 3', price: '7800 ₽', images: [PRODUCT_IMAGES[2], PRODUCT_IMAGES[0], PRODUCT_IMAGES[1]], alt: 'Стул SHELL с эргономичной спинкой' },
  
  // Пуфы и Обувницы с обновленными фото
  { id: 'p1', category: 'poufs', name: 'Пуф RALPH', price: '8200 ₽', images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?auto=format&fit=crop&q=80&w=800'], alt: 'Дизайнерский пуф RALPH' },
  { id: 'p2', category: 'poufs', name: 'Пуф GEOMETRIA', price: '12500 ₽', images: ['https://images.unsplash.com/photo-1594913785162-e6786b42dea3?auto=format&fit=crop&q=80&w=800'], alt: 'Набор пуфов GEOMETRIA' },
  { id: 'p3', category: 'poufs', name: 'Обувница MILAN', price: '15900 ₽', images: ['https://images.unsplash.com/photo-1565791380713-1756b9a05243?auto=format&fit=crop&q=80&w=800'], alt: 'Обувница MILAN с мягким сиденьем' },
  { id: 'p4', category: 'poufs', name: 'Обувница VERONA', price: '14200 ₽', images: ['https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800'], alt: 'Обувница VERONA классическая' },
];

export const HORECA_FEATURES = [
  { title: 'Цены производителя', desc: 'Никаких наценок шоурумов. Прямая выгода до 30%.' },
  { title: 'Износостойкость', desc: 'Используем ткани с циклом Мартиндейла от 50 000 до 100 000.' },
  { title: 'Любые объемы', desc: 'Мощности производства позволяют сдавать проекты на 100+ позиций в срок.' },
  { title: 'Спец. условия', desc: 'Персональный менеджер и гибкая система скидок для HoReCa.' }
];

export const INTERIORS = [
  { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800', alt: 'Интерьер современного ресторана с нашей мебелью' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', alt: 'Гостиная в частном доме, обставленная ThelMebel' },
  { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', alt: 'Обеденная зона с нашими стульями' },
  { url: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=800', alt: 'Минималистичный интерьер спальни' },
];

export const ADVANTAGES = [
  {
    id: '1',
    title: 'Прямое производство',
    description: 'Собственный цех позволяет нам держать цены на 30% ниже рыночных при премиальном качестве.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    alt: 'Наше производство мебели'
  },
  {
    id: '2',
    title: 'Тройной контроль',
    description: 'Каждый шов и стык проверяется мастером. Используем только массив бука и дуба.',
    imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
    alt: 'Контроль качества материалов'
  },
  {
    id: '3',
    title: 'Быстрые сроки',
    description: 'Изготовление заказа любой сложности от 14 рабочих дней с доставкой по всей РФ.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    alt: 'Логистика и доставка мебели'
  }
];

export const MATERIALS = [
  {
    id: 'mat1',
    name: 'Массив Бука',
    desc: 'Высокая плотность и прочность. Идеально держит форму годами.',
    img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=800',
    alt: 'Текстура массива бука'
  },
  {
    id: 'mat2',
    name: 'Премиум Велюр',
    desc: 'Ткани с износостойкостью до 100 000 циклов по Мартиндейлу.',
    img: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800',
    alt: 'Образцы тканей велюра'
  },
  {
    id: 'mat3',
    name: 'Эмали по RAL',
    desc: 'Используем безопасные итальянские лаки и краски Sayerlack.',
    img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800',
    alt: 'Палитра эмалей для покраски'
  }
];
