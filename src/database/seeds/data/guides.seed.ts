import { title } from 'process';
import { start } from 'repl';
import { v4 as uuidv4 } from 'uuid';

export const guidesData = [
    {
        title: 'Guide to Paris',
        description: 'A complete guide to visiting Paris',
        coverImage: '../data/images/test.jpg',
        images: [
            '../data/images/test2.jpg',
            '../data/images/test3.jpg'
        ],
        user: 1,
        address: 1,
        categories: [1, 2],
        status: 'PUBLISHED',
        guideType: 'DIRECT'
    },
    {
        title: 'London Adventures',
        description: 'Exploring the best of London',
        coverImage: '../data/images/test2.jpg', 
        images: [
            '../data/images/test3.jpg',
            '../data/images/test.jpg'
        ],
        user: 2,
        address: 2,
        categories: [2, 3],
        status: 'PUBLISHED',
        guideType: 'DIRECT'
    },
    {
        title: 'Tokyo Discovery',
        description: 'Ultimate Tokyo travel guide',
        coverImage: '../data/images/test4.jpg',
        images: [
            '../data/images/test.jpg',
            '../data/images/test3.jpg'
        ],
        user: 1,
        address: 3,
        categories: [1, 3],
        status: 'PUBLISHED',
        guideType: 'DIRECT'
    },
    {
        title: 'Mon incroyable voyage de 2 jours au japon',
        description: 'Un voyage inoubliable au Japon. Découvrez les meilleures destinations et activités à faire au Japon.',
        coverImage: '../data/images/test.jpg',
        images: [
            '../data/images/test2.jpg',
            '../data/images/test3.jpg'
        ],
        user: 1,
        address: 1,
        categories: [1, 2, 3],
        status: 'PUBLISHED',
        guideType: 'ITINERARY',
        startCity: 'Tokyo',
        endCity: 'Kyoto',
        startDate: '2025-07-01',
        endDate: '2025-07-02',
        days: [
            {
                date: '2025-07-01',
                description: 'Arrivée à Tokyo. Découverte du quartier Shibuya et du temple Senso-ji.',
                activities: [
                    { type: 'visit', title: 'Temple Senso-ji', description: 'Visite d\'un des temples les plus anciens de Tokyo.' },
                    { type: 'eat', title: 'Sushi à Tsukiji', description: 'Dîner avec des sushis frais au marché de Tsukiji.' }
                ],
                accommodation: [
                    { type: 'hotel', name: 'Hotel Tokyo Plaza', address: 'Shibuya 1-1', description: 'Confort et proximité des attractions.' }
                ],
                transport: [
                    { type: 'train', name: 'Shinkansen', description: 'Transport rapide vers Kyoto.' }
                ]
            },
            {
                date: '2025-07-02',
                description: 'Exploration de Kyoto. Visite des temples Fushimi Inari et Kinkaku-ji.',
                activities: [
                    { type: 'visit', title: 'Temple Kinkaku-ji', description: 'Visite du temple doré.' },
                    { type: 'eat', title: 'Ramen à Kyoto', description: 'Repas traditionnel de ramen dans un restaurant local.' }
                ],
                accommodation: [
                    { type: 'hotel', name: 'Kyoto Hotel', address: 'Gion District', description: 'Séjour dans un hôtel traditionnel japonais.' }
                ],
                transport: [
                    { type: 'bus', name: 'Kyoto City Bus', description: 'Utilisation du bus pour se déplacer à Kyoto.' }
                ]
            },
            // Ajouter des jours supplémentaires ici
        ]
    }
];