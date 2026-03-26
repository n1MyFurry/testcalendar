'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Dumbbell,
  Headphones,
  Mic,
  PenSquare,
  Search,
  Target,
  Train,
  Trophy
} from 'lucide-react';

type LessonType = 'study' | 'listening' | 'writing' | 'speaking' | 'review';

type Lesson = {
  id: number;
  date: Date;
  month: number;
  unit: number;
  type: LessonType;
  title: string;
  focus: string;
  textbook: string;
  theoryTitle: string;
  simpleExplanation: string;
  rules: string[];
  examples: string[];
  exercises: string[];
  tasksFromBook: string[];
  mentorTasks: string[];
  collocations: string[];
  dailyLoad: {
    work: string;
    english: string;
    metro: string;
    workout: string;
  };
};

const grammarBank = [
  {
    title: 'Present Simple vs Present Continuous',
    simple:
      'Есть две коробки. Первая — для того, что бывает обычно: I work, I study. Вторая — для того, что идёт сейчас или временно: I am working, I am studying. Если это привычка — Simple. Если это происходит прямо сейчас или в этот период — Continuous.',
    rules: [
      'Present Simple = привычки, факты, расписания.',
      'Present Continuous = сейчас, временно, уже в процессе.',
      'usually / often / every day → Simple; now / at the moment / these days → Continuous.'
    ],
    examples: [
      'I work six days a week.',
      'I am working on my English this month.',
      'She usually takes the metro, but today she is walking.'
    ],
    exercises: [
      'Сделай 5 предложений о своих привычках.',
      'Сделай 5 предложений о том, что происходит у тебя сейчас.',
      'Объясни разницу: I live in Riga / I am living with my family this month.'
    ]
  },
  {
    title: 'Past Simple vs Past Continuous',
    simple:
      'Past Simple — это короткий факт в прошлом: I watched a film. Past Continuous — это фон и процесс: I was watching a film when you called. Как будто камера уже снимала сцену, а потом что-то произошло.',
    rules: [
      'Past Simple = завершённое действие.',
      'Past Continuous = процесс в прошлом.',
      'Часто вместе: while + Continuous, when + Simple.'
    ],
    examples: [
      'I was studying when my friend texted me.',
      'We watched a film last night.',
      'She was sleeping while I was working.'
    ],
    exercises: [
      'Напиши 3 предложения с when.',
      'Напиши 3 предложения с while.',
      'Расскажи про вчерашний день, используя оба времени.'
    ]
  },
  {
    title: 'Present Perfect vs Past Simple',
    simple:
      'Past Simple любит точное прошлое: yesterday, last year. Present Perfect любит опыт и результат без точной даты: I have finished, I have been to London. Если важен результат сейчас — Perfect. Если важна дата — Past Simple.',
    rules: [
      'Past Simple = законченное прошлое с временем.',
      'Present Perfect = опыт, результат, связь с настоящим.',
      'Нельзя: I have seen him yesterday. Нужно: I saw him yesterday.'
    ],
    examples: [
      'I have done my homework.',
      'I did my homework last night.',
      'She has never tried shadowing before.'
    ],
    exercises: [
      'Составь 6 предложений: 3 с Present Perfect, 3 с Past Simple.',
      'Напиши 5 вещей, которые ты уже сделал в этом году.',
      'Напиши 5 вещей, которые ты сделал вчера.'
    ]
  },
  {
    title: 'Future Forms',
    simple:
      'У будущего в английском несколько коробок. will — решение сейчас или прогноз. going to — план. Present Continuous — уже договорились. Present Simple — расписание. Выбирай коробку по смыслу.',
    rules: [
      'will = spontaneous decision / prediction.',
      'going to = intention / evidence.',
      'Present Continuous = arrangement.',
      'Present Simple = timetable.'
    ],
    examples: [
      'I will call you later.',
      'I am going to study tonight.',
      'I am meeting my friend tomorrow.',
      'The train leaves at 7.'
    ],
    exercises: [
      'Напиши 2 примера на каждый тип будущего.',
      'Опиши свои планы на неделю.',
      'Сделай 4 прогноза про свой английский через 4 месяца.'
    ]
  },
  {
    title: 'Modal Verbs',
    simple:
      'Modal verbs — это маленькие помощники. can = могу, must = обязан, should = стоит, might = возможно. Они как кнопки: возможность, обязанность, совет, вероятность.',
    rules: [
      'После modal verb идёт глагол без to.',
      'must / have to похожи, но не одинаковы.',
      'might / may = возможно.'
    ],
    examples: [
      'You should practise every day.',
      'I must finish this task.',
      'She might be late.'
    ],
    exercises: [
      'Дай себе 5 советов на английском.',
      'Напиши 5 правил для сильного ученика.',
      'Скажи 5 вероятных событий на этой неделе.'
    ]
  },
  {
    title: 'Conditionals',
    simple:
      'Conditional — это “если”. If I study today, I will improve. Один кусок — условие, второй — результат. Так ты говоришь о реальных и нереальных ситуациях.',
    rules: [
      'First: If + Present, will + verb.',
      'Second: If + Past, would + verb.',
      'Third: If + had + V3, would have + V3.'
    ],
    examples: [
      'If I study hard, I will pass.',
      'If I had more time, I would travel.',
      'If I had revised, I would have felt calmer.'
    ],
    exercises: [
      'Напиши 3 first conditionals.',
      'Напиши 3 second conditionals.',
      'Напиши 3 third conditionals.'
    ]
  },
  {
    title: 'Passive Voice',
    simple:
      'Passive нужен, когда важнее действие, чем тот, кто его сделал. Active: People speak English here. Passive: English is spoken here.',
    rules: [
      'Формула: be + V3.',
      'Используй, когда исполнитель неизвестен или неважен.',
      'Можно использовать в разных временах.'
    ],
    examples: [
      'English is spoken all over the world.',
      'The homework was finished last night.',
      'The lesson has been prepared already.'
    ],
    exercises: [
      'Переделай 6 active предложений в passive.',
      'Опиши, как делают кофе, используя passive.',
      'Скажи, какие языки изучаются в школах.'
    ]
  },
  {
    title: 'Reported Speech',
    simple:
      'Это когда ты не цитируешь слово в слово, а пересказываешь. He said, “I am tired.” → He said that he was tired. Ты передаёшь чужие слова своей речью.',
    rules: [
      'Часто время сдвигается на шаг назад.',
      'Меняются указатели времени: today → that day.',
      'say и tell работают по-разному.'
    ],
    examples: [
      'She said that she was busy.',
      'He told me that he had finished.',
      'They said they would come later.'
    ],
    exercises: [
      'Переделай 5 прямых фраз в reported speech.',
      'Перескажи короткий диалог.',
      'Напиши 5 предложений с said и 5 с told.'
    ]
  }
];

