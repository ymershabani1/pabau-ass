import { gql } from "@apollo/client"

export const MISSIONS = gql`
    {
           launchesPast {
                id
                mission_name
                rocket {
                rocket_name
                }
                links{
                    flickr_images
                }
            }
    }
`


export const MISSION_DETAILS_BY_ID = gql`
query MissionsDetailsById($id: ID!){
launch(id: $id) {
    rocket {
      rocket {
        id
        country
        description
      }
      rocket_name
      rocket_type
    }
    links {
      flickr_images
    }
    details
  }
}
`