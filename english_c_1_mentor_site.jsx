import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CalendarDays, CheckCircle2, Clock3, Dumbbell, Headphones, Mic, PenSquare, Search, Target, Train, Trophy } from "lucide-react";

const grammarBank = [
  {
    key: "present-simple-continuous",
    title: "Present Simple vs Present Continuous",
    simple: "Представь, что есть два ящика. Первый — для того, что происходит обычно: I work, I study, I go. Второй — для того, что происходит прямо сейчас или временно: I am working, I am studying. Если это привычка — Present Simple. Если это происходит сейчас или в этот период — Present Continuous.",
    rules: [
      "Present Simple = привычки, факты, расписания.",
      "Present Continuous = сейчас, временно, уже в процессе.",
      "Слова-маркеры: usually, often, every day → Simple; now, at the moment, these days → Continuous."
    ],
    examples: [
      "I work six days a week.",
      "I am working on my English this month.",
      "She usually takes the metro, but today she is walking."
    ],
    exercises: [
      "Сделай 5 предложений о своих привычках.",
      "Сделай 5 предложений о том, что происходит у тебя в жизни сейчас.",
      "Сравни: I live in Riga / I am living with my family this month. Объясни разницу."
    ]
  },
  {
    key: "past-simple-continuous",
    title: "Past Simple vs Past Continuous",
    simple: "Past Simple — это короткий готовый факт в прошлом: I watched a film. Past Continuous — это фон, длинное действие в прошлом: I was watching a film when you called. Как будто камера уже снимала сцену, а потом что-то случилось.",
    rules: [
      "Past Simple = завершённое действие.",
      "Past Continuous = процесс в прошлом.",
      "Часто вместе: while + Continuous, when + Simple."
    ],
    examples: [
      "I was studying when my friend texted me.",
      "We watched a film last night.",
      "She was sleeping while I was working."
    ],
    exercises: [
      "Напиши 3 предложения с when.",
      "Напиши 3 предложения с while.",
      "Расскажи про вчерашний день, используя оба времени."
    ]
  },
  {
    key: "present-perfect-past-simple",
    title: "Present Perfect vs Past Simple",
    simple: "Past Simple любит точное прошлое: yesterday, last year, in 2024. Present Perfect любит результат и опыт без точной даты: I have finished, I have been to London. Если важен сам факт или результат сейчас — Perfect. Если важна дата — Past Simple.",
    rules: [
      "Past Simple = законченное прошлое с временем.",
      "Present Perfect = опыт, результат, связь с настоящим.",
      "Нельзя говорить: I have seen him yesterday. Нужно: I saw him yesterday."
    ],
    examples: [
      "I have done my homework.",
      "I did my homework last night.",
      "She has never tried shadowing before."
    ],
    exercises: [
      "Составь 6 предложений: 3 с Present Perfect, 3 с Past Simple.",
      "Напиши 5 вещей, которые ты уже сделал в этом году.",
      "Напиши 5 вещей, которые ты сделал вчера."
    ]
  },
  {
    key: "present-perfect-continuous",
    title: "Present Perfect Continuous",
    simple: "Это время для действий, которые начались раньше и всё ещё идут или только что закончились, и нам важна длительность: I have been studying for two hours. Как будто действие тянется ниточкой из прошлого в сейчас.",
    rules: [
      "Формула: have/has been + verb-ing.",
      "Часто используется с for и since.",
      "Важно не только что сделал, а как долго делал."
    ],
    examples: [
      "I have been learning English for four months.",
      "She has been working all day.",
      "We have been waiting since 9 a.m."
    ],
    exercises: [
      "Напиши 5 предложений с for.",
      "Напиши 5 предложений с since.",
      "Скажи, что ты делаешь в последнее время."
    ]
  },
  {
    key: "future-forms",
    title: "Future Forms",
    simple: "У будущего в английском несколько коробок. will — решение сейчас или прогноз. going to — план или очевидный результат. Present Continuous — уже договорились. Present Simple — расписание. Выбирай коробку по смыслу, а не наугад.",
    rules: [
      "will = spontaneous decision / prediction.",
      "going to = intention / evidence.",
      "Present Continuous = arrangement.",
      "Present Simple = timetable."
    ],
    examples: [
      "I will call you later.",
      "I am going to study tonight.",
      "I am meeting my friend tomorrow.",
      "The train leaves at 7."
    ],
    exercises: [
      "Напиши 2 примера на каждый тип будущего.",
      "Опиши свои планы на неделю.",
      "Сделай 4 прогноза про свой английский через 4 месяца."
    ]
  },
  {
    key: "modal-verbs",
    title: "Modal Verbs",
    simple: "Modal verbs — это маленькие помощники, которые меняют настроение фразы. can = могу, must = обязан, should = стоит, might = возможно. Они как кнопки: возможность, обязанность, совет, вероятность.",
    rules: [
      "После modal verb идёт глагол без to.",
      "must / have to похожи, но must чаще про внутреннюю обязанность, have to — внешнее правило.",
      "might / may = возможно."
    ],
    examples: [
      "You should practise every day.",
      "I must finish this task.",
      "She might be late."
    ],
    exercises: [
      "Дай себе 5 советов на английском.",
      "Напиши 5 правил для сильного ученика.",
      "Скажи 5 вероятных событий на этой неделе."
    ]
  },
  {
    key: "conditionals-zero-first",
    title: "Zero and First Conditionals",
    simple: "Conditional — это “если”. Zero Conditional — правда всегда: If you heat ice, it melts. First Conditional — реальное будущее: If I study today, I will improve. Один — закон природы, второй — реальный шанс.",
    rules: [
      "Zero: If + Present, Present.",
      "First: If + Present, will + verb.",
      "В части с if не ставим will."
    ],
    examples: [
      "If I revise, I remember more.",
      "If I study hard, I will pass.",
      "If you don’t practise, your speaking will stay weak."
    ],
    exercises: [
      "Напиши 5 zero conditionals.",
      "Напиши 5 first conditionals о своей учебе.",
      "Сделай мини-монолог: What will happen if I keep going for 120 days?"
    ]
  },
  {
    key: "conditionals-second-third-mixed",
    title: "Second, Third and Mixed Conditionals",
    simple: "Second Conditional — воображение сейчас: If I had more time, I would travel. Third Conditional — сожаление о прошлом: If I had studied, I would have passed. Mixed Conditional — смешиваем прошлое и настоящее: If I had slept more, I would feel better now.",
    rules: [
      "Second: If + Past, would + verb.",
      "Third: If + had + V3, would have + V3.",
      "Mixed: прошлое условие + результат сейчас."
    ],
    examples: [
      "If I were richer, I would move abroad.",
      "If I had revised, I would have felt calmer.",
      "If I had gone to bed earlier, I would be more focused now."
    ],
    exercises: [
      "Напиши 3 second conditionals.",
      "Напиши 3 third conditionals.",
      "Напиши 3 mixed conditionals про свою жизнь."
    ]
  },
  {
    key: "passive-voice",
    title: "Passive Voice",
    simple: "Passive нужен, когда важнее действие, чем тот, кто его сделал. Active: People speak English here. Passive: English is spoken here. Как будто камеру поворачиваем с человека на действие.",
    rules: [
      "Формула: be + V3.",
      "Используется, когда исполнитель неизвестен, неважен или очевиден.",
      "Можно использовать в разных временах: is made, was built, has been done."
    ],
    examples: [
      "English is spoken all over the world.",
      "The homework was finished last night.",
      "The lesson has been prepared already."
    ],
    exercises: [
      "Переделай 6 active предложений в passive.",
      "Опиши, как делают кофе, используя passive.",
      "Скажи, какие языки изучаются в школах."
    ]
  },
  {
    key: "reported-speech",
    title: "Reported Speech",
    simple: "Это когда ты не цитируешь слово в слово, а пересказываешь. Direct: He said, “I am tired.” Reported: He said that he was tired. Как будто ты передаёшь чужие слова своей речью.",
    rules: [
      "Часто время сдвигается на шаг назад.",
      "Меняются указатели времени: today → that day, now → then.",
      "say и tell работают по-разному: say something, tell someone something."
    ],
    examples: [
      "She said that she was busy.",
      "He told me that he had finished.",
      "They said they would come later."
    ],
    exercises: [
      "Переделай 5 прямых фраз в reported speech.",
      "Перескажи короткий диалог.",
      "Напиши 5 предложений с said и 5 с told."
    ]
  },
  {
    key: "relative-clauses",
    title: "Relative Clauses",
    simple: "Relative clauses — это хвостики, которые добавляют информацию: The book that I bought is useful. Они делают речь умнее и связнее. Это как прикрепить к предмету маленькую записку с пояснением.",
    rules: [
      "who — люди, which — вещи, where — места, whose — принадлежность.",
      "Defining clauses важны для смысла; non-defining — это дополнительная информация.",
      "В разговорной речи that часто заменяет who/which в defining clauses."
    ],
    examples: [
      "The app that I use every day is very simple.",
      "My friend, who lives in London, is a designer.",
      "This is the place where I study."
    ],
    exercises: [
      "Соедини 8 коротких предложений в 4 длинных.",
      "Опиши 3 человека, 3 вещи и 2 места через relative clauses.",
      "Напиши абзац о своём дне, используя минимум 4 relative clauses."
    ]
  },
  {
    key: "articles-quantifiers",
    title: "Articles and Quantifiers",
    simple: "a/an — один из многих, the — конкретный и понятный, zero article — когда артикль не нужен. Quantifiers — это слова для количества: much, many, a few, a little, plenty of. Они помогают говорить не “много”, а точно и красиво.",
    rules: [
      "a/an = впервые упоминаем, один предмет.",
      "the = конкретный, уже известный.",
      "many/few — исчисляемые; much/little — неисчисляемые."
    ],
    examples: [
      "I bought a book. The book is excellent.",
      "There isn’t much time.",
      "I have a few close friends."
    ],
    exercises: [
      "Вставь артикли в 10 предложений.",
      "Сделай 5 предложений с many/much.",
      "Сделай 5 предложений с a few / a little / plenty of."
    ]
  },
  {
    key: "inversion-cleft-subjunctive",
    title: "Inversion, Cleft Sentences, Subjunctive",
    simple: "Это уже уровень “умная речь”. Inversion делает фразу сильной: Never have I seen… Cleft sentences выделяют главное: What I need is rest. Subjunctive звучит формально и продвинуто: I suggest that he be informed. Это инструменты для C1-эффекта.",
    rules: [
      "Inversion часто после negative adverbials: never, rarely, only then.",
      "Cleft sentences = What/It structure для акцента.",
      "Subjunctive чаще в формальном английском после suggest, recommend, insist."
    ],
    examples: [
      "Never have I felt so motivated.",
      "What I need is more speaking practice.",
      "I suggest that he study every day."
    ],
    exercises: [
      "Сделай 3 предложения с inversion.",
      "Сделай 3 cleft sentences.",
      "Напиши 3 формальных совета с subjunctive."
    ]
  }
];

