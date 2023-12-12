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
    tooltipPos: "top-start" as const,
    textAlign: "start" as const,
    fieldName: 'position' as const
  },
  {
    id: 2,
    content: {
      en: {
        textShort: "Team",
        textLong: "Team logo and name",
      },
      ua: {
        textShort: "Ком",
        textLong: "Логотип та назва клубу",
      },
    },
    tooltipPos: "top-start" as const,
    textAlign: "start" as const,
    fieldName: 'teamName' as const

  },
  {
    id: 3,
    content: {
      en: {
        textShort: "G",
        textLong: "Games",
      },
      ua: {
        textShort: "М",
        textLong: "Матчі",
      },
    },

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'games' as const
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

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'win' as const

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

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'draw' as const

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

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'lose' as const

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

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'goalsFor' as const

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

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'goalsAgainst' as const

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

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'goalsDiff' as const

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

    tooltipPos: "top" as const,
    textAlign: "center" as const,
    fieldName: 'points' as const

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
