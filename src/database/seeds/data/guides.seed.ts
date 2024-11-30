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
        user: 1
    },
    {
        title: 'London Adventures',
        description: 'Exploring the best of London',
        coverImage: '../data/images/test2.jpg', 
        images: [
            '../data/images/test3.jpg',
            '../data/images/test.jpg'
        ],
        user: 2
    },
    {
        title: 'Tokyo Discovery',
        description: 'Ultimate Tokyo travel guide',
        coverImage: '../data/images/test4.jpg',
        images: [
            '../data/images/test.jpg',
            '../data/images/test3.jpg'
        ],
        user: 1
    },
];