const collocationBank = [
  "make progress", "do revision", "take notes", "build confidence", "catch a train", "miss an opportunity",
  "reach a goal", "raise awareness", "highly effective", "deeply worried", "strong accent", "heavy workload"
];

const podcastBank = [
  "Luke’s English Podcast",
  "BBC 6 Minute English",
  "Easy Stories in English",
  "British Council audio zone"
];

const writingBank = [
  "My current routine and how I want to improve it",
  "Why consistency beats motivation",
  "The best way to learn a language",
  "How technology changes our lives",
  "A skill I want to master this year",
  "Why discipline matters more than talent",
  "The city transport system in my life",
  "How I would design my ideal day",
  "A mistake that taught me something important",
  "What confidence means to me"
];

function buildLessons() {
  const lessons = [];
  const startDate = new Date("2026-03-30T00:00:00");

  for (let i = 0; i < 120; i += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dayNumber = i + 1;
    const weekday = date.getDay();
    const grammar = grammarBank[i % grammarBank.length];
    const nextGrammar = grammarBank[(i + 1) % grammarBank.length];
    const unit = Math.min(40, Math.floor(i / 3) + 1);
    const collocationSet = [
      collocationBank[i % collocationBank.length],
      collocationBank[(i + 2) % collocationBank.length],
      collocationBank[(i + 5) % collocationBank.length]
    ];
    const podcast = podcastBank[i % podcastBank.length];
    const writing = writingBank[i % writingBank.length];

    let type = "study";
    let icon = BookOpen;
    let title = `Урок ${dayNumber}. Grammar + Unit ${unit}`;
    let focus = "Учебник + понятная грамматика + закрепление";
    let textbook = `English File Advanced — Unit ${unit}; Advanced Grammar in Use — тема по плану.`;
    let tasksFromBook = [
      `Открой English File Advanced, Unit ${unit}. Пройди 1 разворот: reading / listening / vocabulary / grammar по порядку.`,
      `Сделай упражнения из юнита письменно или устно.`,
      `Если в юните встретилась трудная конструкция — сравни её с объяснением ниже.`
    ];
    let mentorTasks = [
      `Скажи 5 предложений о себе по теме “${grammar.title}”.`,
      `Возьми 3 новых слова из урока и составь по 2 своих примера.`,
      `В конце урока перескажи всё своими словами за 60 секунд.`
    ];
    let simpleExplanation = grammar.simple;
    let theoryTitle = grammar.title;
    let rules = grammar.rules;
    let examples = grammar.examples;
    let exercises = grammar.exercises;

    if (weekday === 2 || weekday === 4) {
      type = "listening";
      icon = Headphones;
      title = `Урок ${dayNumber}. Listening + Shadowing`;
      focus = "Слух, произношение, словосочетания, автоматизация";
      textbook = `Аудио из English File Advanced Unit ${unit} или ${podcast}.`;
      theoryTitle = `Shadowing + ${nextGrammar.title}`;
      simpleExplanation = `Shadowing — это как музыкальная тренировка для языка. Ты не просто слушаешь, а повторяешь сразу за диктором: ритм, интонацию, связки слов. Сначала мозгу тяжело, потом язык начинает двигаться быстрее и естественнее. А грамматика рядом нужна, чтобы ты понимал, что именно слышишь.`;
      rules = [
        "Слушай кусок 10–20 секунд.",
        "Повтори вслух 5–7 раз, не шёпотом.",
        "Не останавливайся на каждом слове — копируй мелодию речи.",
        "Потом скажи тот же смысл своими словами."
      ];
      examples = [
        `Фраза для копирования: “I’ve been meaning to do that for ages.”`,
        `Сделай свой вариант: “I’ve been meaning to improve my English for ages.”`,
        `Добавь 3 новых связки: actually, to be honest, the thing is.`
      ];
      tasksFromBook = [
        `В English File Advanced включи аудио из Unit ${unit} и пройди listening block.`,
        `Повтори ключевой фрагмент из аудио 5–7 раз.`,
        `Выпиши 5 полезных фраз, а не отдельные слова.`
      ];
      mentorTasks = [
        `Сделай shadowing 10–15 минут без пропуска.`,
        `Запиши голосом 1 минуту пересказа.`,
        `Используй collocations: ${collocationSet.join(", ")}.`
      ];
      exercises = [
        `Повтори 3 коротких фрагмента с разной интонацией: спокойной, уверенной, эмоциональной.`,
        `Перескажи услышанное сначала медленно, потом нормально.`,
        `Сделай 5 собственных предложений с фразами из аудио.`
      ];
    }

    if (weekday === 6) {
      type = "writing";
      icon = PenSquare;
      title = `Урок ${dayNumber}. Writing Day`;
      focus = "Письмо, логика, точность, использование новых слов";
      textbook = `English File Advanced — writing section Unit ${unit}; при наличии — model answer как образец структуры.`;
      theoryTitle = `Как писать понятно и сильно`;
      simpleExplanation = `Хороший текст — это не “сложные слова ради сложных слов”. Это ясная мысль. Сначала ты говоришь, о чём текст. Потом даёшь 2–3 идеи. Потом заканчиваешь выводом. Представь, что объясняешь другу, а не экзаменатору-монстру.`;
      rules = [
        "Абзац 1 — тема и главный ответ.",
        "Абзац 2–3 — идеи и примеры.",
        "Последний абзац — короткий вывод.",
        "Используй linking words: firstly, however, as a result, in my view."
      ];
      examples = [
        `Opening: “In my view, consistency is more important than motivation.”`,
        `Support: “Firstly, regular practice builds habits.”`,
        `Closing: “For this reason, daily effort matters more than short bursts of energy.”`
      ];
      tasksFromBook = [
        `Открой writing section в Unit ${unit} и посмотри образец структуры.`,
        `Если есть полезные linking words в учебнике — выпиши их.`,
        `Используй 5 слов или фраз из текущего юнита.`
      ];
      mentorTasks = [
        `Напиши 180–220 слов на тему: “${writing}”.`,
        `Используй 1 тему грамматики: ${grammar.title}.`,
        `Сделай самопроверку: артикли, времена, порядок слов, linking words.`
      ];
      exercises = [
        `Напиши вступление из 2 предложений.`,
        `Напиши 2 основных абзаца с примерами из своей жизни.`,
        `Сократи текст на 20 слов, чтобы сделать его чище и сильнее.`
      ];
    }

    if (weekday === 0) {
      type = "speaking";
      icon = Mic;
      title = `Урок ${dayNumber}. Speaking Sprint`;
      focus = "Разговор, беглость, уверенность, активизация грамматики";
      textbook = `English File Advanced — speaking section Unit ${unit}.`;
      theoryTitle = `Как начать говорить без ступора`;
      simpleExplanation = `Чтобы говорить, не надо ждать идеального английского. Сначала ты строишь короткие кирпичики: одна мысль, потом ещё одна, потом связь между ними. Беглость приходит не до ошибок, а после большого количества попыток.`;
      rules = [
        "Говори вслух минимум 5–10 минут.",
        "Не переводи всё в голове слово в слово.",
        "Если застрял — перефразируй проще.",
        "После монолога переслушай себя и улучши 3 предложения."
      ];
      examples = [
        `Start: “Today I want to talk about…”`,
        `Link: “Another point is that…”`,
        `Recover: “I don’t know the exact word, but what I mean is…”`
      ];
      tasksFromBook = [
        `Пройди speaking task из Unit ${unit}.`,
        `Ответь на 3 вопроса из секции speaking.`,
        `Если есть useful language box — используй 3 выражения оттуда.`
      ];
      mentorTasks = [
        `Запиши 90 секунд монолога по теме юнита.`,
        `Сделай второй дубль лучше и увереннее.`,
        `Используй collocations: ${collocationSet.join(", ")}.`
      ];
      exercises = [
        `Ответь на вопрос “Why are you learning English now?” 3 разными способами.`,
        `Сравни свою жизнь сейчас и год назад.`,
        `Дай себе 5 советов по английскому с modal verbs.`
      ];
    }

    if (weekday === 3) {
      type = "review";
      icon = CheckCircle2;
      title = `Урок ${dayNumber}. Review + Fix Day`;
      focus = "Повторение, исправление дыр, закрепление материала";
      textbook = `Повтори Unit ${Math.max(1, unit - 1)}–${unit} и открой notes / vocabulary bank.`;
      theoryTitle = `Почему повторение делает тебя сильным`;
      simpleExplanation = `Когда ты повторяешь, мозг понимает: “Это важно, это нужно хранить”. Без повторения знания как вода в руках. Повторение — это не шаг назад, это цемент между кирпичами.`;
      rules = [
        "Сначала быстро вспомни без подсказки.",
        "Потом проверь себя по конспекту.",
        "Исправь ошибки и сразу сделай новый правильный пример.",
        "Повтори вслух то, что было слабым местом."
      ];
      examples = [
        `Ошибка: “I am know” → правильно: “I know.”`,
        `Ошибка: “He go” → правильно: “He goes.”`,
        `Ошибка: “I have seen him yesterday” → правильно: “I saw him yesterday.”`
      ];
      tasksFromBook = [
        `Повтори vocabulary из двух последних уроков.`,
        `Сделай revision block из учебника, если он есть.`,
        `Выбери 1 старую тему и объясни её вслух без подсказки.`
      ];
      mentorTasks = [
        `Выпиши 10 ошибок, которые ты делал раньше или можешь сделать.`,
        `Исправь каждую и придумай новый пример.`,
        `Сделай мини-тест самому себе на 10 вопросов.`
      ];
      exercises = [
        `Перескажи 3 грамматические темы за 3 минуты.`,
        `Сделай 10 быстрых устных предложений на разные времена.`,
        `Повтори 8 collocations и вставь их в живые примеры.`
      ];
    }

    lessons.push({
      id: dayNumber,
      date,
      month: Math.floor(i / 30) + 1,
      unit,
      type,
      title,
      focus,
      textbook,
      theoryTitle,
      simpleExplanation,
      rules,
      examples,
      exercises,
      tasksFromBook,
      mentorTasks,
      collocations: collocationSet,
      dailyLoad: {
        work: "6–7 ч",
        english: type === "writing" ? "60–75 мин" : "75–90 мин",
        metro: "30 мин",
        workout: "45 мин"
      },
      icon
    });
  }

  return lessons;
}

