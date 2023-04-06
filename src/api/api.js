import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
    }),
    endpoints: (builder) => ({
        // Создание персоны
        createPerson: builder.mutation({
            query: (person) => ({
                url: `person`,
                method: 'POST',
                body: person,
            }),
        }),

        // Получение списка персон
        getPersons: builder.query({
            query: () => 'persons',
        }),

        // Получение персоны по id
        getPersonById: builder.query({
            query: (id) => ({
                url: `person${id}`
            })
        }),

        // Создание автомобиля
        createCar: builder.mutation({
            query: (car) => ({
                url: `car`,
                method: 'POST',
                body: car,
            }),
        }),

        // Получение списка автомобилей
        getCars: builder.query({
            query: () => 'cars',
        }),

        // Получение автомобиля по id
        getCarById: builder.query({
            query: (id) => ({
                url: `car${id}`
            })
        }),
    }),
});

export const {
    useCreatePersonMutation,
    useGetPersonsQuery,
    useCreateCarMutation,
    useGetCarsQuery,
    useGetPersonByIdQuery,
    useGetCarByIdQuery
} = api;
