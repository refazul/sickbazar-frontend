import { useQuery, gql } from '@apollo/client';

export default function Home({ rates }) {
    const { loading, error, data } = useQuery(gql`
    query Query($pageSize: Int) {
        launches(pageSize: $pageSize) {
          launches {
            mission {
              name
            }
            rocket {
              name
            }
          }
        }
      }
    `, {
        variables: { pageSize: 3 },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data.launches.launches);
    return (
        <div>
            {
                data.launches.launches.map((launch) => {
                    return (
                        <div>{launch.mission.name}</div>
                    )
                })
            }
        </div>
    )
}