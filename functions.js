const functions = [
    {
        id: '018d82dd-b222-7913-8203-0818736ef02a',
        name: 'flashcoffee_echo',
        script: `
            async function() {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
                    .then(response => response.json());

                return response;
            }
        `,
    },
    {
        id: '018d82cb-35ae-7f55-8e1d-465e2b38c056',
        name: 'flashcoffee_profile',
        script: `
            async function() {
                return 'Flash Coffee adalah jaringan outlet kopi berkonsep teknologi yang menawarkan pengalaman ngopi yang berbeda dengan kopi premium dan harga yang terjangkau.';
            }
        `,
    },
    {
        id: '018d82cc-079b-777a-95a8-3a9c4a36e99f',
        name: 'flashcoffee_menu',
        script: `
            async function() {
                return [
                    {
                        id: 1,
                        name: 'Americano',
                        original_price: 12,
                        price: 10,
                        currency: 'IDR'
                    },
                    {
                        id: 2,
                        name: 'Cappuccino',
                        original_price: 20,
                        price: 20,
                        currency: 'IDR'
                    },
                    {
                        id: 3,
                        name: 'Espresso',
                        original_price: 13,
                        price: 13,
                        currency: 'IDR'
                    },
                    {
                        id: 4,
                        name: 'Croissant',
                        original_price: 15,
                        price: 15,
                        currency: 'IDR'
                    },
                ];
            }
        `,
    }
];

module.exports = {
    wrapper: (handler) => {
        return `
            return new Promise(async (res, rej) => {
                try {
                    const result = await (${handler})()
                    res({result});
                } catch (error) {
                    rej(error);
                }
            })
        `;
    },
    functions,
};
