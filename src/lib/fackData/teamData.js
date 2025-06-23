import team_1 from "@/assets/images/mariska.jpg";
import team_2 from "@/assets/images/Dennis.png";

export const teamData = [
  {
    id: 1,
    img: team_1,
    name: "Mariska van der Velde",
    position: "Interieur- en winkelvormgever",
    social_link: [
      {
        id: 1,
        link: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/UsanceInterieurs",
        media: "FB",
      },
      {
        id: 2,
        link: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/usanceinterieurs/",
        media: "IN",
      },
      {
        id: 3,
        link: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/mariska-van-der-velde-003b4321/",
        media: "LI",
      },
    ],
  },  {
    id: 2,
    img: team_2,
    name: "Dennis van den Dool",
    position: "Interieurbouwer / Allround uitvoerder",
    social_link: [
      {
        id: 1,
        link: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/UsanceInterieurs",
        media: "FB",
      },
      {
        id: 2,
        link: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/usanceinterieurs/",
        media: "IN",
      },
    ],
  },
];
