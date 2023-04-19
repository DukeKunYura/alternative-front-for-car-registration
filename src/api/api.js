import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Persons', 'Person', 'Cars', 'Car'],
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
            invalidatesTags: [{ type: 'Persons', id: 'LIST' }]
        }),

        // Получение списка персон
        getPersons: builder.query({
            query: () => 'persons',
            providesTags: (result) => result
                ? [...result.map(({ id }) => ({ type: 'Persons', id })), { type: 'Persons', id: 'LIST' },]
                : [{ type: 'Persons', id: 'LIST' }]
        }),

        // Получение персоны по id
        getPersonById: builder.query({
            query: (id) => ({
                url: `person?id=${id}`
            }),
            providesTags: ['Person']
        }),

        // Получение персоны c автомобилями по id
        getPersonWithCarsById: builder.query({
            query: (id) => ({
                url: `person_with_cars?id=${id}`
            }),
            providesTags: ['Person']
        }),

        // Получение персоны по номеру паспорта
        getPersonByNumber: builder.query({
            query: (number) => ({
                url: `person_number?number=${number}`
            }),
            providesTags: ['Person']
        }),

        // Удаление персоны
        deletePerson: builder.mutation({
            query: (id) => ({
                url: `delete_person?id=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Persons', id: 'LIST' }, 'Car']
        }),

        // Редактирование персоны
        updatePerson: builder.mutation({
            query(data) {
                const { id, ...body } = data;
                return {
                    url: `person?id=${id}`,
                    method: 'PUT',
                    body: body
                }
            },
            invalidatesTags: [{ type: 'Persons', id: 'LIST' }, 'Person', 'Car']
        }),

        // Создание автомобиля
        createCar: builder.mutation({
            query: (car) => ({
                url: `car`,
                method: 'POST',
                body: car,
            }),
            invalidatesTags: [{ type: 'Cars', id: 'LIST' }]
        }),

        // Получение списка автомобилей
        getCars: builder.query({
            query: () => 'cars',
            providesTags: (result) => result
                ? [...result.map(({ id }) => ({ type: 'Cars', id })), { type: 'Cars', id: 'LIST' },]
                : [{ type: 'Cars', id: 'LIST' }]
        }),

        // Получение автомобиля по id
        getCarById: builder.query({
            query: (id) => ({
                url: `car?id=${id}`
            }),
            providesTags: ['Car']
        }),

        // Получение автомобиля c персонами по id
        getCarWithPersonsById: builder.query({
            query: (id) => ({
                url: `car_with_persons?id=${id}`
            }),
            providesTags: ['Car']
        }),

        // Получение автомобиля по номеру
        getCarByNumber: builder.query({
            query: (number) => ({
                url: `car_number?number=${number}`
            }),
            providesTags: ['Car']
        }),

        // Удаление автомобиля
        deleteCar: builder.mutation({
            query: (id) => ({
                url: `delete_car?id=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Cars', id: 'LIST' }, 'Person']
        }),

        // Редактирование автомобиля
        updateCar: builder.mutation({
            query(data) {
                const { id, ...body } = data;
                return {
                    url: `car?id=${id}`,
                    method: 'PUT',
                    body: body
                }
            },
            invalidatesTags: [{ type: 'Cars', id: 'LIST' }, 'Car', 'Person']

        }),

        // Регистрация автомобиля на владельца
        registration: builder.mutation({
            query: (pairId) => ({
                url: `registration_car`,
                method: 'POST',
                body: pairId
            }),
            invalidatesTags: ['Person', 'Car']
        })
    }),
});

export const {
    useCreatePersonMutation,
    useGetPersonsQuery,
    useGetPersonByIdQuery,
    useGetPersonWithCarsByIdQuery,
    useGetPersonByNumberQuery,
    useDeletePersonMutation,
    useUpdatePersonMutation,
    useCreateCarMutation,
    useGetCarsQuery,
    useGetCarByIdQuery,
    useGetCarWithPersonsByIdQuery,
    useGetCarByNumberQuery,
    useDeleteCarMutation,
    useUpdateCarMutation,
    useRegistrationMutation
} = api;