const lessons = buildLessons();

const monthlyGoals = [
  {
    month: 1,
    title: "Месяц 1 — База и дисциплина",
    goals: [
      "Привыкнуть к ежедневному ритму без пропусков.",
      "Разобраться с ключевыми временами и базовой логикой английского.",
      "Начать говорить вслух каждый день, даже если пока неловко.",
      "Собрать первые 150–200 активных слов и фраз."
    ]
  },
  {
    month: 2,
    title: "Месяц 2 — Ускорение",
    goals: [
      "Уверенно слышать структуру фразы в аудио.",
      "Подтянуть conditionals, passive, reported speech.",
      "Начать строить длинные ответы без паники.",
      "Делать письменно не только правильно, но и логично."
    ]
  },
  {
    month: 3,
    title: "Месяц 3 — Выход в речь",
    goals: [
      "Говорить дольше и свободнее без постоянного перевода в голове.",
      "Использовать linking words, collocations и более естественные связки.",
      "Чаще пересказывать, объяснять, сравнивать и аргументировать.",
      "Начать звучать взрослее и увереннее."
    ]
  },
  {
    month: 4,
    title: "Месяц 4 — C1 режим",
    goals: [
      "Собирать все навыки вместе: grammar + listening + speaking + writing.",
      "Говорить более гибко и естественно.",
      "Быстро замечать и чинить свои типичные ошибки.",
      "Выйти на сильную самостоятельную систему без постоянной помощи."
    ]
  }
];

