import { v4 as uuidv4 } from 'uuid';

export const guidesData = [
    {
        title: 'Guide to Paris',
        description: 'A complete guide to visiting Paris',
        coverImage: undefined,
        images: [
            { 
              url: 'image1.jpg', 
              cloudinaryPublicId: `guides/${uuidv4()}` 
            },
            { 
              url: 'image2.jpg', 
              cloudinaryPublicId: `guides/${uuidv4()}` 
            }
        ],
        user: 28
    },
    {
        title: 'London Adventures',
        description: 'Exploring the best of London',
        coverImage: undefined, 
        images: [
            { 
              url: 'image1.jpg', 
              cloudinaryPublicId: `guides/${uuidv4()}` 
            },
            { 
              url: 'image2.jpg', 
              cloudinaryPublicId: `guides/${uuidv4()}` 
            }
        ],
        user: 29
    },
    {
        title: 'Tokyo Discovery',
        description: 'Ultimate Tokyo travel guide',
        coverImage: undefined,
        images: [
            { 
              url: 'image1.jpg', 
              cloudinaryPublicId: `guides/${uuidv4()}` 
            },
            { 
              url: 'image2.jpg', 
              cloudinaryPublicId: `guides/${uuidv4()}` 
            }
        ],
        user: 28
    },
];