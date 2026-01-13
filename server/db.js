import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');
const dbFile = join(dataDir, 'db.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const defaultData = {
  products: [
    {
      id: 'prod-1',
      name: 'Стул CAPRI',
      price: '9200 ₽',
      category: 'chairs',
      images: [
        'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800'
      ],
      alt: 'Стул CAPRI из массива бука'
    },
    {
      id: 'prod-2',
      name: 'Стул KRIS',
      price: '7800 ₽',
      category: 'chairs',
      images: [
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800'
      ],
      alt: 'Стул KRIS в велюре'
    },
    {
      id: 'prod-3',
      name: 'Пуф RALPH',
      price: '8200 ₽',
      category: 'poufs',
      images: [
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?auto=format&fit=crop&q=80&w=800'
      ],
      alt: 'Дизайнерский пуф RALPH'
    }
  ],
  categories: [
    {
      id: 'chairs',
      name: 'Стулья',
      imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
      alt: 'Премиальный стул в современном интерьере'
    },
    {
      id: 'poufs',
      name: 'Пуфы и обувницы',
      imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
      alt: 'Компактный пуф для прихожей'
    },
    {
      id: 'sofas',
      name: 'Диваны',
      imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
      alt: 'Минималистичный диван в гостиной'
    }
  ],
  materials: [
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
  ],
  leads: [],
  chats: [],
  settings: {
    siteName: 'ThelMebel',
    contactPhone: '+7 (900) 000-00-00',
    contactEmail: 'hello@thelmebel.ru'
  },
  admin: {
    username: 'admin',
    passwordHash: bcrypt.hashSync('admin123', 10)
  }
};

const adapter = new JSONFile(dbFile);
export const db = new Low(adapter, defaultData);

export const initDb = async () => {
  await db.read();
  db.data ||= defaultData;
  await db.write();
};