const speakingScripts = [
  {
    title: "Self-introduction",
    prompt: "Расскажи о себе так, как будто знакомишься с новым человеком в Англии.",
    frame: ["Who you are", "What you do", "What your routine is like", "Why you are learning English now"]
  },
  {
    title: "Daily routine",
    prompt: "Опиши свой обычный день и выдели, что ты хочешь улучшить.",
    frame: ["Morning", "Work", "Study", "Evening habits"]
  },
  {
    title: "Opinion",
    prompt: "Выскажи мнение на тему привычек, дисциплины или технологий.",
    frame: ["My opinion", "Reason 1", "Reason 2", "Example", "Conclusion"]
  },
  {
    title: "Storytelling",
    prompt: "Расскажи историю о ситуации, когда ты ошибся, но чему-то научился.",
    frame: ["Setting", "Problem", "What happened", "What you learnt"]
  }
];

const weeklyReviewTemplate = [
  "Что я сделал хорошо на этой неделе?",
  "Где я тормозил или ленился?",
  "Какие 3 ошибки повторялись чаще всего?",
  "Что я улучшу на следующей неделе?"
];

function formatDate(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "short"
  }).format(date);
}

function typeLabel(type) {
  switch (type) {
    case "study": return "Учебник";
    case "listening": return "Аудирование";
    case "writing": return "Письмо";
    case "speaking": return "Говорение";
    case "review": return "Повторение";
    default: return "Урок";
  }
}

