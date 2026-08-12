export type OmIndhold = {
  titel: string;
  undertitel: string;
  mission: string;
  vision: string;
  vaerdier: {
    titel: string;
    beskrivelse: string;
  }[];
};

export const omIndhold: OmIndhold = {
  titel: "Om TheraLearn",
  undertitel:
    "TheraLearn er udviklet for at gøre læring i psykologi og psykoterapi enkel, struktureret og motiverende.",

  mission:
    "Vores mission er at samle pensum, quizzer og læringsværktøjer i én moderne platform, så studerende og fagpersoner kan lære mere effektivt.",

  vision:
    "Vi ønsker at skabe Danmarks bedste digitale læringsplatform inden for psykologi, psykoterapi og mental sundhed.",

  vaerdier: [
    {
      titel: "Faglighed",
      beskrivelse:
        "Alt indhold bygger på anerkendt viden og formidles i et letforståeligt sprog.",
    },
    {
      titel: "Tilgængelighed",
      beskrivelse:
        "Læring skal være enkel, overskuelig og kunne bruges på både computer, tablet og mobil.",
    },
    {
      titel: "Udvikling",
      beskrivelse:
        "Platformen udvides løbende med nye emner, quizzer og funktioner, så brugerne altid kan lære mere.",
    },
  ],
};