const collocationBank = [
  'make progress',
  'do revision',
  'take notes',
  'build confidence',
  'catch a train',
  'miss an opportunity',
  'reach a goal',
  'raise awareness',
  'heavy workload',
  'strong accent'
];

const writingBank = [
  'My current routine and how I want to improve it',
  'Why consistency beats motivation',
  'The best way to learn a language',
  'How technology changes our lives',
  'A skill I want to master this year',
  'Why discipline matters more than talent'
];

const monthlyGoals = [
  {
    month: 1,
    title: 'Месяц 1 — База и дисциплина',
    goals: [
      'Привыкнуть к ежедневному ритму без пропусков.',
      'Разобраться с ключевыми временами и базовой логикой английского.',
      'Начать говорить вслух каждый день.',
      'Собрать первые 150–200 активных слов и фраз.'
    ]
  },
  {
    month: 2,
    title: 'Месяц 2 — Ускорение',
    goals: [
      'Уверенно слышать структуру фразы в аудио.',
      'Подтянуть conditionals, passive, reported speech.',
      'Начать строить длинные ответы без паники.',
      'Делать письменно не только правильно, но и логично.'
    ]
  },
  {
    month: 3,
    title: 'Месяц 3 — Выход в речь',
    goals: [
      'Говорить дольше и свободнее.',
      'Использовать linking words и collocations.',
      'Чаще пересказывать, объяснять и аргументировать.',
      'Начать звучать увереннее.'
    ]
  },
  {
    month: 4,
    title: 'Месяц 4 — C1 режим',
    goals: [
      'Собирать все навыки вместе.',
      'Говорить более гибко и естественно.',
      'Быстро замечать и чинить типичные ошибки.',
      'Выйти на сильную самостоятельную систему.'
    ]
  }
];

