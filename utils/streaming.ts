export type Solstream = {
  version: "0.1.1";
  name: "solstream";
  instructions: [
    {
      name: "createAd";
      accounts: [
        {
          name: "ad";
          isMut: true;
          isSigner: true;
        },
        {
          name: "author";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "id";
          type: "string";
        },
        {
          name: "deadline";
          type: "i64";
        }
      ];
    },
    {
      name: "vote";
      accounts: [
        {
          name: "vote";
          isMut: true;
          isSigner: true;
        },
        {
          name: "voter";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "ad";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "uservote";
          type: "bool";
        }
      ];
    },
    {
      name: "activateAd";
      accounts: [
        {
          name: "author";
          isMut: false;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "ad";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "vote";
      type: {
        kind: "struct";
        fields: [
          {
            name: "voter";
            type: "publicKey";
          },
          {
            name: "ad";
            type: "publicKey";
          },
          {
            name: "vote";
            type: "bool";
          },
          {
            name: "timestamp";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "advertisement";
      type: {
        kind: "struct";
        fields: [
          {
            name: "author";
            type: "publicKey";
          },
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "deadline";
            type: "i64";
          },
          {
            name: "title";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "id";
            type: "string";
          },
          {
            name: "votesFor";
            type: "i64";
          },
          {
            name: "votesAgainst";
            type: "i64";
          },
          {
            name: "isactive";
            type: "bool";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "TitleTooLong";
      msg: "The provided title should be 50 characters long maximum.";
    },
    {
      code: 6001;
      name: "DescriptionTooLong";
      msg: "The provided description should be 300 characters long maximum.";
    },
    {
      code: 6002;
      name: "IdTooLong";
      msg: "The provided Id should be 24 characters long maximum.";
    },
    {
      code: 6003;
      name: "VotingClosed";
      msg: "Voting is closed.";
    },
    {
      code: 6004;
      name: "CannotActivate";
      msg: "You cannot activate this ad.";
    },
    {
      code: 6005;
      name: "NotInitialized";
      msg: "Not Initialized";
    }
  ];
};

export const IDL: Solstream = {
  version: "0.1.1",
  name: "solstream",
  instructions: [
    {
      name: "createAd",
      accounts: [
        {
          name: "ad",
          isMut: true,
          isSigner: true,
        },
        {
          name: "author",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "id",
          type: "string",
        },
        {
          name: "deadline",
          type: "i64",
        },
      ],
    },
    {
      name: "vote",
      accounts: [
        {
          name: "vote",
          isMut: true,
          isSigner: true,
        },
        {
          name: "voter",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ad",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "uservote",
          type: "bool",
        },
      ],
    },
    {
      name: "activateAd",
      accounts: [
        {
          name: "author",
          isMut: false,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ad",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "vote",
      type: {
        kind: "struct",
        fields: [
          {
            name: "voter",
            type: "publicKey",
          },
          {
            name: "ad",
            type: "publicKey",
          },
          {
            name: "vote",
            type: "bool",
          },
          {
            name: "timestamp",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "advertisement",
      type: {
        kind: "struct",
        fields: [
          {
            name: "author",
            type: "publicKey",
          },
          {
            name: "timestamp",
            type: "i64",
          },
          {
            name: "deadline",
            type: "i64",
          },
          {
            name: "title",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "id",
            type: "string",
          },
          {
            name: "votesFor",
            type: "i64",
          },
          {
            name: "votesAgainst",
            type: "i64",
          },
          {
            name: "isactive",
            type: "bool",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "TitleTooLong",
      msg: "The provided title should be 50 characters long maximum.",
    },
    {
      code: 6001,
      name: "DescriptionTooLong",
      msg: "The provided description should be 300 characters long maximum.",
    },
    {
      code: 6002,
      name: "IdTooLong",
      msg: "The provided Id should be 24 characters long maximum.",
    },
    {
      code: 6003,
      name: "VotingClosed",
      msg: "Voting is closed.",
    },
    {
      code: 6004,
      name: "CannotActivate",
      msg: "You cannot activate this ad.",
    },
    {
      code: 6005,
      name: "NotInitialized",
      msg: "Not Initialized",
    },
  ],
};
