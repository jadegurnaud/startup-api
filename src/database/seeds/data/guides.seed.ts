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
        title: 'Mon incroyable voyage de 5 jours au japon',
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
        startDate: '2025-01-02',
        endDate: '2025-01-07',
        startCity: 'Tokyo',
        endCity: 'Hiroshima',
        days: [
            {
                date: '2025-01-02',
                description: 'Arrival in Tokyo',
            },
            {
                date: '2025-01-03',
                description: 'Exploring Tokyo',
            },
            {
                date: '2025-01-04',
                description: 'Day trip to Nikko',
            },
            {
                date: '2025-01-05',
                description: 'Travel to Kyoto',
            },
            {
                date: '2025-01-06',
                description: 'Exploring Kyoto',
            },
            {
                date: '2025-01-07',
                description: 'Travel to Hiroshima',
            }
        ]
        
    }
];