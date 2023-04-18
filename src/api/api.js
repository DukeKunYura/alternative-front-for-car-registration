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
                url: `person?id=${id}`
            })
        }),

        // Получение персоны c автомобилями по id
        getPersonWithCarsById: builder.query({
            query: (id) => ({
                url: `person_with_cars?id=${id}`
            })
        }),

        // Получение персоны по номеру паспорта
        getPersonByNumber: builder.query({
            query: (number) => ({
                url: `person_number?number=${number}`
            })
        }),

        // Удаление персоны
        deletePerson: builder.mutation({
            query: (id) => ({
                url: `delete_person?id=${id}`,
                method: 'DELETE'
            }),
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
            }
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
                url: `car?id=${id}`
            })
        }),

        // Получение автомобиля c персонами по id
        getCarWithPersonsById: builder.query({
            query: (id) => ({
                url: `car_with_persons?id=${id}`
            })
        }),

        // Получение автомобиля по номеру
        getCarByNumber: builder.query({
            query: (number) => ({
                url: `car_number?number=${number}`
            })
        }),

        // Удаление автомобиля
        deleteCar: builder.mutation({
            query: (id) => ({
                url: `delete_car?id=${id}`,
                method: 'DELETE'
            }),
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
            }
        }),

        // Регистрация автомобиля на владельца
        registration: builder.mutation({
            query: (pairId) => ({
                url: `registration_car`,
                method: 'POST',
                body: pairId
            })
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
