import { useQuery } from '@apollo/client'
import { Grid } from '@mui/material'
import MissionCard from '../components/MissionCard'
import { MISSIONS } from '../graphql/queries'

interface LinkType{
  flickr_images: string[]
}

interface RocketType{
  rocket_name: string
}

interface MissionsType{
  id: string,
  mission_name: string,
  links: LinkType
  rocket: RocketType
}

export default function Home() {
const {data:missions, loading} = useQuery(MISSIONS)

  return (
    <>
    <div>
      </div>{
      loading ? <h1>LOADING</h1> : (
        <Grid container 
        spacing={{ xs: 2, md: 3 }} 
        columns={{ xs: 4, sm: 8, md: 12 }} 
        justifyContent="center" 
        alignItems="center">
      {
        missions.launchesPast.map(({links, mission_name, rocket, id} : MissionsType) => (
          <Grid item xs={3} key={id}>
          <MissionCard id={id} image={links.flickr_images[0]} missionName={mission_name} rocketName={rocket.rocket_name} />
          </Grid>
        ))
      }
    </Grid>
      )
    }
    </>
  )
}
