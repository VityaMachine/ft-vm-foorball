export const standingsTableRows = [
  {
    id: 1,
    content: {
      en: {
        textShort: "Pos",
        textLong: "Position",
      },
      ua: {
        textShort: "Поз",
        textLong: "Позиція",
      },
    },
    type: 'info' as const, 
    tooltipPos: "top-start" as const,
    textAlign: "start" as const,
    fieldName: 'position' as const,
    isSortable: true
  },
  {
    id: 2,
    content: {
      en: {
        textShort: "Team",
        textLong: "Team logo and name",
      },
      ua: {
        textShort: "Команда",
        textLong: "Логотип та назва клубу",
      },
    },
    type: 'info' as const,
    tooltipPos: "top-start" as const,
    textAlign: "start" as const,
    fieldName: 'teamName' as const,
    isSortable: false

  },
  {
    id: 3,
    content: {
      en: {
        textShort: "M",
        textLong: "Matches",
      },
      ua: {
        textShort: "М",
        textLong: "Матчі",
      },
    },
    type: 'data' as const,
    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'games' as const,
    isSortable: true
  },
  {
    id: 4,
    content: {
      en: {
        textShort: "W",
        textLong: "Win",
      },
      ua: {
        textShort: "В",
        textLong: "Виграші",
      },
    },
    type: 'data' as const,

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'win' as const,
    isSortable: true

  },
  {
    id: 5,
    content: {
      en: {
        textShort: "D",
        textLong: "Draw",
      },
      ua: {
        textShort: "Н",
        textLong: "Нічиї",
      },
    },
    type: 'data' as const,

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'draw' as const,
    isSortable: true

  },
  {
    id: 6,
    content: {
      en: {
        textShort: "L",
        textLong: "Lose",
      },
      ua: {
        textShort: "П",
        textLong: "Поразки",
      },
    },
    type: 'data' as const,

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'lose' as const,
    isSortable: true

  },
  {
    id: 7,
    content: {
      en: {
        textShort: "GS",
        textLong: "Goals scored",
      },
      ua: {
        textShort: "ГЗ",
        textLong: "Голів забито",
      },
    },
    type: 'data' as const,

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'goalsFor' as const,
    isSortable: true

  },
  {
    id: 8,
    content: {
      en: {
        textShort: "GC",
        textLong: "Goals conceded",
      },
      ua: {
        textShort: "ГП",
        textLong: "Голів пропущено",
      },
    },
    type: 'data' as const,

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'goalsAgainst' as const,
    isSortable: true

  },
  {
    id: 9,
    content: {
      en: {
        textShort: "GD",
        textLong: "Goals difference",
      },
      ua: {
        textShort: "РГ",
        textLong: "Різниця голів",
      },
    },
    type: 'data' as const,

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'goalsDiff' as const,
    isSortable: true

  },
  {
    id: 10,
    content: {
      en: {
        textShort: "P",
        textLong: "Points" as const,
      },
      ua: {
        textShort: "О",
        textLong: "Очки",
      },
    },
    type: 'data' as const,

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'points' as const,
    isSortable: true

  },
  {
    id: 12,
    content: {
      en: {
        textShort: "Form",
        textLong: "Previous 5 fixtures form" as const,
      },
      ua: {
        textShort: "Форма",
        textLong: "Форма в останніх 5 матчах",
      },
    },
    type: 'data' as const,

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'prev5' as const,
    isSortable: false

  },
  {
    id: 11,
    content: {
      en: {
        textShort: "Next 5 fixtures",
        textLong: "Next 5 fixtures" as const,
      },
      ua: {
        textShort: "Наступні 5",
        textLong: "Наступні 5 матчів",
      },
    },
    type: 'data' as const,

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'next5' as const,
    isSortable: false

  },

  // {
  // 	id: 11,
  // 	content: {
  // 		en: {
  // 			textShort: 'Prev 5',
  // 			textLong: 'Previous 5 matches'
  // 		},
  //         ua: {
  // 			textShort: 'Поп 5',
  // 			textLong: 'Попередні 5 матчів'
  // 		}
  // 	},

  // 	tooltipPos: 'top-end',
  // 	textAlign: 'center'
  // },
  // {
  // 	id: 12,
  // 	content: {
  // 		en: {
  // 			textShort: 'Next 5',
  // 			textLong: 'Next 5 matches'
  // 		},
  //         ua: {
  // 			textShort: 'Наст 5',
  // 			textLong: 'Наступні 5'
  // 		}
  // 	},

  // 	tooltipPos: 'top',
  // 	textAlign: 'center'
  // }
];
