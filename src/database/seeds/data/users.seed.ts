export const usersData = [
    {
        email: 'john@example.com',
        password: 'password123',  // sera hashé dans le seed.ts
        firstName: 'John',
        lastName: 'Doe',
        pseudo: 'johndoe',
        dateOfBirth: new Date('1990-01-01'),
        isActive: true
    },
    {
        email: 'jane@example.com',
        password: 'password456',  // sera hashé dans le seed.ts
        firstName: 'Jane',
        lastName: 'Smith',
        pseudo: 'janesmith',
        dateOfBirth: new Date('1992-05-15'),
        isActive: true
    }
];