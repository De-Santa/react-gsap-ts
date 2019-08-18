export interface IProductDetails {
  description: string;
  imageUrl: string;
  subtitle: string;
  title: string;
}

export interface IProductData {
  description: string;
  details: IProductDetails[];
  id: string;
  imageUrl: string;
  subtitle: string;
  title: string;
}

export const products: IProductData[] = [
  {
    description: "At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way.",
    details: [
      {
        description: "At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way. At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way.",
        imageUrl: 'https://1036981-static-assets-portal-production.s3.amazonaws.com/media/images/media/wide/Senna-Header.jpg',
        subtitle: 'McLaren Automotive is a creator of luxury, high-performance sportscars and supercars.',
        title: 'McLaren Automotive',
      },
      {
        description: "Since its inception almost three decades ago, McLaren Applied Technologies has continued to push the boundaries of innovation and high-performance. The company has developed capabilities in decision science, simulation, engineering, electronic systems and high-performance design, gained from decades of elite motorsport competition.",
        imageUrl: 'https://1036981-static-assets-portal-production.s3.amazonaws.com/media/images/media/wide/MAT_landing_page.jpg',
        subtitle: 'McLaren Applied Technologies works at the intersection of technology, data and human ingenuity',
        title: 'McLaren Applied Technologies',
      },
      {
        description: "At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way. At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way.",
        imageUrl: 'https://www.slashgear.com/wp-content/uploads/2019/01/10348-McLaren600LTSpider.jpg',
        subtitle: 'Hold your pants bro',
        title: 'Acceleration',
      }
    ],
    id: "1",
    imageUrl: "https://www.slashgear.com/wp-content/uploads/2019/01/10348-McLaren600LTSpider.jpg",
    subtitle: "New McLaren",
    title: "McLaren 720S"
  },
  {
    description: "The Dodge Charger is a model of automobile marketed by Dodge. The first Charger was a show car in 1964.",
    details: [
      {
        description: "At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way. At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way.",
        imageUrl: 'https://www.slashgear.com/wp-content/uploads/2019/01/10348-McLaren600LTSpider.jpg',
        subtitle: 'Hold your pants bro',
        title: 'Acceleration',
      },
      {
        description: "At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way. At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way.",
        imageUrl: 'https://www.slashgear.com/wp-content/uploads/2019/01/10348-McLaren600LTSpider.jpg',
        subtitle: 'Hold your pants bro',
        title: 'Acceleration',
      },
      {
        description: "At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way. At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way.",
        imageUrl: 'https://www.slashgear.com/wp-content/uploads/2019/01/10348-McLaren600LTSpider.jpg',
        subtitle: 'Hold your pants bro',
        title: 'Acceleration',
      }
    ],
    id: "2",
    imageUrl: "https://pictures.topspeed.com/IMG/jpg/201810/dodge-charger-evolut-31.jpg",
    subtitle: "Cult Classic",
    title: "Dodge Charger"
  },
  {
    description: "The Mercedes AMG GT combines the fascination of an sports car with segment-specific technology leadership and high practicality",
    details: [
      {
        description: "At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way. At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way.",
        imageUrl: 'https://www.slashgear.com/wp-content/uploads/2019/01/10348-McLaren600LTSpider.jpg',
        subtitle: 'Hold your pants bro',
        title: 'Acceleration',
      },
      {
        description: "At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way. At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way.",
        imageUrl: 'https://www.slashgear.com/wp-content/uploads/2019/01/10348-McLaren600LTSpider.jpg',
        subtitle: 'Hold your pants bro',
        title: 'Acceleration',
      },
      {
        description: "At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way. At Mclaren, we refuse to accept what`s gone before.Instead, we find a different way. A better way.",
        imageUrl: 'https://www.slashgear.com/wp-content/uploads/2019/01/10348-McLaren600LTSpider.jpg',
        subtitle: 'Hold your pants bro',
        title: 'Acceleration',
      }
    ],
    id: "3",
    imageUrl: "https://gt-shop.ru/images/news/Piecha-Design-Mercedes-AMG-GT-RSR-14.jpg",
    subtitle: "Brand New AMG",
    title: "Mercedes AMG GT"
  }
];