export default function EnglishMentorSite() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [query, setQuery] = useState("");
  const [done, setDone] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [weakSpots] = useState({ grammar: 2, listening: 3, speaking: 4, writing: 2, vocabulary: 3 });

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const hay = `${lesson.title} ${lesson.focus} ${lesson.theoryTitle} ${lesson.textbook}`.toLowerCase();
      return hay.includes(query.toLowerCase());
    });
  }, [query]);

  const lesson = lessons.find((l) => l.id === selectedDay) || lessons[0];
  const completedCount = Object.values(done).filter(Boolean).length;
  const completion = Math.round((completedCount / lessons.length) * 100);
  const Icon = lesson.icon;
  const currentMonthGoal = monthlyGoals.find((m) => m.month === lesson.month) || monthlyGoals[0];

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

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="rounded-3xl shadow-lg border-0 bg-white">
            <CardContent className="p-6 md:p-8 grid gap-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="rounded-full">C1 Mentor Mode</Badge>
                    <Badge variant="secondary" className="rounded-full">120 дней</Badge>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Сайт‑ментор по английскому на 4 месяца</h1>
                  <p className="text-slate-600 mt-3 max-w-3xl text-base md:text-lg">
                    Открываешь день, видишь урок, понятное объяснение, задания из плана и закрепление. Никаких размышлений о том, что учить — просто выполняешь.
                  </p>
                </div>
                <div className="min-w-[260px] bg-slate-100 rounded-3xl p-4">
                  <div className="text-sm text-slate-500 mb-2">Прогресс</div>
                  <div className="text-3xl font-bold mb-3">{completedCount} / {lessons.length}</div>
                  <Progress value={completion} className="h-3 rounded-full" />
                  <div className="text-sm text-slate-500 mt-2">{completion}% выполнено</div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-3">
                {[
                  { icon: <BookOpen className="w-4 h-4" />, label: "Учёба", value: `${lesson.dailyLoad.english}` },
                  { icon: <CalendarDays className="w-4 h-4" />, label: "Работа", value: lesson.dailyLoad.work },
                  { icon: <Train className="w-4 h-4" />, label: "Метро", value: lesson.dailyLoad.metro },
                  { icon: <Dumbbell className="w-4 h-4" />, label: "Тренировка", value: lesson.dailyLoad.workout }
                ].map((item) => (
                  <div key={item.label} className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="font-semibold text-lg">{item.value}</div>
                    </div>
                    {item.icon}
                  </div>
                ))}
              </div>

              <div className="grid xl:grid-cols-3 gap-3">
                <div className="bg-slate-100 rounded-2xl p-4">
                  <div className="text-sm text-slate-500 mb-1">Фокус месяца</div>
                  <div className="font-semibold">{currentMonthGoal.title}</div>
                </div>
                <div className="bg-slate-100 rounded-2xl p-4">
                  <div className="text-sm text-slate-500 mb-1">Сегодняшний режим</div>
                  <div className="font-semibold">Открыл день → сделал по шагам → отметил</div>
                </div>
                <div className="bg-slate-100 rounded-2xl p-4">
                  <div className="text-sm text-slate-500 mb-1">Главное правило</div>
                  <div className="font-semibold">Говорить вслух каждый день</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-6">
          <Card className="rounded-3xl shadow-lg border-0 bg-white h-[78vh] overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Календарь уроков</CardTitle>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск по урокам и темам"
                  className="pl-9 rounded-2xl"
                />
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto h-[calc(78vh-110px)] pr-2">
              <div className="grid gap-3">
                {filteredLessons.map((item) => {
                  const ItemIcon = item.icon;
                  const active = item.id === selectedDay;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedDay(item.id)}
                      className={`text-left rounded-2xl p-4 transition border ${active ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 hover:bg-slate-100 border-slate-200"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className={`text-xs mb-2 ${active ? "text-slate-300" : "text-slate-500"}`}>{formatDate(item.date)}</div>
                          <div className="font-semibold leading-snug">День {item.id}. {item.title}</div>
                          <div className={`text-sm mt-2 ${active ? "text-slate-300" : "text-slate-600"}`}>{item.focus}</div>
                        </div>
                        <ItemIcon className="w-5 h-5 shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <Badge variant={active ? "secondary" : "outline"} className="rounded-full">Месяц {item.month}</Badge>
                        <Badge variant={active ? "secondary" : "outline"} className="rounded-full">{typeLabel(item.type)}</Badge>
                        <Badge variant={active ? "secondary" : "outline"} className="rounded-full">Unit {item.unit}</Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <motion.div key={lesson.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
            <Card className="rounded-3xl shadow-lg border-0 bg-white">
              <CardContent className="p-6 md:p-8 grid gap-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="rounded-full">День {lesson.id}</Badge>
                      <Badge variant="secondary" className="rounded-full">{formatDate(lesson.date)}</Badge>
                      <Badge variant="outline" className="rounded-full">{typeLabel(lesson.type)}</Badge>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
                      <Icon className="w-8 h-8" />
                      {lesson.title}
                    </h2>
                    <p className="text-slate-600 mt-3 text-base md:text-lg">{lesson.focus}</p>
                  </div>
                  <Button
                    className="rounded-2xl"
                    onClick={() => setDone((prev) => ({ ...prev, [lesson.id]: !prev[lesson.id] }))}
                  >
                    {done[lesson.id] ? "Отметить как не сделано" : "Отметить как сделано"}
                  </Button>
                </div>

                <div className="bg-slate-100 rounded-3xl p-5">
                  <div className="text-sm text-slate-500 mb-2">Работаем с учебником</div>
                  <div className="font-semibold text-lg">{lesson.textbook}</div>
                </div>
              </CardContent>
            </Card>

            <div className="grid xl:grid-cols-2 gap-6">
              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Тема дня: {lesson.theoryTitle}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5">
                  <div>
                    <h3 className="font-semibold mb-2">Объяснение очень простыми словами</h3>
                    <p className="text-slate-700 leading-7">{lesson.simpleExplanation}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Короткие правила</h3>
                    <div className="grid gap-2">
                      {lesson.rules.map((rule, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-2xl p-3 text-slate-700">{rule}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Примеры</h3>
                    <div className="grid gap-2">
                      {lesson.examples.map((example, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-2xl p-3 font-medium">{example}</div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Что делать сегодня</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5">
                  <div>
                    <h3 className="font-semibold mb-2">Задания по учебнику</h3>
                    <div className="grid gap-2">
                      {lesson.tasksFromBook.map((task, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-2xl p-3">{idx + 1}. {task}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Мои задания для закрепления</h3>
                    <div className="grid gap-2">
                      {lesson.mentorTasks.map((task, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-2xl p-3">{idx + 1}. {task}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Полезные сочетания дня</h3>
                    <div className="flex gap-2 flex-wrap">
                      {lesson.collocations.map((c) => (
                        <Badge key={c} variant="outline" className="rounded-full">{c}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid xl:grid-cols-3 gap-6">
              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2"><Clock3 className="w-6 h-6" /> Фокус-таймер</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="bg-slate-50 rounded-3xl p-6 text-center">
                    <div className="text-sm text-slate-500 mb-2">Для speaking / shadowing / deep work</div>
                    <div className="text-5xl font-bold tracking-tight">{minutes}:{seconds}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="rounded-2xl" onClick={() => { setSecondsLeft(10 * 60); setTimerRunning(false); }}>10 мин</Button>
                    <Button variant="outline" className="rounded-2xl" onClick={() => { setSecondsLeft(15 * 60); setTimerRunning(false); }}>15 мин</Button>
                    <Button variant="outline" className="rounded-2xl" onClick={() => { setSecondsLeft(25 * 60); setTimerRunning(false); }}>25 мин</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="rounded-2xl" onClick={() => setTimerRunning(true)}>Старт</Button>
                    <Button variant="secondary" className="rounded-2xl" onClick={() => setTimerRunning(false)}>Пауза</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2"><Target className="w-6 h-6" /> Слабые места</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {Object.entries(weakSpots).map(([skill, value]) => (
                    <div key={skill}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="capitalize">{skill}</span>
                        <span>{value}/5</span>
                      </div>
                      <Progress value={value * 20} className="h-3 rounded-full" />
                    </div>
                  ))}
                  <div className="text-sm text-slate-600 bg-slate-50 rounded-2xl p-3">
                    Чем выше число, тем больше внимания навык просит. Можно вручную менять значения прямо в коде под себя.
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2"><Trophy className="w-6 h-6" /> Цели месяца</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {currentMonthGoal.goals.map((goal, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-2xl p-3">{idx + 1}. {goal}</div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-3xl shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">Закрепление</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                {lesson.exercises.map((exercise, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-3xl p-5">
                    <div className="text-sm text-slate-500 mb-2">Задание {idx + 1}</div>
                    <div className="font-medium leading-7">{exercise}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid xl:grid-cols-2 gap-6">
              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Speaking scripts</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {speakingScripts.map((script) => (
                    <div key={script.title} className="bg-slate-50 rounded-3xl p-4 grid gap-2">
                      <div className="font-semibold">{script.title}</div>
                      <div className="text-slate-700">{script.prompt}</div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {script.frame.map((part) => (
                          <Badge key={part} variant="outline" className="rounded-full">{part}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Weekly review</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {weeklyReviewTemplate.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-3xl p-4 min-h-[88px]">
                      <div className="text-sm text-slate-500 mb-2">Вопрос {idx + 1}</div>
                      <div className="font-medium">{item}</div>
                    </div>
                  ))}
                  <div className="text-sm text-slate-600 bg-slate-100 rounded-2xl p-3">
                    Идея: каждое воскресенье отвечай на эти 4 вопроса. Так сайт становится не просто планом, а системой контроля.
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
