import { GET_USER } from "utils/apollo/queries/user";
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function Account() {
    const route = useRouter();
    const id = route.query.id;
    const { loading, error, data } = useQuery(GET_USER, {variables:{id}});
    if(loading){
        return <p>Loading ...</p>;
    }
    if(error){
        console.log(error);
        return <p>Oops, something goes wrong...</p>
    }
    if(data){
        return(
            <>
            <div>Account page</div>
            <pre>{JSON.stringify(data)}</pre>
            </>
        )
    }
}