const speakingScripts = [
  {
    title: 'Self-introduction',
    prompt: 'Расскажи о себе так, как будто знакомишься с новым человеком в Англии.',
    frame: ['Who you are', 'What you do', 'What your routine is like', 'Why you are learning English now']
  },
  {
    title: 'Daily routine',
    prompt: 'Опиши свой обычный день и выдели, что ты хочешь улучшить.',
    frame: ['Morning', 'Work', 'Study', 'Evening habits']
  },
  {
    title: 'Opinion',
    prompt: 'Выскажи мнение на тему привычек, дисциплины или технологий.',
    frame: ['My opinion', 'Reason 1', 'Reason 2', 'Example', 'Conclusion']
  },
  {
    title: 'Storytelling',
    prompt: 'Расскажи историю о ситуации, когда ты ошибся, но чему-то научился.',
    frame: ['Setting', 'Problem', 'What happened', 'What you learnt']
  }
];

const weeklyReviewTemplate = [
  'Что я сделал хорошо на этой неделе?',
  'Где я тормозил или ленился?',
  'Какие 3 ошибки повторялись чаще всего?',
  'Что я улучшу на следующей неделе?'
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    weekday: 'short'
  }).format(date);
}

function typeLabel(type: LessonType) {
  if (type === 'study') return 'Учебник';
  if (type === 'listening') return 'Аудирование';
  if (type === 'writing') return 'Письмо';
  if (type === 'speaking') return 'Говорение';
  return 'Повторение';
}

function buildLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  const startDate = new Date('2026-03-30T00:00:00');

  for (let i = 0; i < 120; i += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const weekday = date.getDay();
    const unit = Math.min(40, Math.floor(i / 3) + 1);
    const grammar = grammarBank[i % grammarBank.length];
    const collocations = [
      collocationBank[i % collocationBank.length],
      collocationBank[(i + 2) % collocationBank.length],
      collocationBank[(i + 5) % collocationBank.length]
    ];

    let lesson: Lesson = {
      id: i + 1,
      date,
      month: Math.floor(i / 30) + 1,
      unit,
      type: 'study',
      title: `Урок ${i + 1}. Grammar + Unit ${unit}`,
      focus: 'Учебник + понятная грамматика + закрепление',
      textbook: `English File Advanced — Unit ${unit}; Advanced Grammar in Use — тема по плану.`,
      theoryTitle: grammar.title,
      simpleExplanation: grammar.simple,
      rules: grammar.rules,
      examples: grammar.examples,
      exercises: grammar.exercises,
      tasksFromBook: [
        `Открой English File Advanced, Unit ${unit}. Пройди 1 разворот: reading / listening / vocabulary / grammar по порядку.`,
        'Сделай упражнения из юнита письменно или устно.',
        'Если в юните встретилась трудная конструкция — сравни её с объяснением ниже.'
      ],
      mentorTasks: [
        `Скажи 5 предложений о себе по теме “${grammar.title}”.`,
        'Возьми 3 новых слова из урока и составь по 2 своих примера.',
        'В конце урока перескажи всё своими словами за 60 секунд.'
      ],
      collocations,
      dailyLoad: { work: '6–7 ч', english: '75–90 мин', metro: '30 мин', workout: '45 мин' }
    };

    if (weekday === 1 || weekday === 3) {
      lesson = {
        ...lesson,
        type: 'listening',
        title: `Урок ${i + 1}. Listening + Shadowing`,
        focus: 'Слух, произношение, словосочетания, автоматизация',
        textbook: `Аудио из English File Advanced Unit ${unit}.`,
        theoryTitle: 'Shadowing',
        simpleExplanation:
          'Shadowing — это как музыкальная тренировка для языка. Ты не просто слушаешь, а повторяешь сразу за диктором: ритм, интонацию, связки слов. Сначала тяжело, потом речь становится живее.',
        rules: [
          'Слушай кусок 10–20 секунд.',
          'Повтори вслух 5–7 раз.',
          'Не останавливайся на каждом слове — копируй мелодию.',
          'Потом скажи тот же смысл своими словами.'
        ],
        examples: [
          'I’ve been meaning to do that for ages.',
          'Actually, I’ve been trying to improve my English lately.',
          'To be honest, the thing is I need more speaking practice.'
        ],
        tasksFromBook: [
          `Включи аудио из Unit ${unit} и пройди listening block.`,
          'Повтори ключевой фрагмент из аудио 5–7 раз.',
          'Выпиши 5 полезных фраз, а не отдельные слова.'
        ],
        mentorTasks: [
          'Сделай shadowing 10–15 минут без пропуска.',
          'Запиши голосом 1 минуту пересказа.',
          `Используй collocations: ${collocations.join(', ')}.`
        ],
        exercises: [
          'Повтори 3 коротких фрагмента с разной интонацией.',
          'Перескажи услышанное сначала медленно, потом нормально.',
          'Сделай 5 своих предложений с фразами из аудио.'
        ]
      };
    }

    if (weekday === 6) {
      lesson = {
        ...lesson,
        type: 'writing',
        title: `Урок ${i + 1}. Writing Day`,
        focus: 'Письмо, логика, точность, использование новых слов',
        textbook: `English File Advanced — writing section Unit ${unit}.`,
        theoryTitle: 'Как писать понятно и сильно',
        simpleExplanation:
          'Хороший текст — это не сложные слова ради сложных слов. Это ясная мысль. Сначала скажи, о чём текст. Потом дай 2–3 идеи. Потом заверши выводом.',
        rules: [
          'Абзац 1 — тема и главный ответ.',
          'Абзац 2–3 — идеи и примеры.',
          'Последний абзац — короткий вывод.',
          'Используй firstly, however, as a result, in my view.'
        ],
        examples: [
          'In my view, consistency is more important than motivation.',
          'Firstly, regular practice builds habits.',
          'For this reason, daily effort matters more than short bursts of energy.'
        ],
        tasksFromBook: [
          `Открой writing section в Unit ${unit} и посмотри образец структуры.`,
          'Если есть полезные linking words в учебнике — выпиши их.',
          'Используй 5 слов или фраз из текущего юнита.'
        ],
        mentorTasks: [
          `Напиши 180–220 слов на тему: “${writingBank[i % writingBank.length]}”.`,
          `Используй 1 тему грамматики: ${grammar.title}.`,
          'Сделай самопроверку: артикли, времена, порядок слов, linking words.'
        ],
        exercises: [
          'Напиши вступление из 2 предложений.',
          'Напиши 2 основных абзаца с примерами из своей жизни.',
          'Сократи текст на 20 слов, чтобы сделать его чище и сильнее.'
        ]
      };
    }

    if (weekday === 0) {
      lesson = {
        ...lesson,
        type: 'speaking',
        title: `Урок ${i + 1}. Speaking Sprint`,
        focus: 'Разговор, беглость, уверенность, активизация грамматики',
        textbook: `English File Advanced — speaking section Unit ${unit}.`,
        theoryTitle: 'Как начать говорить без ступора',
        simpleExplanation:
          'Чтобы говорить, не надо ждать идеального английского. Сначала ты строишь короткие кирпичики: одна мысль, потом ещё одна, потом связь между ними. Беглость приходит после большого количества попыток.',
        rules: [
          'Говори вслух минимум 5–10 минут.',
          'Не переводи всё в голове слово в слово.',
          'Если застрял — перефразируй проще.',
          'После монолога переслушай себя и улучши 3 предложения.'
        ],
        examples: [
          'Today I want to talk about...',
          'Another point is that...',
          'I don’t know the exact word, but what I mean is...'
        ],
        tasksFromBook: [
          `Пройди speaking task из Unit ${unit}.`,
          'Ответь на 3 вопроса из секции speaking.',
          'Если есть useful language box — используй 3 выражения оттуда.'
        ],
        mentorTasks: [
          'Запиши 90 секунд монолога по теме юнита.',
          'Сделай второй дубль лучше и увереннее.',
          `Используй collocations: ${collocations.join(', ')}.`
        ],
        exercises: [
          'Ответь на вопрос “Why are you learning English now?” 3 разными способами.',
          'Сравни свою жизнь сейчас и год назад.',
          'Дай себе 5 советов по английскому с modal verbs.'
        ]
      };
    }

    if (weekday === 4) {
      lesson = {
        ...lesson,
        type: 'review',
        title: `Урок ${i + 1}. Review + Fix Day`,
        focus: 'Повторение, исправление дыр, закрепление материала',
        textbook: `Повтори Unit ${Math.max(1, unit - 1)}–${unit} и notes / vocabulary bank.`,
        theoryTitle: 'Почему повторение делает тебя сильным',
        simpleExplanation:
          'Когда ты повторяешь, мозг понимает: это важно. Без повторения знания как вода в руках. Повторение — это цемент между кирпичами.',
        rules: [
          'Сначала быстро вспомни без подсказки.',
          'Потом проверь себя по конспекту.',
          'Исправь ошибки и сразу сделай новый правильный пример.',
          'Повтори вслух то, что было слабым местом.'
        ],
        examples: [
          'I know. / не I am know.',
          'He goes. / не He go.',
          'I saw him yesterday. / не I have seen him yesterday.'
        ],
        tasksFromBook: [
          'Повтори vocabulary из двух последних уроков.',
          'Сделай revision block из учебника, если он есть.',
          'Выбери 1 старую тему и объясни её вслух без подсказки.'
        ],
        mentorTasks: [
          'Выпиши 10 ошибок, которые ты делал раньше или можешь сделать.',
          'Исправь каждую и придумай новый пример.',
          'Сделай мини-тест самому себе на 10 вопросов.'
        ],
        exercises: [
          'Перескажи 3 грамматические темы за 3 минуты.',
          'Сделай 10 быстрых устных предложений на разные времена.',
          'Повтори 8 collocations и вставь их в живые примеры.'
        ]
      };
    }

    lessons.push(lesson);
  }

  return lessons;
}

