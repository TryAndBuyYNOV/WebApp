import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query Users {
        users {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            avatar,
            address,
            role
        }
    }
`

export const GET_USER = gql`
    query User($id: ID!) {
        user(id:$id) {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            avatar,
            address {
                lat,
                lng,
                localisation
            },
            role
        }
    }
`