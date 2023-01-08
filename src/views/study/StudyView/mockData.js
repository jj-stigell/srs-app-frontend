export const mockData = [
  {
    id: 105,
    cardType: 'WORD',
    reviewType: 'RECALL',
    createdAt: '2022-12-24T09:52:08.745Z',
    updatedAt: '2022-12-24T09:52:08.745Z',
    accountCard: {
      id: 1,
      reviewCount: 65,
      easyFactor: 2.5,
      accountStory: 'this is my account story RECALL: cars are cool',
      accountHint: 'My own hint RECALL: its too complex to make up a hint',
      dueAt: '2021-03-08',
      mature: false,
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z'
    },
    word: {
      id: 2,
      word: '自動車',
      jlptLevel: 5,
      furigana: true,
      reading: 'じどうしゃ',
      readingRomaji: 'jidousha',
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z',
      translation: {
        translation: 'Car',
        hint: 'this is the default RECALL hint for car',
        story: 'Story RECALLz for car word, default one',
        description: 'description for the word car',
        createdAt: '2022-12-24T09:52:08.745Z',
        updatedAt: '2022-12-24T09:52:08.745Z'
      }
    }
  },
  {
    id: 105,
    cardType: 'WORD',
    reviewType: 'RECOGNISE',
    createdAt: '2022-12-24T09:52:08.745Z',
    updatedAt: '2022-12-24T09:52:08.745Z',
    accountCard: {
      id: 1,
      reviewCount: 65,
      easyFactor: 2.5,
      accountStory: 'this is my account story RECOGNISE: cars are cool',
      accountHint: 'My own hint RECOGNISE: its too complex to make up a hint',
      dueAt: '2021-03-08',
      mature: false,
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z'
    },
    word: {
      id: 2,
      word: '自動車',
      jlptLevel: 5,
      furigana: true,
      reading: 'じどうしゃ',
      readingRomaji: 'jidousha',
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z',
      translation: {
        translation: 'Car',
        hint: 'this is the default hint for RECOGNISE car',
        story: 'Story for car word, default one RECOGNISE',
        description: 'description for the word car',
        createdAt: '2022-12-24T09:52:08.745Z',
        updatedAt: '2022-12-24T09:52:08.745Z'
      }
    }
  },
  {
    id: 2,
    cardType: 'KANJI',
    reviewType: 'RECALL',
    createdAt: '2022-12-24T09:52:08.745Z',
    updatedAt: '2022-12-24T09:52:08.745Z',
    accountCard: {
      id: 1,
      reviewCount: 65,
      easyFactor: 2.5,
      accountStory: 'my account story, for RECALL, 3 lines, center one points to up',
      accountHint: 'custommized hint for RECALL, I am not good at making hints',
      dueAt: '2021-03-08',
      mature: false,
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z'
    },
    kanji: {
      id: 2,
      kanji: '上',
      jlptLevel: 5,
      onyomi: 'ジョウ、 ショウ、 シャン',
      onyomiRomaji: 'jou, shou, shan',
      kunyomi: 'うえ、 -うえ、 うわ-、 かみ、 あ.げる、 -あ.げる、 あ.がる、 -あ.がる、 あ.がり、 -あ.がり、 のぼ.る、 のぼ.り、 のぼ.せる、 のぼ.す、 たてまつ.る',
      kunyomiRomaji: 'ue, -ue, uwa-, kami, a.geru, -a.geru, a.garu, -a.garu, a.gari, -a.gari, nobo.ru, nobo.ri, noba.seru, noba.su, tatematsu.ru',
      strokeCount: 3,
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z',
      translation: {
        keyword:'up',
        story: 'RECALL default story, Imagine support made of 3 lines, one pointing up',
        hint:'RECALL hint for: 3 lines pointing in different directions',
        otherMeanings: 'above; over',
        description: 'this kanji is really common, better learn it now',
        createdAt: '2022-12-24T09:52:08.745Z',
        updatedAt: '2022-12-24T09:52:08.745Z'
      },
      radicals: [
        {
          radical: '⼘',
          reading: 'ぼく',
          readingRomaji: 'boku',
          strokeCount: 2,
          createdAt: '2022-12-24T09:52:08.745Z',
          updatedAt: '2022-12-24T09:52:08.745Z',
          translation: {
            translation: 'oracle',
            description: 'description for radical oracle, cannot come up with any',
            createdAt: '2022-12-24T09:52:08.745Z',
            updatedAt: '2022-12-24T09:52:08.745Z'
          }
        },
        {
          radical: '⼀',
          reading: 'いち',
          readingRomaji: 'ichi',
          strokeCount: 1,
          createdAt: '2022-12-24T09:52:08.745Z',
          updatedAt: '2022-12-24T09:52:08.745Z',
          translation: {
            translation: 'one, horizontal stroke',
            description: 'description for radical one, cannot come up with any... sorry',
            createdAt: '2022-12-24T09:52:08.745Z',
            updatedAt: '2022-12-24T09:52:08.745Z'
          }
        }
      ]
    }
  },
  {
    id: 2,
    cardType: 'KANJI',
    reviewType: 'RECOGNISE',
    createdAt: '2022-12-24T09:52:08.745Z',
    updatedAt: '2022-12-24T09:52:08.745Z',
    accountCard: {
      id: 1,
      reviewCount: 65,
      easyFactor: 2.5,
      accountStory: 'my own story for RECOGNISE, 3 lines, center one points to up',
      accountHint: 'I am not good at making hints',
      dueAt: '2021-03-08',
      mature: false,
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z'
    },
    kanji: {
      id: 2,
      kanji: '上',
      jlptLevel: 5,
      onyomi: 'ジョウ、 ショウ、 シャン',
      onyomiRomaji: 'jou, shou, shan',
      kunyomi: 'うえ、 -うえ、 うわ-、 かみ、 あ.げる、 -あ.げる、 あ.がる、 -あ.がる、 あ.がり、 -あ.がり、 のぼ.る、 のぼ.り、 のぼ.せる、 のぼ.す、 たてまつ.る',
      kunyomiRomaji: 'ue, -ue, uwa-, kami, a.geru, -a.geru, a.garu, -a.garu, a.gari, -a.gari, nobo.ru, nobo.ri, noba.seru, noba.su, tatematsu.ru',
      strokeCount: 3,
      createdAt: '2022-12-24T09:52:08.745Z',
      updatedAt: '2022-12-24T09:52:08.745Z',
      translation: {
        keyword:'up',
        story: 'general story for recg, Imagine support made of 3 lines, one pointing up',
        hint:'3 lines pointing in different directions',
        otherMeanings: 'above; over',
        description: 'this kanji is really common, better learn it now',
        createdAt: '2022-12-24T09:52:08.745Z',
        updatedAt: '2022-12-24T09:52:08.745Z'
      },
      radicals: [
        {
          radical: '⼘',
          reading: 'ぼく',
          readingRomaji: 'boku',
          strokeCount: 2,
          createdAt: '2022-12-24T09:52:08.745Z',
          updatedAt: '2022-12-24T09:52:08.745Z',
          translation: {
            translation: 'oracle',
            description: 'description for radical oracle, cannot come up with any',
            createdAt: '2022-12-24T09:52:08.745Z',
            updatedAt: '2022-12-24T09:52:08.745Z'
          }
        },
        {
          radical: '⼀',
          reading: 'いち',
          readingRomaji: 'ichi',
          strokeCount: 1,
          createdAt: '2022-12-24T09:52:08.745Z',
          updatedAt: '2022-12-24T09:52:08.745Z',
          translation: {
            translation: 'one, horizontal stroke',
            description: 'description for radical one, cannot come up with any... sorry',
            createdAt: '2022-12-24T09:52:08.745Z',
            updatedAt: '2022-12-24T09:52:08.745Z'
          }
        }
      ]
    }
  },
];