const lessons = buildLessons();

export default function Page() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [query, setQuery] = useState('');
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [weakSpots] = useState({ grammar: 2, listening: 3, speaking: 4, writing: 2, vocabulary: 3 });

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const hay = `${lesson.title} ${lesson.focus} ${lesson.theoryTitle} ${lesson.textbook}`.toLowerCase();
      return hay.includes(query.toLowerCase());
    });
  }, [query]);

  const lesson = lessons.find((l) => l.id === selectedDay) ?? lessons[0];
  const completedCount = Object.values(done).filter(Boolean).length;
  const completion = Math.round((completedCount / lessons.length) * 100);
  const currentMonthGoal = monthlyGoals.find((m) => m.month === lesson.month) ?? monthlyGoals[0];

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="page">
      <div className="container">
        <section className="card hero">
          <div className="hero-top">
            <div>
              <div className="badges">
                <span className="badge dark">C1 Mentor Mode</span>
                <span className="badge">120 дней</span>
              </div>
              <h1>Сайт‑ментор по английскому на 4 месяца</h1>
              <p>
                Открываешь день, видишь урок, понятное объяснение, задания по учебнику, мои задания,
                закрепление и контроль прогресса. Никаких размышлений о том, что учить — просто выполняешь.
              </p>
            </div>
            <div className="progress-box">
              <div className="muted">Прогресс</div>
              <div className="progress-big">{completedCount} / {lessons.length}</div>
              <div className="progress-line">
                <div className="progress-fill" style={{ width: `${completion}%` }} />
              </div>
              <div className="muted" style={{ marginTop: 10 }}>{completion}% выполнено</div>
            </div>
          </div>

          <div className="info-grid">
            <div className="stat"><div className="stat-head">Учёба</div><div className="stat-value">{lesson.dailyLoad.english}</div></div>
            <div className="stat"><div className="stat-head">Работа</div><div className="stat-value">{lesson.dailyLoad.work}</div></div>
            <div className="stat"><div className="stat-head">Метро</div><div className="stat-value">{lesson.dailyLoad.metro}</div></div>
            <div className="stat"><div className="stat-head">Тренировка</div><div className="stat-value">{lesson.dailyLoad.workout}</div></div>
          </div>

          <div className="mini-grid">
            <div className="mini-box"><div className="muted">Фокус месяца</div><div className="stat-value">{currentMonthGoal.title}</div></div>
            <div className="mini-box"><div className="muted">Сегодняшний режим</div><div className="stat-value">Открыл день → сделал по шагам → отметил</div></div>
            <div className="mini-box"><div className="muted">Главное правило</div><div className="stat-value">Говорить вслух каждый день</div></div>
          </div>
        </section>

        <div className="bottom-grid">
          <aside className="card sidebar">
            <div>
              <h3 style={{ margin: 0 }}>Календарь уроков</h3>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: 25, color: '#667085' }} />
                <input className="search" style={{ paddingLeft: 34 }} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по урокам и темам" />
              </div>
            </div>
            <div className="days">
              {filteredLessons.map((item) => (
                <button key={item.id} className={`day-button ${item.id === selectedDay ? 'active' : ''}`} onClick={() => setSelectedDay(item.id)}>
                  <div className="small">{formatDate(item.date)}</div>
                  <div style={{ fontWeight: 700, marginTop: 6 }}>День {item.id}. {item.title}</div>
                  <div className="small" style={{ marginTop: 8 }}>{item.focus}</div>
                  <div className="chip-row" style={{ marginTop: 10 }}>
                    <span className="chip">Месяц {item.month}</span>
                    <span className="chip">{typeLabel(item.type)}</span>
                    <span className="chip">Unit {item.unit}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <main className="main">
            <section className="card section">
              <div className="section-title">
                <div className="title-wrap">
                  <div className="badges">
                    <span className="badge">День {lesson.id}</span>
                    <span className="badge">{formatDate(lesson.date)}</span>
                    <span className="badge">{typeLabel(lesson.type)}</span>
                  </div>
                  <div className="lesson-title"><BookOpen size={34} /> {lesson.title}</div>
                  <div className="muted">{lesson.focus}</div>
                </div>
                <button className="btn" onClick={() => setDone((prev) => ({ ...prev, [lesson.id]: !prev[lesson.id] }))}>
                  {done[lesson.id] ? 'Отметить как не сделано' : 'Отметить как сделано'}
                </button>
              </div>
              <div className="list-item" style={{ marginTop: 18 }}>
                <div className="muted">Работаем с учебником</div>
                <div className="stat-value">{lesson.textbook}</div>
              </div>
            </section>

            <div className="lesson-grid">
              <section className="card section">
                <h2>Тема дня: {lesson.theoryTitle}</h2>
                <div style={{ marginTop: 18 }}>
                  <h3>Объяснение очень простыми словами</h3>
                  <p style={{ lineHeight: 1.7 }}>{lesson.simpleExplanation}</p>
                </div>
                <div>
                  <h3>Короткие правила</h3>
                  <ul className="clean" style={{ marginTop: 10 }}>{lesson.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
                </div>
                <div>
                  <h3>Примеры</h3>
                  <ul className="clean" style={{ marginTop: 10 }}>{lesson.examples.map((example) => <li key={example}>{example}</li>)}</ul>
                </div>
              </section>

              <section className="card section">
                <h2>Что делать сегодня</h2>
                <div style={{ marginTop: 18 }}>
                  <h3>Задания по учебнику</h3>
                  <ul className="clean" style={{ marginTop: 10 }}>{lesson.tasksFromBook.map((task) => <li key={task}>{task}</li>)}</ul>
                </div>
                <div style={{ marginTop: 18 }}>
                  <h3>Мои задания для закрепления</h3>
                  <ul className="clean" style={{ marginTop: 10 }}>{lesson.mentorTasks.map((task) => <li key={task}>{task}</li>)}</ul>
                </div>
                <div style={{ marginTop: 18 }}>
                  <h3>Полезные сочетания дня</h3>
                  <div className="chip-row" style={{ marginTop: 10 }}>{lesson.collocations.map((c) => <span key={c} className="chip">{c}</span>)}</div>
                </div>
              </section>
            </div>

            <div className="triple-grid">
              <section className="card section">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock3 size={24} /> Фокус-таймер</h2>
                <div className="timer">{minutes}:{seconds}</div>
                <div className="timer-actions">
                  <button className="btn secondary" onClick={() => { setSecondsLeft(10 * 60); setTimerRunning(false); }}>10 мин</button>
                  <button className="btn secondary" onClick={() => { setSecondsLeft(15 * 60); setTimerRunning(false); }}>15 мин</button>
                  <button className="btn secondary" onClick={() => { setSecondsLeft(25 * 60); setTimerRunning(false); }}>25 мин</button>
                </div>
                <div className="timer-main" style={{ marginTop: 8 }}>
                  <button className="btn" onClick={() => setTimerRunning(true)}>Старт</button>
                  <button className="btn secondary" onClick={() => setTimerRunning(false)}>Пауза</button>
                </div>
              </section>

              <section className="card section">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Target size={24} /> Слабые места</h2>
                <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
                  {Object.entries(weakSpots).map(([skill, value]) => (
                    <div className="skill-row" key={skill}>
                      <div className="skill-head"><span>{skill}</span><span>{value}/5</span></div>
                      <div className="small-progress"><div style={{ width: `${value * 20}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="list-item" style={{ marginTop: 16 }}>Чем выше число, тем больше внимания навык просит.</div>
              </section>

              <section className="card section">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Trophy size={24} /> Цели месяца</h2>
                <ul className="clean" style={{ marginTop: 18 }}>{currentMonthGoal.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
              </section>
            </div>

            <section className="card section">
              <h2>Закрепление</h2>
              <div className="triple-grid" style={{ marginTop: 18 }}>
                {lesson.exercises.map((exercise, idx) => (
                  <div className="exercise" key={exercise}><div className="muted">Задание {idx + 1}</div><div className="stat-value">{exercise}</div></div>
                ))}
              </div>
            </section>

            <div className="two-grid">
              <section className="card section">
                <h2>Speaking scripts</h2>
                <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
                  {speakingScripts.map((script) => (
                    <div key={script.title} className="script">
                      <div className="stat-value">{script.title}</div>
                      <div style={{ marginTop: 8, lineHeight: 1.6 }}>{script.prompt}</div>
                      <div className="chip-row" style={{ marginTop: 12 }}>{script.frame.map((part) => <span key={part} className="chip">{part}</span>)}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="card section">
                <h2>Weekly review</h2>
                <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
                  {weeklyReviewTemplate.map((item, idx) => (
                    <div key={item} className="review-item"><div className="muted">Вопрос {idx + 1}</div><div className="stat-value">{item}</div></div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
