import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  ArrowRight,
  Sparkles,
  Star,
  Volume2,
  Gamepad2,
  Info,
  BookOpen,
  LayoutGrid,
  ChevronLeft,
  Search
} from 'lucide-react';

// --- Types ---

interface WordData {
  id: number;
  wordArm: string;
  wordEng: string;
  correctSp: string;
  options: string[];
  imageUrl: string;
}

interface Topic {
  id: string;
  nameArm: string;
  nameEng: string;
  icon: React.ReactNode;
  words: WordData[];
}

interface DiagnosticQuestion {
  id: number;
  question: string;
  options: string[];
  correct: string;
}

// --- Data ---

const TOPICS_DATA: Topic[] = [
  {
    id: 'greetings',
    nameArm: 'Ողջույններ',
    nameEng: 'Greetings',
    icon: <Sparkles className="w-6 h-6" />,
    words: [
      { id: 1, wordArm: "Ողջույն", wordEng: "Hello", correctSp: "Hola", options: ["Hola", "Adiós", "Gracias", "Perdón"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 2, wordArm: "Ցտեսություն", wordEng: "Goodbye", correctSp: "Adiós", options: ["Hola", "Adiós", "Bienvenido", "Por favor"], imageUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=400&q=80" },
      { id: 3, wordArm: "Բարի լույս", wordEng: "Good morning", correctSp: "Buenos días", options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hola"], imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=400&q=80" },
      { id: 4, wordArm: "Բարի օր", wordEng: "Good afternoon", correctSp: "Buenas tardes", options: ["Buenos días", "Buenas noches", "Buenas tardes", "Adiós"], imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80" },
      { id: 5, wordArm: "Բարի գիշեր", wordEng: "Good night", correctSp: "Buenas noches", options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hasta luego"], imageUrl: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?auto=format&fit=crop&w=400&q=80" },
      { id: 6, wordArm: "Ինչպե՞ս ես", wordEng: "How are you?", correctSp: "¿Cómo estás?", options: ["¿Cómo te llamas?", "¿Cómo estás?", "¿Qué tal?", "Mucho gusto"], imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80" },
      { id: 7, wordArm: "Հաճելի է", wordEng: "Nice to meet you", correctSp: "Mucho gusto", options: ["De nada", "Mucho gusto", "Lo siento", "Hola"], imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=400&q=80" },
      { id: 8, wordArm: "Մինչ նոր հանդիպում", wordEng: "See you later", correctSp: "Hasta luego", options: ["Hasta luego", "Hola", "Buenos días", "Bienvenido"], imageUrl: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=400&q=80" },
      { id: 9, wordArm: "Բարի գալուստ", wordEng: "Welcome", correctSp: "Bienvenido", options: ["Adiós", "Bienvenido", "Gracias", "Hola"], imageUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=400&q=80" },
      { id: 10, wordArm: "Ի՞նչ կա չկա", wordEng: "What's up?", correctSp: "¿Qué tal?", options: ["¿Cómo estás?", "¿Qué tal?", "¿De dónde eres?", "Mucho gusto"], imageUrl: "https://images.unsplash.com/photo-1516533075015-a3838414c3cb?auto=format&fit=crop&w=400&q=80" },
      { id: 11, wordArm: "Խնդրում եմ", wordEng: "Please", correctSp: "Por favor", options: ["Gracias", "Por favor", "De nada", "Perդón"], imageUrl: "https://images.unsplash.com/photo-1508921334172-b68ed335b3e6?auto=format&fit=crop&w=400&q=80" },
      { id: 12, wordArm: "Շնորհակալություն", wordEng: "Thank you", correctSp: "Gracias", options: ["Gracias", "De nada", "Hola", "Adiós"], imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80" },
      { id: 13, wordArm: "Խնդրեմ", wordEng: "You're welcome", correctSp: "De nada", options: ["Gracias", "De nada", "Perdón", "Hola"], imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80" },
      { id: 14, wordArm: "Կներեք", wordEng: "Excuse me", correctSp: "Perdón", options: ["Perdón", "Gracias", "Adiós", "Hola"], imageUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=400&q=80" },
      { id: 15, wordArm: "Ցավում եմ", wordEng: "I'm sorry", correctSp: "Lo siento", options: ["Mucho gusto", "Lo siento", "De nada", "Hola"], imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
      { id: 16, wordArm: "Այո", wordEng: "Yes", correctSp: "Sí", options: ["No", "Sí", "Tal vez", "Hola"], imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80" },
      { id: 17, wordArm: "Ոչ", wordEng: "No", correctSp: "No", options: ["Sí", "No", "Gracias", "Adiós"], imageUrl: "https://images.unsplash.com/photo-1534312527009-56c7016453e6?auto=format&fit=crop&w=400&q=80" },
      { id: 18, wordArm: "Գուցե", wordEng: "Maybe", correctSp: "Tal vez", options: ["Sí", "No", "Tal vez", "Hola"], imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
      { id: 19, wordArm: "Ի՞նչ է քո անունը", wordEng: "What is your name?", correctSp: "¿Cómo te llamas?", options: ["¿Cómo estás?", "¿Cómo te llamas?", "¿De dónde eres?", "Mucho gusto"], imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80" },
      { id: 20, wordArm: "Իմ անունն է...", wordEng: "My name is...", correctSp: "Me llamo...", options: ["Me llamo...", "¿Cómo estás?", "Mucho gusto", "Hola"], imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 'colors',
    nameArm: 'Գույներ',
    nameEng: 'Colors',
    icon: <LayoutGrid className="w-6 h-6" />,
    words: [
      { id: 1, wordArm: "Կարմիր", wordEng: "Red", correctSp: "Rojo", options: ["Rojo", "Azul", "Verde", "Amarillo"], imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756edd811?auto=format&fit=crop&w=400&q=80" },
      { id: 2, wordArm: "Կապույտ", wordEng: "Blue", correctSp: "Azul", options: ["Rojo", "Azul", "Verde", "Blanco"], imageUrl: "https://images.unsplash.com/photo-1500462859273-519d339bc582?auto=format&fit=crop&w=400&q=80" },
      { id: 3, wordArm: "Կանաչ", wordEng: "Green", correctSp: "Verde", options: ["Verde", "Azul", "Rojo", "Negro"], imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80" },
      { id: 4, wordArm: "Դեղին", wordEng: "Yellow", correctSp: "Amarillo", options: ["Amarillo", "Naranja", "Rosa", "Gris"], imageUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=400&q=80" },
      { id: 5, wordArm: "Նարնջագույն", wordEng: "Orange", correctSp: "Naranja", options: ["Naranja", "Rojo", "Amarillo", "Marrón"], imageUrl: "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=400&q=80" },
      { id: 6, wordArm: "Մանուշակագույն", wordEng: "Purple", correctSp: "Morado", options: ["Morado", "Rosa", "Azul", "Negro"], imageUrl: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?auto=format&fit=crop&w=400&q=80" },
      { id: 7, wordArm: "Վարդագույն", wordEng: "Pink", correctSp: "Rosa", options: ["Rosa", "Rojo", "Blanco", "Morado"], imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c6c78290?auto=format&fit=crop&w=400&q=80" },
      { id: 8, wordArm: "Սպիտակ", wordEng: "White", correctSp: "Blanco", options: ["Blanco", "Negro", "Gris", "Azul"], imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=400&q=80" },
      { id: 9, wordArm: "Սև", wordEng: "Black", correctSp: "Negro", options: ["Negro", "Blanco", "Gris", "Marrón"], imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80" },
      { id: 10, wordArm: "Մոխրագույն", wordEng: "Grey", correctSp: "Gris", options: ["Gris", "Negro", "Blanco", "Azul"], imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80" },
      { id: 11, wordArm: "Շագանակագույն", wordEng: "Brown", correctSp: "Marrón", options: ["Marrón", "Negro", "Naranja", "Gris"], imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80" },
      { id: 12, wordArm: "Ոսկեգույն", wordEng: "Gold", correctSp: "Dorado", options: ["Dorado", "Plateado", "Amarillo", "Naranja"], imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=400&q=80" },
      { id: 13, wordArm: "Արծաթագույն", wordEng: "Silver", correctSp: "Plateado", options: ["Plateado", "Dorado", "Gris", "Blanco"], imageUrl: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&w=400&q=80" },
      { id: 14, wordArm: "Փիրուզագույն", wordEng: "Turquoise", correctSp: "Turquesa", options: ["Turquesa", "Azul", "Verde", "Rosa"], imageUrl: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&w=400&q=80" },
      { id: 15, wordArm: "Մանուշակագույն (թեթև)", wordEng: "Violet", correctSp: "Violeta", options: ["Violeta", "Morado", "Rosa", "Azul"], imageUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=400&q=80" },
      { id: 16, wordArm: "Բեժ", wordEng: "Beige", correctSp: "Beige", options: ["Beige", "Blanco", "Marrón", "Gris"], imageUrl: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=400&q=80" },
      { id: 17, wordArm: "Մուգ կարմիր", wordEng: "Crimson", correctSp: "Carmesí", options: ["Carmesí", "Rojo", "Rosa", "Morado"], imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80" },
      { id: 18, wordArm: "Զմրուխտագույն", wordEng: "Emerald", correctSp: "Esmeralda", options: ["Esmeralda", "Verde", "Azul", "Turquesa"], imageUrl: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?auto=format&fit=crop&w=400&q=80" },
      { id: 19, wordArm: "Ինդիգո", wordEng: "Indigo", correctSp: "Índigo", options: ["Índigo", "Azul", "Morado", "Negro"], imageUrl: "https://images.unsplash.com/photo-1500462859273-519d339bc582?auto=format&fit=crop&w=400&q=80" },
      { id: 20, wordArm: "Ձիթապտղագույն", wordEng: "Olive", correctSp: "Oliva", options: ["Oliva", "Verde", "Marrón", "Gris"], imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 'numbers',
    nameArm: 'Թվեր',
    nameEng: 'Numbers',
    icon: <Star className="w-6 h-6" />,
    words: [
      { id: 1, wordArm: "Մեկ", wordEng: "One", correctSp: "Uno", options: ["Uno", "Dos", "Tres", "Diez"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 2, wordArm: "Երկու", wordEng: "Two", correctSp: "Dos", options: ["Uno", "Dos", "Tres", "Cuatro"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 3, wordArm: "Երեք", wordEng: "Three", correctSp: "Tres", options: ["Dos", "Tres", "Cuatro", "Cinco"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 4, wordArm: "Չորս", wordEng: "Four", correctSp: "Cuatro", options: ["Tres", "Cuatro", "Cinco", "Seis"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 5, wordArm: "Հինգ", wordEng: "Five", correctSp: "Cinco", options: ["Cuatro", "Cinco", "Seis", "Siete"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 6, wordArm: "Վեց", wordEng: "Six", correctSp: "Seis", options: ["Cinco", "Seis", "Siete", "Ocho"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 7, wordArm: "Յոթ", wordEng: "Seven", correctSp: "Siete", options: ["Seis", "Siete", "Ocho", "Nueve"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 8, wordArm: "Ութ", wordEng: "Eight", correctSp: "Ocho", options: ["Siete", "Ocho", "Nueve", "Diez"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 9, wordArm: "Ինը", wordEng: "Nine", correctSp: "Nueve", options: ["Ocho", "Nueve", "Diez", "Once"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 10, wordArm: "Տասը", wordEng: "Ten", correctSp: "Diez", options: ["Nueve", "Diez", "Once", "Doce"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 11, wordArm: "Տասնմեկ", wordEng: "Eleven", correctSp: "Once", options: ["Diez", "Once", "Doce", "Trece"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 12, wordArm: "Տասներկու", wordEng: "Twelve", correctSp: "Doce", options: ["Once", "Doce", "Trece", "Catorce"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 13, wordArm: "Տասներեք", wordEng: "Thirteen", correctSp: "Trece", options: ["Doce", "Trece", "Catorce", "Quince"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 14, wordArm: "Տասնչորս", wordEng: "Fourteen", correctSp: "Catorce", options: ["Trece", "Catorce", "Quince", "Dieciséis"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 15, wordArm: "Տասնհինգ", wordEng: "Fifteen", correctSp: "Quince", options: ["Catorce", "Quince", "Dieciséis", "Diecisiete"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 16, wordArm: "Տասնվեց", wordEng: "Sixteen", correctSp: "Dieciséis", options: ["Quince", "Dieciséis", "Diecisiete", "Dieciocho"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 17, wordArm: "Տասնյոթ", wordEng: "Seventeen", correctSp: "Diecisiete", options: ["Dieciséis", "Diecisiete", "Dieciocho", "Diecinueve"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 18, wordArm: "Տասնութ", wordEng: "Eighteen", correctSp: "Dieciocho", options: ["Diecisiete", "Dieciocho", "Diecinueve", "Veinte"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 19, wordArm: "Տասնինը", wordEng: "Nineteen", correctSp: "Diecinueve", options: ["Dieciocho", "Diecinueve", "Veinte", "Treinta"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" },
      { id: 20, wordArm: "Քսան", wordEng: "Twenty", correctSp: "Veinte", options: ["Diecinueve", "Veinte", "Treinta", "Cuarenta"], imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 'animals',
    nameArm: 'Կենդանիներ',
    nameEng: 'Animals',
    icon: <Info className="w-6 h-6" />,
    words: [
      { id: 1, wordArm: "Շուն", wordEng: "Dog", correctSp: "Perro", options: ["Perro", "Gato", "Caballo", "Vaca"], imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
      { id: 2, wordArm: "Կատու", wordEng: "Cat", correctSp: "Gato", options: ["Perro", "Gato", "Ratón", "Pájaro"], imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80" },
      { id: 3, wordArm: "Ձի", wordEng: "Horse", correctSp: "Caballo", options: ["Caballo", "Vaca", "Oveja", "Cerdo"], imageUrl: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=400&q=80" },
      { id: 4, wordArm: "Կով", wordEng: "Cow", correctSp: "Vaca", options: ["Vaca", "Caballo", "Cerdo", "Oveja"], imageUrl: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=400&q=80" },
      { id: 5, wordArm: "Խոզ", wordEng: "Pig", correctSp: "Cerdo", options: ["Cerdo", "Vaca", "Oveja", "Pato"], imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80" },
      { id: 6, wordArm: "Ոչխար", wordEng: "Sheep", correctSp: "Oveja", options: ["Oveja", "Cabra", "Vaca", "Cerdo"], imageUrl: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=400&q=80" },
      { id: 7, wordArm: "Հավ", wordEng: "Chicken", correctSp: "Pollo", options: ["Pollo", "Pato", "Pájaro", "Conejo"], imageUrl: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80" },
      { id: 8, wordArm: "Բադ", wordEng: "Duck", correctSp: "Pato", options: ["Pato", "Pollo", "Pájaro", "Pez"], imageUrl: "https://images.unsplash.com/photo-1555854816-808228a371ed?auto=format&fit=crop&w=400&q=80" },
      { id: 9, wordArm: "Առյուծ", wordEng: "Lion", correctSp: "León", options: ["León", "Tigre", "Elefante", "Mono"], imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=400&q=80" },
      { id: 10, wordArm: "Վագր", wordEng: "Tiger", correctSp: "Tigre", options: ["León", "Tigre", "Zebra", "Oso"], imageUrl: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=400&q=80" },
      { id: 11, wordArm: "Փիղ", wordEng: "Elephant", correctSp: "Elefante", options: ["Elefante", "Jirafa", "Mono", "León"], imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400&q=80" },
      { id: 12, wordArm: "Ընձուղտ", wordEng: "Giraffe", correctSp: "Jirafa", options: ["Jirafa", "Elefante", "Zebra", "Mono"], imageUrl: "https://images.unsplash.com/photo-1547721064-36202633ad1b?auto=format&fit=crop&w=400&q=80" },
      { id: 13, wordArm: "Կապիկ", wordEng: "Monkey", correctSp: "Mono", options: ["Mono", "Gorila", "León", "Tigre"], imageUrl: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=400&q=80" },
      { id: 14, wordArm: "Զեբր", wordEng: "Zebra", correctSp: "Cebra", options: ["Cebra", "Caballo", "Jirafa", "Tigre"], imageUrl: "https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&w=400&q=80" },
      { id: 15, wordArm: "Արջ", wordEng: "Bear", correctSp: "Oso", options: ["Oso", "Lobo", "Zorro", "León"], imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=400&q=80" },
      { id: 16, wordArm: "Գայլ", wordEng: "Wolf", correctSp: "Lobo", options: ["Lobo", "Perro", "Zorro", "Oso"], imageUrl: "https://images.unsplash.com/photo-1564484289142-424d683635aa?auto=format&fit=crop&w=400&q=80" },
      { id: 17, wordArm: "Աղվես", wordEng: "Fox", correctSp: "Zorro", options: ["Zorro", "Lobo", "Oso", "Conejo"], imageUrl: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=400&q=80" },
      { id: 18, wordArm: "Ճագար", wordEng: "Rabbit", correctSp: "Conejo", options: ["Conejo", "Ratón", "Pájaro", "Gato"], imageUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=400&q=80" },
      { id: 19, wordArm: "Մուկ", wordEng: "Mouse", correctSp: "Ratón", options: ["Ratón", "Conejo", "Gato", "Pájaro"], imageUrl: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=400&q=80" },
      { id: 20, wordArm: "Թռչուն", wordEng: "Bird", correctSp: "Pájaro", options: ["Pájaro", "Pato", "Pollo", "Pez"], imageUrl: "https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 'food',
    nameArm: 'Սնունդ',
    nameEng: 'Food',
    icon: <BookOpen className="w-6 h-6" />,
    words: [
      { id: 1, wordArm: "Հաց", wordEng: "Bread", correctSp: "Pan", options: ["Pan", "Leche", "Huevo", "Queso"], imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" },
      { id: 2, wordArm: "Կաթ", wordEng: "Milk", correctSp: "Leche", options: ["Leche", "Agua", "Jugo", "Pan"], imageUrl: "https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&w=400&q=80" },
      { id: 3, wordArm: "Ձու", wordEng: "Egg", correctSp: "Huevo", options: ["Huevo", "Queso", "Carne", "Pan"], imageUrl: "https://images.unsplash.com/photo-1582722872445-44c56bb6218f?auto=format&fit=crop&w=400&q=80" },
      { id: 4, wordArm: "Պանիր", wordEng: "Cheese", correctSp: "Queso", options: ["Queso", "Leche", "Huevo", "Pan"], imageUrl: "https://images.unsplash.com/photo-1486297678162-ad2a19b05840?auto=format&fit=crop&w=400&q=80" },
      { id: 5, wordArm: "Խնձոր", wordEng: "Apple", correctSp: "Manzana", options: ["Manzana", "Plátano", "Naranja", "Uva"], imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80" },
      { id: 6, wordArm: "Բանան", wordEng: "Banana", correctSp: "Plátano", options: ["Plátano", "Manzana", "Fresa", "Pera"], imageUrl: "https://images.unsplash.com/photo-1571771894821-ad996211fdf4?auto=format&fit=crop&w=400&q=80" },
      { id: 7, wordArm: "Նարինջ", wordEng: "Orange", correctSp: "Naranja", options: ["Naranja", "Limón", "Manzana", "Uva"], imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=400&q=80" },
      { id: 8, wordArm: "Ելակ", wordEng: "Strawberry", correctSp: "Fresa", options: ["Fresa", "Uva", "Cereza", "Manzana"], imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80" },
      { id: 9, wordArm: "Խաղող", wordEng: "Grape", correctSp: "Uva", options: ["Uva", "Fresa", "Manzana", "Naranja"], imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
      { id: 10, wordArm: "Լոլիկ", wordEng: "Tomato", correctSp: "Tomate", options: ["Tomate", "Patata", "Cebolla", "Zanahoria"], imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80" },
      { id: 11, wordArm: "Կարտոֆիլ", wordEng: "Potato", correctSp: "Patata", options: ["Patata", "Tomate", "Cebolla", "Arroz"], imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80" },
      { id: 12, wordArm: "Սոխ", wordEng: "Onion", correctSp: "Cebolla", options: ["Cebolla", "Ajo", "Tomate", "Zanahoria"], imageUrl: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=400&q=80" },
      { id: 13, wordArm: "Գազար", wordEng: "Carrot", correctSp: "Zanahoria", options: ["Zanahoria", "Tomate", "Patata", "Cebolla"], imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80" },
      { id: 14, wordArm: "Միս", wordEng: "Meat", correctSp: "Carne", options: ["Carne", "Pescado", "Pollo", "Huevo"], imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80" },
      { id: 15, wordArm: "Ձուկ", wordEng: "Fish", correctSp: "Pescado", options: ["Pescado", "Carne", "Pollo", "Agua"], imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80" },
      { id: 16, wordArm: "Հավի միս", wordEng: "Chicken", correctSp: "Pollo", options: ["Pollo", "Carne", "Pescado", "Huevo"], imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80" },
      { id: 17, wordArm: "Բրինձ", wordEng: "Rice", correctSp: "Arroz", options: ["Arroz", "Pasta", "Pan", "Patata"], imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80" },
      { id: 18, wordArm: "Մակարոն", wordEng: "Pasta", correctSp: "Pasta", options: ["Pasta", "Arroz", "Pan", "Pizza"], imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80" },
      { id: 19, wordArm: "Ջուր", wordEng: "Water", correctSp: "Agua", options: ["Agua", "Leche", "Jugo", "Vino"], imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80" },
      { id: 20, wordArm: "Հյութ", wordEng: "Juice", correctSp: "Jugo", options: ["Jugo", "Agua", "Leche", "Café"], imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80" }
    ]
  }
];

const DIAGNOSTIC_DATA: DiagnosticQuestion[] = [
  { id: 1, question: "What color is the sky?", options: ["Green", "Blue", "Red", "Yellow"], correct: "Blue" },
  { id: 2, question: "Which one is an animal?", options: ["Table", "Apple", "Cat", "Car"], correct: "Cat" },
  { id: 3, question: "I ____ a student.", options: ["is", "am", "are", "be"], correct: "am" },
  { id: 4, question: "Yesterday, I ____ to the park.", options: ["go", "goes", "went", "going"], correct: "went" },
  { id: 5, question: "If it rains, I ____ stay at home.", options: ["would", "will", "did", "am"], correct: "will" },
  { id: 6, question: "She has been living here ____ five years.", options: ["since", "for", "during", "while"], correct: "for" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'learn' | 'test' | 'diagnostic' | 'topics'>('topics');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentData = activeTab === 'diagnostic' 
    ? DIAGNOSTIC_DATA[currentIdx] 
    : selectedTopic?.words[currentIdx];

  const totalQuestions = activeTab === 'diagnostic' 
    ? DIAGNOSTIC_DATA.length 
    : selectedTopic?.words.length || 0;

  const progress = ((currentIdx + 1) / totalQuestions) * 100;

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correctValue = activeTab === 'diagnostic' 
      ? (currentData as DiagnosticQuestion).correct 
      : (currentData as WordData).correctSp;
      
    const correct = option === correctValue;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setImageLoaded(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowResults(false);
    setImageLoaded(false);
  };

  const selectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setActiveTab('learn');
    resetQuiz();
  };

  const getRecommendation = () => {
    const percentage = (score / DIAGNOSTIC_DATA.length) * 100;
    if (percentage <= 33) {
      return {
        level: "Beginner (Սկսնակ)",
        topics: ["Ողջույններ (Greetings)", "Գույներ (Colors)", "Թվեր (Numbers)"],
        message: "Քանի որ դու նոր ես սկսում անգլերենը, խորհուրդ ենք տալիս սկսել իսպաներենի ամենապարզ թեմաներից:"
      };
    } else if (percentage <= 66) {
      return {
        level: "Elementary (Տարրական)",
        topics: ["Ընտանիք (Family)", "Սնունդ (Food)", "Հիմնական բայեր (Basic Verbs)"],
        message: "Դու արդեն ունես լավ հիմք: Կարող ես սկսել ավելի հետաքրքիր թեմաներ իսպաներենով:"
      };
    } else {
      return {
        level: "Intermediate (Միջին)",
        topics: ["Ժամանակաձևեր (Tenses)", "Բարդ նախադասություններ (Complex Sentences)", "Մշակույթ (Culture)"],
        message: "Քո անգլերենը հիանալի է: Դու պատրաստ ես իսպաներենի ավելի բարդ մակարդակներին:"
      };
    }
  };

  return (
    <div className="min-h-screen bg-[#1e40af] bg-gradient-to-b from-[#1e40af] to-[#60a5fa] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex flex-col gap-4 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('topics')}>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Gamepad2 className="w-6 h-6 text-blue-100" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none">Իսպաներենի Դասեր</h1>
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Spanish Lessons</span>
            </div>
          </div>
          {(activeTab === 'test' || activeTab === 'diagnostic') && !showResults && (
            <div className="text-sm font-bold bg-white/20 px-4 py-2 rounded-full border border-white/30 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              {score}
            </div>
          )}
        </div>

        {/* Tabs */}
        {activeTab !== 'topics' && (
          <div className="flex bg-white/10 p-1 rounded-2xl backdrop-blur-md border border-white/20">
            <button
              onClick={() => setActiveTab('topics')}
              className="px-4 flex items-center justify-center text-white/60 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setActiveTab('learn'); resetQuiz(); }}
              className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl font-bold transition-all ${
                activeTab === 'learn' ? 'bg-white text-[#1e40af] shadow-lg' : 'text-white/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Սովորել</span>
              </div>
              <span className="text-[8px] uppercase tracking-tighter">Learn</span>
            </button>
            <button
              onClick={() => { setActiveTab('test'); resetQuiz(); }}
              className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl font-bold transition-all ${
                activeTab === 'test' ? 'bg-white text-[#1e40af] shadow-lg' : 'text-white/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                <span>Թեստ</span>
              </div>
              <span className="text-[8px] uppercase tracking-tighter">Test</span>
            </button>
          </div>
        )}
        
        {(activeTab === 'test' || activeTab === 'diagnostic') && !showResults && (
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-200 to-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-4 max-w-2xl mx-auto w-full overflow-y-auto custom-scrollbar relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-300/20 blur-[120px] rounded-full -z-10" />

        <AnimatePresence mode="wait">
          {activeTab === 'topics' ? (
            <motion.div
              key="topics-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full space-y-6 pb-12"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-black mb-2">Ընտրիր թեման</h2>
                <p className="text-blue-200 uppercase text-xs font-bold tracking-widest mb-8">Choose a Topic</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {TOPICS_DATA.map((topic) => (
                    <motion.button
                      key={topic.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectTopic(topic)}
                      className="bg-white/5 hover:bg-white/10 p-6 rounded-3xl border border-white/10 flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-500/30 rounded-2xl group-hover:bg-blue-500/50 transition-colors">
                          {topic.icon}
                        </div>
                        <div className="text-left">
                          <p className="text-xl font-black text-white">{topic.nameArm}</p>
                          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">{topic.nameEng}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full">{topic.words.length} բառ</span>
                        <ArrowRight className="w-5 h-5 mt-2 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.button>
                  ))}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveTab('diagnostic'); resetQuiz(); }}
                    className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 hover:from-yellow-400/30 hover:to-orange-400/30 p-6 rounded-3xl border border-yellow-400/30 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-yellow-400/30 rounded-2xl group-hover:bg-yellow-400/50 transition-colors">
                        <Search className="w-6 h-6 text-yellow-300" />
                      </div>
                      <div className="text-left">
                        <p className="text-xl font-black text-white">Մակարդակի թեստ</p>
                        <p className="text-xs font-bold text-yellow-200 uppercase tracking-widest">Placement Test</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-yellow-300 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'learn' ? (
            <motion.div
              key="learn-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full space-y-6 pb-12"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    {selectedTopic?.icon}
                    {selectedTopic?.nameArm}
                  </h2>
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">{selectedTopic?.nameEng}</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {selectedTopic?.words.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 hover:bg-white/10 p-4 rounded-3xl border border-white/10 flex items-center gap-4 transition-all"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0">
                        <img src={item.imageUrl} alt={item.correctSp} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">{item.wordArm}</p>
                          <p className="text-[10px] font-medium text-blue-300/60 italic">({item.wordEng})</p>
                        </div>
                        <p className="text-2xl font-black text-white">{item.correctSp}</p>
                      </div>
                      <Volume2 className="w-6 h-6 text-white/40 hover:text-white cursor-pointer" />
                    </motion.div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setActiveTab('test');
                    resetQuiz();
                  }}
                  className="w-full mt-8 py-5 bg-white text-[#1e40af] rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center"
                >
                  <div className="flex items-center gap-2">
                    <span>Սկսել թեստը</span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Start Test</span>
                </button>
              </div>
            </motion.div>
          ) : showResults ? (
            <motion.div
              key="results"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl text-center w-full"
            >
              {activeTab === 'diagnostic' ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#1e40af] mb-6 shadow-xl">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black mb-2">Արդյունքներ</h2>
                  <p className="text-blue-200 uppercase text-xs font-bold tracking-widest mb-8">Placement Results</p>
                  
                  <div className="w-full bg-white/5 rounded-3xl p-6 border border-white/10 mb-8 text-left">
                    <p className="text-blue-200 text-xs font-bold uppercase mb-1">Քո մակարդակը / Your Level:</p>
                    <p className="text-2xl font-black text-white mb-4">{getRecommendation().level}</p>
                    
                    <p className="text-blue-200 text-xs font-bold uppercase mb-2">Խորհուրդ տրվող թեմաներ / Recommended Topics:</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {getRecommendation().topics.map((topic, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/30 rounded-full text-xs font-bold border border-blue-400/30">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-sm text-white/80 italic leading-relaxed">
                      {getRecommendation().message}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setActiveTab('topics')}
                    className="w-full py-5 bg-white text-[#1e40af] rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Ընտրել թեման
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="relative inline-block mb-8">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#1e40af] shadow-2xl">
                      <Trophy className="w-12 h-12" />
                    </div>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-2 border-2 border-dashed border-white/30 rounded-full"
                    />
                  </div>

                  <h2 className="text-4xl font-black mb-1">Խաղն ավարտվեց:</h2>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-[0.2em] mb-4">Game Over</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-8 h-8 ${i < Math.round((score/totalQuestions)*5) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                    ))}
                  </div>

                  <p className="text-xl text-blue-100 mb-10">
                    Դուք հավաքեցիք <span className="text-white font-black text-4xl">{score}</span> միավոր {totalQuestions}-ից:
                    <br />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">You scored {score} out of {totalQuestions}</span>
                  </p>
                  
                  <div className="flex flex-col gap-4 w-full">
                    <button
                      onClick={resetQuiz}
                      className="w-full py-5 bg-white text-[#1e40af] rounded-[24px] font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center"
                    >
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-6 h-6" />
                        <span>Նորից խաղալ</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Play Again</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('topics')}
                      className="w-full py-4 bg-white/10 text-white rounded-[24px] font-bold border border-white/20 hover:bg-white/20 transition-all flex flex-col items-center justify-center"
                    >
                      <span>Ընտրել այլ թեմա</span>
                      <span className="text-[8px] uppercase tracking-widest opacity-60">Choose Another Topic</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={currentIdx + activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-6 sm:p-8 border border-white/20 shadow-2xl flex flex-col gap-6">
                
                {activeTab === 'diagnostic' ? (
                  <div className="flex flex-col gap-8 py-4">
                    <div className="text-center">
                      <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">Placement Test</p>
                      <h3 className="text-2xl font-black text-white leading-tight">
                        { (currentData as DiagnosticQuestion).question }
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      { (currentData as DiagnosticQuestion).options.map((option, i) => {
                        const isSelected = selectedOption === option;
                        const isCorrectOption = option === (currentData as DiagnosticQuestion).correct;
                        
                        let btnClass = "bg-white/10 hover:bg-white/20 border-white/10 text-white";
                        if (selectedOption !== null) {
                          if (isCorrectOption) btnClass = "bg-green-500/40 border-green-500 text-white";
                          else if (isSelected) btnClass = "bg-red-500/40 border-red-500 text-white";
                          else btnClass = "bg-white/5 border-white/5 opacity-30";
                        }
                        
                        return (
                          <button
                            key={i}
                            onClick={() => handleOptionClick(option)}
                            disabled={selectedOption !== null}
                            className={`p-5 rounded-2xl border-2 font-bold text-lg transition-all active:scale-95 flex items-center justify-between ${btnClass}`}
                          >
                            {option}
                            {selectedOption !== null && isCorrectOption && <CheckCircle2 className="w-5 h-5" />}
                            {selectedOption !== null && isSelected && !isCorrectOption && <XCircle className="w-5 h-5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Image Container */}
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden border-4 border-white/20 shadow-inner bg-black/20">
                      {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        </div>
                      )}
                      <img 
                        src={(currentData as WordData).imageUrl} 
                        alt="Word" 
                        referrerPolicy="no-referrer"
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex flex-col items-center">
                        <p className="text-xl sm:text-2xl font-black tracking-wide text-white leading-none">
                          {(currentData as WordData).wordArm}
                        </p>
                        <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-1">
                          {(currentData as WordData).wordEng}
                        </p>
                      </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {(currentData as WordData).options.map((option, i) => {
                        const isSelected = selectedOption === option;
                        const isCorrectOption = option === (currentData as WordData).correctSp;
                        
                        let btnClass = "bg-white/10 hover:bg-white/20 border-white/10 text-white";
                        if (selectedOption !== null) {
                          if (isCorrectOption) btnClass = "bg-green-500/40 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                          else if (isSelected) btnClass = "bg-red-500/40 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]";
                          else btnClass = "bg-white/5 border-white/5 opacity-30 text-white/50";
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => handleOptionClick(option)}
                            disabled={selectedOption !== null}
                            className={`p-4 sm:p-6 rounded-2xl border-2 font-black text-lg sm:text-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${btnClass}`}
                          >
                            {option}
                            {selectedOption !== null && isCorrectOption && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                            {selectedOption !== null && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Feedback Area */}
                <AnimatePresence>
                  {isCorrect !== null && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="flex flex-col gap-4"
                    >
                      <div className={`p-4 rounded-2xl flex items-center justify-between ${
                        isCorrect ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                            {isCorrect ? <Sparkles className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-black text-lg leading-none">{isCorrect ? 'Գերազանց է!' : 'Ոչինչ, փորձիր նորից:'}</p>
                            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{isCorrect ? 'Excellent!' : 'Try again!'}</p>
                            {!isCorrect && <p className="text-xs font-bold opacity-80 mt-1">Correct: {activeTab === 'diagnostic' ? (currentData as DiagnosticQuestion).correct : (currentData as WordData).correctSp}</p>}
                          </div>
                        </div>
                        <Volume2 className="w-6 h-6 opacity-40 cursor-pointer hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <button
                        onClick={nextQuestion}
                        className="w-full py-5 bg-white text-[#1e40af] rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center"
                      >
                        <div className="flex items-center gap-2">
                          <span>{currentIdx === totalQuestions - 1 ? 'Արդյունքներ' : 'Հաջորդը'}</span>
                          <ArrowRight className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                          {currentIdx === totalQuestions - 1 ? 'Results' : 'Next'}
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/40 text-[10px] font-bold tracking-widest uppercase">
        Իսպաներենի Ուսուցում • Spanish Learning • Saludos
      </footer>
    </div>
  );
}
